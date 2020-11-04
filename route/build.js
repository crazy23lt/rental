const User = require("../model/user_info");
const Build = require("express").Router();
Build.use(async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let userAuth = await User.findById(req.headers.authorization);
      if (userAuth.role === 1) {
        // 权限通过
        next();
      } else {
        // 权限不通过
        res.json({
          data: null,
          meta: {
            msg: "权限不够，请前往认证房东",
            status: 202,
          },
        });
      }
    } catch (e) {
      console.info(e);
      res.json({
        data: null,
        meta: {
          msg: "服务端错误",
          status: 500,
        },
      });
    }
  } else {
    // 权限不通过
    res.json({
      data: null,
      meta: {
        msg: "权限不够，请前往认证房东",
        status: 202,
      },
    });
  }
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
// 改变房屋状态
Build.post("/changestatus", require("../api/changeStatus"));
// 修改房屋基本信息 
Build.post("/houseupdata", require("../api/houseUpdata"));
// 添加房间
Build.post("/newhouse", require("../api/newHouse"));
module.exports = Build;
