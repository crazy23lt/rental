const Query = require("express").Router();
const User = require("../model/user_info");
const { verifyToken } = require("../utils/jwt");
Query.use(async (req, res, next) => {
  if (req.headers.authorization) {
    let tokenH = req.headers.authorization;
    let tokenParse = verifyToken(tokenH);
    console.info(tokenParse);
    if (tokenParse !== "err") {
      // token 验证有效
      let { _id, role } = JSON.parse(tokenParse);
      let queryUserInfo = await User.findById(_id).lean();
      let { token } = queryUserInfo;
      // 对比数据库token和客户端token
      if (token === tokenH) {
        // token 相同
        req._userid = _id;
        next();
      } else {
        // token 不相同
        res.json({
          data: null,
          meta: {
            msg: "token已失效请重新登陆",
            status: 302,
          },
        });
      }
    } else {
      // token 验证无效
      res.json({
        data: null,
        meta: {
          msg: "token已过期请重新登陆",
          status: 302,
        },
      });
    }
  } else {
    res.json({
      data: null,
      meta: {
        msg: "请携带Token再来访问",
        status: 302,
      },
    });
  }
});
// 获取个人信息
Query.post("/userinfo", require("../api/UserInfo"));
module.exports = Query;
