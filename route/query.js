const Query = require("express").Router();
Query.use((req, res, next) => {
  next();
});
// 查询房屋具体信息
Query.post("/houseinfo", require("../api/houseInfo"));
// 获取个人信息
Query.post("/")
module.exports = Query;
