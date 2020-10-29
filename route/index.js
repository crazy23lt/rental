module.exports = function (app) {
  app.all("*", (req, res, next) => {
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
    else next();
  });

  // 服务兜底函数
  app.use((req, res) => {
    res.status(500).json({ error: "Api地址错误", status: 200 });
  });
};
