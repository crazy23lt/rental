const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
const Bill = require("../model/bill_info");
const nextMonth = require("../utils/nextMonth");
module.exports = async (req, res) => {
  // 合同ID 租客ID
  let { id } = req.body;
  try {
    // 签订合同
    let vis = await Contract.findByIdAndUpdate(
      id,
      {
        invalid: 2,
      },
      {
        new: true,
      }
    )
      .populate({ path: "tenantId" })
      .populate({ path: "roomId" });
    // 删除其他相同房间的初始化合同
    let ret = await Contract.deleteMany({ roomId: vis.roomId, invalid: 1 });
    console.info(ret);
    // 改变房间状态  已出租
    let changeStatus = await Room.findByIdAndUpdate(
      vis.roomId,
      {
        houseStatus: 2,
      },
      { new: true, select: { buildId: 1 } }
    );
    let initBill = await new Bill({
      contractId: id, // 合同ID
      duration: {
        startTime: vis.time.beginTime,
        endTime: nextMonth(vis.time.beginTime),
      },
      consume: {
        water: {
          start: vis.Baseinfo.water,
          end: vis.Baseinfo.water,
        },
        electric: {
          start: vis.Baseinfo.electric,
          end: vis.Baseinfo.electric,
        },
      },
    }).save();
    await Contract.findByIdAndUpdate(
      id,
      {
        billId: initBill._id,
      },
      { new: true }
    );
    await Room.findByIdAndUpdate(
      vis.roomId,
      {
        billId: initBill._id,
      },
      { new: true }
    );
    if (changeStatus && vis) {
      res.json({
        data: { deletedCount: ret.deletedCount, billId: initBill._id },
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
