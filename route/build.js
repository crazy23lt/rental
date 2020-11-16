const { verifyToken } = require("../utils/jwt");
const Build = require("express").Router();
Build.use(async (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    let { role, _id } = JSON.parse(verifyToken(token));
    // 此处能做权限拦截
    // req.userid = _id;
    // console.info(role, _id);
  }
  next();
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
