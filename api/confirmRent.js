const Bill = require("../model/bill_info");
const total = require("../utils/total");
const Room = require("../model/room_info");
const Contract = require("../model/contract_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
  const { billId } = req.body;
  const time = moment().format("x");
  try {
    // 获取账单信息
    let BillInfo = await Bill.findById(billId)
      .populate({
        path: "contractId",
        select: { roomId: 1, _id: 0, "roomConfig.houseCost": 1, time: 1 },
      })
      .lean();
    // 房租值
    const { consume, contractId } = BillInfo;
    // 账单时间
    let billEndTime = BillInfo.duration.endTime;
    let billStartTime = BillInfo.duration.startTime;
    // 合同时间
    let contStartTime = BillInfo.contractId.time.beginTime;
    // 当前年月
    let currMonth = new Date(time - 0).getMonth();
    let currYear = new Date(time - 0).getFullYear();
    // 账单结束年月
    let endMonth = new Date(billStartTime).getMonth();
    let endYear = new Date(billStartTime).getFullYear();
    if (billStartTime === contStartTime) {
      // 含首月账单
      let { clear, rent, net } = contractId.roomConfig.houseCost;
      BillInfo.firstTotal = clear + rent + net;
      let owe = 0;
      if (time >= billEndTime) {
        console.info("含首月账单产生拖欠")
        // 产生拖欠
        owe = 12 * (currYear - endYear) + currMonth - endMonth;
        BillInfo.total = total(consume, contractId, owe);
        BillInfo.owe = owe;
      } else {
        console.info("含首月账单无拖欠")
        // 无拖欠
        BillInfo.total = total(consume, contractId, owe);
        BillInfo.owe = owe;
      }
    } else {
      // 不含首月账单
      let owe = 0;
      if (time >= billEndTime) {
        console.info("不含首月账单产生拖欠")
        // 产生拖欠
        owe = 12 * (currYear - endYear) + currMonth - endMonth;
        BillInfo.total = total(consume, contractId, owe);
        BillInfo.owe = owe;
      } else {
        console.info("不含首月账单无拖欠")
        // 无拖欠
        BillInfo.total = total(consume, contractId, owe);
        BillInfo.owe = owe;
      }
    }
    // // 新建账单开始时间戳
    let newStartTime = moment(billEndTime).add(BillInfo.owe, "months").format("x");
    // // 新建账单结束时间戳（默认一个月）
    let newEndTime = moment(billEndTime)
      .add(BillInfo.owe + 1, "months")
      .format("x");
    let UpdateBill = await Bill.findByIdAndUpdate(billId, {
      status: 2,
      "duration.currTime": newStartTime - 0,
      total: (BillInfo.total || 0) + (BillInfo.firstTotal || 0),
    });
    // 新建下月账单
    let CreateBill = await new Bill({
      contractId: UpdateBill.contractId,
      "consume.water.start": BillInfo.consume.water.end,
      "consume.electric.start": BillInfo.consume.electric.end,
      "duration.startTime": newStartTime - 0,
      "duration.endTime": newEndTime - 0,
    }).save();
    // 修改合同绑定的账单ID
    await Contract.findByIdAndUpdate(
      UpdateBill.contractId,
      {
        billId: CreateBill._id,
      },
      { new: true }
    );

    // 修改公寓出租房绑定的账单ID
    await Room.findByIdAndUpdate(
      contractId.roomId,
      {
        billId: CreateBill._id,
      },
      { new: true }
    );
    if (CreateBill) {
      res.json({
        data: CreateBill,
        meta: {
          status: 200,
          msg: "成功！账单结账。",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "失败！账单结账。",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: { msg: "服务器出现错误，请联系维护者", status: 500 },
    });
  }
};
