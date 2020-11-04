const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id } = req.body; // 公寓ID
  const { type, page, size, status } = req.params;
  try {
    let count = await Room.countDocuments({
      buildId: id,
      houseType: type,
      houseStatus: status,
    });
    let ret = await Room.find(
      { buildId: id, houseType: type, houseStatus: status },
      {
        buildId: 0,
      }
    )
      .limit(size - 0)
      .skip((page - 1) * size);
    if (ret) {
      res.json({
        data: ret,
        count,
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
