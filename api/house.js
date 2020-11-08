const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id, status = null, type = null } = req.body; // 公寓ID
  const { page, size } = req.params;
  console.info(`公寓ID:${id}`);
  try {
    let querySelect = {
      buildId: id,
    };
    // 未出租  包含  1，2
    if (status - 0 === 1 && type === null) {
      querySelect.houseStatus = { $lte: status - 0 };
    }
    // 暗房型查询
    if (type !== null && status === null) {
      querySelect.unitType = type - 0;
    }
    console.info(querySelect);
    let CountHouse = await Room.countDocuments(querySelect);
    let filterHouse = await Room.find(querySelect)
      .limit(size - 0)
      .skip((page - 1) * size);
    if (filterHouse && CountHouse) {
      console.info(filterHouse);
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
