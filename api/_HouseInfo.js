const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = await Room.findById(id)
      .populate({
        path: "buildId",
        select: {
          buildInfo: 1,
        },
      })
      .populate({
        path: "buildId",
        select: { landlordId: 1, _id: 0, "buildInfo.buildName": 1 },
        populate: {
          path: "landlordId",
          select: {
            "userinfo.provinces": 1,
            "userinfo.city": 1,
            "userinfo.area": 1,
            "userinfo.village": 1,
            _id: 0,
          },
        },
      });
    if (ret) {
      res.json({
        data: ret,
        meta: {
          status: 200,
          msg: "查询成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "查询失败，没有此房间信息",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
