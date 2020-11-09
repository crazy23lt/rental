const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { page, size } = req.params;
  const { location } = req.body;
  try {
    // let count = await Room.countDocuments({
    //   houseType: type,
    //   houseStatus: 0, // 发布未出租
    // });
    let ret = await Room.find({ houseStatus: 1 })
      .populate({ path: "buildId", populate: { path: "landlordId" } })
      .limit(size - 0)
      .skip((page - 1) * size);
    if (ret) {
      res.json({
        data: { ret },
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
