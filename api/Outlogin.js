const User = require("../model/user_info");
const { verifyToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  try {
    if (req.headers.authorization) {
      let _token = req.headers.authorization;
      if (verifyToken(_token) !== "err") {
        const { _id } = JSON.parse(verifyToken(_token));
        // 去除token
        let ret = await User.findByIdAndUpdate(_id, { token: "" });
        if (ret) {
          res.json({
            data: null,
            meta: {
              msg: "登出成功",
              status: 200,
            },
          });
        } else {
          res.json({
            data: null,
            meta: {
              msg: "登出失败",
              status: 200,
            },
          });
        }
      } else {
        res.json({
          data: null,
          meta: {
            msg: "token已失效请重新登陆",
            status: 302,
          },
        });
      }
    } else {
      res.json({
        data: null,
        meta: {
          msg: "token已失效请重新登陆",
          status: 302,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
