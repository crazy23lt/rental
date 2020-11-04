const Login = require("express").Router();
Login.use((req, res, next) => {
  next();
});
// 登陆校验
Login.post("/auth", require("../api/auth"));
// 用户信息更新 支持房东认证
Login.post("/update/:cert", require("../api/UpdateUserInfo"));
module.exports = Login;
