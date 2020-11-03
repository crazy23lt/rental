const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { id, userinfo } = req.body;
  try {
    let UpdataInfo = await User.findByIdAndUpdate(id, userinfo);
    if (UpdataInfo) {
      // 已注册
      res.json({
        data: UpdataInfo,
        meta: {
          status: 200,
          msg: "信息更新成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: { msg: "信息更新失败", status: 202 },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        status: 500,
        msg: "服务器错误",
      },
    });
  }
};
