const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { id, userinfo } = req.body;
  try {
    let UpdataInfo = await User.findByIdAndUpdate(
      id,
      { userinfo },

      {
        new: true,
        select: {
          _id: 0,
          openid: 0,
          __v: 0,
        },
      }
    );
    if (UpdataInfo) {
      res.json({
        data: UpdataInfo,
        meta: {
          status: 200,
          msg: "认证成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: { msg: "认证失败", status: 202 },
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
