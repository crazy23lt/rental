const { verifyToken } = require("../utils/jwt");
const User = require("../model/user_info");
const Build = require("express").Router();
Build.use(async (req, res, next) => {
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
  next()
});
// 新建公寓

Build.post("/add", require("../api/AddBuild"));
// 获取当前房东所有公寓
Build.post("/allbuild/:page/:size", require("../api/AllBuild"));
// 根据 公寓 ID 获取公寓信息
Build.post("/buildinfo", require("../api/BuildInfo"));
// 修改公寓信息
Build.post("/buildupdata", require("../api/BuildUpdata"));
// 更具公寓id 返回 公寓内的房间
Build.post("/allhouse", require("../api/AllHouse"));
// 更具公寓id 与 条件参数 返回对应的公寓的房间
Build.post("/house/:page/:size", require("../api/House"));
// 改变房屋状态
Build.post("/changestatus", require("../api/ChangeStatus"));
// 修改房屋基本信息
Build.post("/houseupdata", require("../api/HouseUpdata"));
// 添加房间
Build.post("/newhouse", require("../api/NewHouse"));
// 房东查询出租屋信息
Build.post("/houseinfo", require("../api/_HouseInfo"));
module.exports = Build;
