const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const generateToken = function (data) {
  let _data = JSON.stringify(data);
  let created = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60; //两个月过期
  let cert = fs.readFileSync(path.resolve(__dirname, "../pem/private_key.pem")); //私钥 可以自己生成
  let token = jwt.sign(
    {
      _data,
      sub: "Acesss",
      exp: created,
    },
    cert,
    { algorithm: "RS256" }
  );
  return token;
};
const verifyToken = function (token) {
  let cert = fs.readFileSync(path.join(__dirname, "../pem/public_key.pem")); //公钥 可以自己生成
  try {
    let result = jwt.verify(token, cert, { algorithms: ["RS256"] }) || {};
    let { exp = 0 } = result,
      current = Math.floor(Date.now() / 1000);
    // 比较时间是否过期
    if (current <= exp) {
      res = result._data || {};
    }
  } catch (e) {
    res = "err";
  }
  return res;
};

module.exports = { generateToken, verifyToken };
