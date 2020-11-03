const Build = require("express").Router();
Build.use((req, res, next) => {
  next();
});
// 新建公寓
Build.post("/add", require("../api/addBuild"));
// 获取当前房东所有公寓
Build.post("/allbuild", require("../api/allBuild"));
// 根据 公寓 ID 获取公寓信息
Build.post("/buildinfo", require("../api/buildInfo"));
// 修改公寓信息
Build.post("/buildupdata", require("../api/buildUpdata"));
// 更具公寓id 返回 公寓内的房间
Build.post("/allhouse", require("../api/allHouse"));
// 更具公寓id 与 条件参数 返回对应的公寓的房间
Build.post("/house/:type/:page/:size/:status", require("../api/house"));
// 查询房屋具体信息
Build.post("/houseinfo", require("../api/houseInfo"));
// 修改房屋基本信息  未完成hosueType
Build.post("/houseupdata", require("../api/houseUpdata"));
// 添加房间
Build.post("/newhouse", require("../api/newHouse"));
// 更具公寓ID 获取所有房型
Build.post("/housetype", require("../api/hosueType"));
module.exports = Build;
