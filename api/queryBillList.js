const Room = require("../model/room_info");
const Contract = require("../model/contract_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
  const { buildId } = req.body;
  const { page, size } = req.params;
  const time = moment().format("x");
  try {
    let ConList = await Contract.find(
      { invalid: { $in: [1, 2] } },
      { time: 1, _id: 1, roomId: 1, residents: 1 }
    )
      .populate({
        path: "roomId",
        match: { buildId: buildId },
        select: { houseName: 1, _id: 0 },
      })
      .populate({
        path: "billId",
        match: { "duration.startTime": { $lte: time } },
        select: { duration: 1, status: 1 },
      });
    // 过滤出公寓所属账单
    let filterBill = ConList.filter((item) => item.roomId !== null);
    // 过滤出公寓到期账单
    let filterBill2 = filterBill.filter((item) => item.billId !== null);
    if (filterBill2) {
      res.json({
        data: filterBill2,
        meta: {
          status: 200,
          msg: "成功！获取公寓内收租房屋账单",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "失败！获取公寓内收租房屋账单",
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
