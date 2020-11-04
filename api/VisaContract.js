const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
const Bill = require("../model/bill_info");
module.exports = async (req, res) => {
  // 合同ID 租客ID
  const { id, tenantId, persons } = req.body;
  try {
    // 查询合同信息
    let queryInfo = await Contract.findById(id, {
      person: 1,
      Baseinfo: 1,
    }).lean();
    const { _id, person, Baseinfo } = queryInfo;
    // 签订合同
    let vis = await Contract.findByIdAndUpdate(
      _id,
      {
        person: Object.assign(person, { tenantId }),
        Baseinfo: Object.assign(Baseinfo, { persons }),
        invalid: 1,
      },
      {
        new: true,
        select: { roomId: 1, _id: 1, person: 1, Baseinfo: 1, time: 1 },
      }
    );
    // 改变房间状态  已出租
    let changeStatus = await Room.findByIdAndUpdate(
      vis.roomId,
      {
        houseStatus: 2,
      },
      { new: true, select: { buildId: 1 } }
    );
    // 初始化首月账单
    console.info(vis.person.landlordid);
    let initBill = await new Bill({
      ContractID: vis._id,
      // TenantID: vis.tenantId,
      LandlordID: vis.person.landlordid,
      BuildID: changeStatus.buildId,
      // meter: {
      //   water: vis.Baseinfo.water,
      //   electric: vis.Baseinfo.electric,
      // },
      // time: {
      //   startTime: vis.time.beginTime,
      // },
      // status: 0,
    }).save();
    if (changeStatus) {
      res.json({
        data: initBill,
        meta: { msg: "合同签订成功", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同签订失败", status: 202 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
