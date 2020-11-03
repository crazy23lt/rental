const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const {} = req.body;
  res.json({
    data: null,
    meta: {
      status: 200,
      msg: "添加房子成功",
    },
  });
};
