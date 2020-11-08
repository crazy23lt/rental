const jwt = require("jsonwebtoken");
const cert = "rental";
const generateToken = function (data) {
  let _data = JSON.stringify(data);
  let created = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60; //两个月过期
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
};

module.exports = { generateToken, verifyToken };
