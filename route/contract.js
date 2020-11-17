const Contract = require("express").Router();
const User = require("../model/user_info");
const { verifyToken } = require("../utils/jwt");
Contract.use(async (req, res, next) => {
  // if (req.headers.authorization) {
  //   let tokenH = req.headers.authorization;
  //   let tokenParse = verifyToken(tokenH);
  //   if (tokenParse !== "err") {
  //     // token 验证有效
  //     let { _id, role } = JSON.parse(tokenParse);
  //     let queryUserInfo = await User.findById(_id).lean();
  //     let { token } = queryUserInfo;
  //     // 对比数据库token和客户端token
  //     if (token === tokenH) {
  //       // token 相同
  //       if (role !== 1) {
  //         // 用户是租客
  //         res.json({
  //           data: null,
  //           meta: {
  //             msg: "用户权限不够请前往认证房东",
  //             status: 302,
  //           },
  //         });
  //       } else {
  //         // 用户是房东
  //         next();
  //       }
  //     } else {
  //       // token 不相同
  //       res.json({
  //         data: null,
  //         meta: {
  //           msg: "token已失效请重新登陆",
  //           status: 302,
  //         },
  //       });
  //     }
  //   } else {
  //     // token 验证无效
  //     res.json({
  //       data: null,
  //       meta: {
  //         msg: "token已过期请重新登陆",
  //         status: 302,
  //       },
  //     });
  //   }
  // } else {
  //   res.json({
  //     data: null,
  //     meta: {
  //       msg: "请携带Token再来访问",
  //       status: 302,
  //     },
  //   });
  // }
  next();
});
// 创建合同
Contract.post("/init", require("../api/InitContract"));
// 房东签订合同
Contract.post("/visa", require("../api/VisaContract"));
// 租客签订合同
Contract.post("/visa1", require("../api/VisaContract1"));
// 查询合同
Contract.post("/search", require("../api/SearchContract"));
module.exports = Contract;
