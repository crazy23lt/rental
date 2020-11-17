const Bill = require("../model/bill_info");
const total = require("../utils/total");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
  const { billId } = req.body;
  console.info(req.body);
  const time = moment().format("x");
  try {
    let BillInfo = await Bill.findById(billId, { __v: 0 })
      .populate({
        path: "contractId",
        select: {
          "roomConfig.houseName": 1,
          _id: 0,
          "roomConfig.houseCost": 1,
          roomId: 1,
          time: 1,
        },
        populate: {
          path: "tenantId",
          select: { "wxinfo.avatarUrl": 1, "wxinfo.nickName": 1 },
        },
      })
      .lean();
    /**
     * 产生拖欠
     *    含首月账单
     *        合同起始时间 === 账单起始时间
     *        当前时间 >= 账单结束时间
     *    不含首月账单
     *        合同起始时间 < 账单起始时间
     *        当前时间 >= 账单结束时间
     * 未产生拖欠
     *    含首月账单
     *        合同起始时间 === 账单起始时间 === 当前时间 
     *    不含首月账单
     *        合同起始时间 < 账单起始时间 === 当前时间 < 账单结束时间
     *        
     */
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
    // 设置 账单跨度月份
    // BillInfo.duration.endTime =
    //   moment(endtime).add(owe, "months").format("x") - 0;
    if (BillInfo) {
      res.json({
        data: BillInfo,
        meta: {
          status: 200,
          msg: "成功！获取账单详细信息",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "失败！获取账单详细信息",
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
