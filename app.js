const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
require("./model/connect");
app.listen(3001, () => {
  console.info("新闻服务API启动成功！");
});
