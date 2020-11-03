const Build = require("../model/build_info");
const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = await Build.find(
      { user_id: id },
      { _id: 1, build_name: 1 },
      { lean: true }
    );
    if (ret) {
      if (ret.length) {
        let roomRet = await Room.find(
          { build_id: ret[0]._id },
          { house_status: 1, user_id: 1, _id: 1, house_name: 1, unit_id: 1 }
        ).populate("unit_id", {
          unit_config: 1,
          unit_cost: 1,
          unit_room: 1,
          _id: 0,
        });
        ret[0].house = roomRet;
        console.info(ret[0].house);
      } else {
        let roomRet = await Room.find(
          { build_id: ret._id },
          { house_status: 1, user_id: 1, _id: 1, house_name: 1, unit_id: 1 }
        ).populate("unit_id", {
          unit_config: 1,
          unit_cost: 1,
          unit_room: 1,
          _id: 0,
        });
        ret.house = roomRet;
      }
      console.info(ret.length);
      res.json({
        data: ret,
        meta: {
          status: 200,
          msg: "查询成功",
        },
      });
    } else {
      res.json({
        data: ret,
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
