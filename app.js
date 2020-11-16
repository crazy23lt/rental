const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
require("./model/connect");
require("./route")(app);
app.listen(3000, () => {
  console.info("租房API！");
});
