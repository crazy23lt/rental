const Room = require("../model/room_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cna"); //设置时
module.exports = async (req, res) => {
  const { buildId } = req.body;
  const { page, size } = req.params;
  const time = moment().format("x");
  try {
    /**
     * $lt,$lte,$gt,$gte.
     */
    let RoomQuery = await Room.find(
      { buildId, houseStatus: 2 },
      { billId: 1, _id: 0 }
    ).populate({
      path: "billId",
      select: { consume: 0, __v: 0 },
      model: "bill_info",
      match: { "duration.endTime": { $lt: time }, },
      populate: { path: "contractId", select: { "roomConfig.houseName": 1, _id: 0 }, populate: { path: "tenantId", select: { "wxinfo.nickName": 1, _id: 0 } } },
    }).lean();
    if (RoomQuery) {
      res.json({
        data: RoomQuery,
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
