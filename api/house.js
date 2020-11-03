const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  const { type, page, size, status } = req.params;
  let flag = false;
  if (type !== "all") flag = true;
  let query = { build_id: id };
  if (status === "notrented") query.house_status = false;
  try {
    let ret = await Room.find(query, {
      house_status: 1,
      user_id: 1,
      _id: 1,
      house_name: 1,
      unit_id: 1,
    })
      .limit(size - 0)
      .skip((page - 1) * size)
      .populate({
        path: "unit_id",
        match: flag ? { unit_room: type } : {},
        select: ["unit_config", "unit_cost", "unit_room"],
      });
    if (ret[0] && ret[0].unit_id) {
      res.json({
        data: ret,
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
