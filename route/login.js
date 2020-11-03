const Login = require("express").Router();
Login.use((req, res, next) => {
  next();
});
// 登陆校验
Login.post("/auth", require("../api/auth"));
// 用户信息更新
Login.post("/update", require("../api/UpdateUserInfo"));
// 房东认证
Login.post("/authidentity", require("../api/AuthIdentity"));
module.exports = Login;
