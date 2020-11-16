const Query = require("express").Router();
const { verifyToken } = require("../utils/jwt");
Query.use((req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    let { role, _id } = JSON.parse(verifyToken(token));
    // 此步能做权限拦截
    // console.info(_id);
    // console.info(role, _id);
  }
  next();
});
// 查询房屋具体信息
Query.post("/houseinfo", require("../api/HouseInfo"));
// 获取个人信息
Query.post("/userinfo", require("../api/UserInfo"));
// 首页租房出租房间列表
Query.post("/houseshow/:page/:size", require("../api/HouseShow"));
module.exports = Query;
