const Open = require("express").Router();
const { verifyToken } = require("../utils/jwt");
Open.use((req, res, next) => {
  next();
});
// 查询房屋具体信息
Open.post("/houseinfo", require("../api/HouseInfo"));
// 首页租房出租房间列表
Open.post("/houseshow/:page/:size", require("../api/HouseShow"));
module.exports = Open;
