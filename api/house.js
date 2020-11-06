const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id, status = null, type = null } = req.body; // 公寓ID
  const { page, size } = req.params;
  try {
    let querySelect = {};
    // 未出租  包含  1，2
    if (status - 0 === 0 && type === null) {
      querySelect.buildId = id;
      querySelect.houseStatus = status;
    }
    // 暗房型查询
    if (type !== null && status === null) {
      querySelect.buildId = id;
      querySelect.unitType = type - 0;
    }
    console.info(querySelect);
    let CountHouse = await Room.countDocuments(querySelect);
    let filterHouse = await Room.find(querySelect, {
      buildId: 0,
    })
      .limit(size - 0)
      .skip((page - 1) * size);
    if (filterHouse && CountHouse) {
      res.json({
        data: { filterHouse, CountHouse },
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
