const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { page, size } = req.params;
  const { location, unitType } = req.body;
  try {
    let unit = unitType ? { unitType } : {};
    let count = await Room.countDocuments(
      Object.assign({ houseStatus: 1 }, unit)
    );
    let ret = await Room.find(Object.assign({ houseStatus: 1 }, unit), {
      "houseCost.rent": 1,
      houseConfig: 1,
      houseName: 1,
      unitType: 1,
      views: 1,
    })
      .populate({
        path: "buildId",
        select: { "buildInfo.buildName": 1, buildCost: 1, _id: 0 },
        populate: {
          path: "landlordId",
          select: { "userinfo.village": 1, _id: 0, "userinfo.phone": 1 },
        },
      })
      .limit(40)
      .skip((page - 1) * 40);
    if (ret) {
      res.json({
        data: { ret, count },
        meta: {
          status: 200,
          msg: "条件查询成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "条件查询成功，公寓内暂时没有此类房屋出租",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
