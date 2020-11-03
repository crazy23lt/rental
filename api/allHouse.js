const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = await Room.find(
      { build_id: id },
      { house_status: 1, user_id: 1, _id: 1, house_name: 1, unit_id: 1 }
    ).populate("unit_id", {
      unit_config: 1,
      unit_cost: 1,
      unit_room: 1,
      _id: 0,
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
          msg: "查询成功，公寓内暂时没有房屋出租",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
