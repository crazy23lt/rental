const Query = require("express").Router();
Query.use((req, res, next) => {
  next();
});
// 查询房屋具体信息
Query.post("/houseinfo", require("../api/houseInfo"));
// 获取个人信息
Query.post("/userinfo", require("../api/UserInfo"));
// 分页查询房间信息
Query.post("/houseshow/:page/:size", require("../api/HouseShow"));
module.exports = Query;
