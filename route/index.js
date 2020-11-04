const Build = require("./build");
const Login = require("./login");
const Contr = require("./contract");
const Bill = require("./bill");
const Query = require("./query");
require("../model/user_info");
require("../model/build_info");
require("../model/room_info");
module.exports = (app) => {
  // 设置跨域和相应数据格式
  app.all("*", function (req, res, next) {
    console.info(`originalUrl:${req.originalUrl}:::method:${req.method}`);
    //允许哪源可以访问我
    res.header("Access-Control-Allow-Origin", "*");
    //允许请求携带的headers
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, mytoken");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Authorization"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") res.sendStatus(200);
    /*让options请求快速返回*/ else next();
  });
  app.use("/build", Build);
  app.use("/login", Login);
  app.use("/contr", Contr);
  app.use("/bill", Bill);
  app.use("/query", Query);
  app.use((req, res) => {
    res.status(500).json({ error: "api地址有问题", status: 500 });
  });
};
