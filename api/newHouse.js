const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { buildId, houseName, houseType, houseConfig, houseCost } = req.body;
  try {
    let ret = new Room({ buildId, houseName, houseType, houseConfig, houseCost });
    if (ret) {
      res.json({
        data: ret,
        meta: {
          status: 200,
          msg: "添加成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "添加失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
