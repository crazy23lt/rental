const axios = require("axios");
const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { code, wxinfo = null } = req.body;
  try {
    let { data } = await axios({
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxcf46c7e74bd15998&secret=70ff63f9bcc22ccc2ef3beb444a9a1e2&js_code=${code}&grant_type=authorization_code`,
    });
    const { openid } = data;
    let findUser = await User.findOne({ openid }, { __v: 0 });
    console.info(findUser);
    if (findUser) {
      // 已注册
      res.json({
        data: {
          id: findUser._id,
          userinfo: findUser.userinfo ? findUser.userinfo : null,
        },
        meta: {
          msg: "登陆成功",
          status: 200,
        },
      });
    } else {
      console.info(req.body);
      // 没有注册过
      const saveData = Object.assign({ wxinfo }, { openid });
      let ret = await new User(saveData).save();
      res.json({
        data: { id: ret._id, userinfo: ret.userinfo ? ret.userinfo : null },
        meta: {
          msg: "登陆并注册成功",
          status: 200,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
