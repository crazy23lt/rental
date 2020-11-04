const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { id, houseName, houseType, houseConfig, houseCost } = req.body;
  try {
    let updata = {
      houseName,
      houseType,
      houseCost,
      houseConfig,
    };
    let ret = await Room.findByIdAndUpdate(id, updata, {
      new: true,
      select: { BuildId: 0 },
    });
    if (ret) {
      res.json({
        data: null,
        meta: {
          status: 200,
          msg: "信息更新成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "信息更新失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
