const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = await Room.findById(id)
      .populate({
        path: "buildId",
        select: {
          buildInfo: 1,
          landlordId: 1,
        },
        populate: {
          path: "landlordId",
          select: {
            "userinfo.wxnumber": 1,
            "userinfo.phone": 1,
            _id: 0,
          },
        },
      })
      .lean();
    if (ret) {
      let count = ret.views + 1;
      let views = await Room.findByIdAndUpdate(
        id,
        { views: count },
        { new: true }
      );
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
