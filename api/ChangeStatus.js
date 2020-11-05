const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id, status } = req.body;
  try {
    let ret = null;
    // 未发布 发布未出租 已出租
    if (status === 0 || status === 1 || status === 2) {
      ret = await Room.findByIdAndUpdate(
        id,
        { houseStatus: status },
        { new: true, select: { buildId: 0 } }
      );
    }
    if (ret) {
      res.json({
        data: ret,
        meta: {
          status: 200,
          msg: "状态改变成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "状态改变失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
