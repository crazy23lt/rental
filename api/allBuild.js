const Build = require("../model/build_info");
const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = await Build.find(
      { landlordId: id },
      { _id: 1, buildInfo: 1 },
      { lean: true }
    );
    // 这里存在多个 公寓 但是只需要返回一个公寓的所有房间就行 其他公寓的房间通过 公寓ID去查询
    if (
      Object.prototype.toString.call(ret).slice(8, -1) === "Array" &&
      ret.length !== 0
    ) {
      let rooms = await Room.find(
        { buildId: ret[0]._id },
        { buildId: 0, __v: 0 }
      );
      res.json({
        data: { ret, rooms },
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
          msg: "查询失败，暂无出租公寓",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
