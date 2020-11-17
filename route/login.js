const Login = require("express").Router();
Login.use((req, res, next) => {
  next();
});
// 登陆校验
Login.post("/auth", require("../api/Auth"));
// 用户信息更新 支持房东认证
Login.post("/update/:cert", require("../api/UpdateUserInfo"));
// 退出登录
Login.post("/outlogin", require("../api/Outlogin"));
module.exports = Login;
