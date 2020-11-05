const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
const Bill = require("../model/bill_info");
const nextMonth = require("../utils/nextMonth");
module.exports = async (req, res) => {
  // 合同ID 租客ID
  const { id, tenantId, persons } = req.body;
  try {
    // 查询合同信息
    let queryInfo = await Contract.findById(id).lean();
    // 签订合同
    let vis = await Contract.findByIdAndUpdate(
      queryInfo._id,
      {
        tenantId,
        Baseinfo: Object.assign(queryInfo.Baseinfo, { persons }),
        invalid: 1,
      },
      {
        new: true,
        // select: { roomId: 1, _id: 1, person: 1, Baseinfo: 1, time: 1 },
      }
    )
      .populate({ path: "tenantId" })
      .populate({ path: "roomId" });
    // 改变房间状态  已出租
    // let changeStatus = await Room.findByIdAndUpdate(
    //   vis.roomId,
    //   {
    //     houseStatus: 2,
    //   },
    //   { new: true, select: { buildId: 1 } }
    // );

    const { roomId, time } = vis;
    // roomId.buildId

    console.info(`房间ID：${roomId}`);
    console.info(`月首时间戳：${time.beginTime - 0}`);
    console.info(`月末时间戳：${nextMonth(time.beginTime - 0)}`);
    /** 此步初始化账单 -----
     *  buildID
     *  startTime
     *  endTime
     *  userName
     *  hourse
     */
    // 初始化首月账单
    // let initBill = await new Bill({
    //   ContractID: vis._id,
    //   TenantID: vis.person.tenantId,
    //   LandlordID: vis.person.landlordId,
    //   BuildID: changeStatus.buildId,
    //   // meter: {
    //   //   water: vis.Baseinfo.water,
    //   //   electric: vis.Baseinfo.electric,
    //   // },
    //   // time: {
    //   //   startTime: vis.time.beginTime,
    //   // },
    //   // status: 0,
    // }).save();
    if (changeStatus) {
      res.json({
        data: vis,
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
