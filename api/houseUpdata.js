const Room = require("../model/room_info");
const Unit = require("../model/unit_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let ret = true;
    if (ret) {
      res.json({
        data: req.body,
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
