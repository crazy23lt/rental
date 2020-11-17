const User = require("../model/user_info");
const jscode = require("../utils/jscode2session");
const { generateToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  const { code, wxinfo: insertwx } = req.body;
  try {
    let { openid: opid } = await jscode(code);
    // 每次登录都将更新 wxinfo 信息
    let findUser = await User.findOneAndUpdate(
      { openid: opid },
      { wxinfo: insertwx },
      { new: true }
    ).lean();
    if (findUser) {
      const { openid, role, userinfo, wxinfo, _id } = findUser;
      let token = generateToken({ role, _id });
      console.info(token);
      // 已注册
      // 数据库存入token
      await User.findByIdAndUpdate(_id, { token });
      res.json({
        data: {
          openid,
          userid: _id,
          role,
          userinfo: userinfo.name === null ? null : userinfo,
          nickName: wxinfo.nickName,
          avatarUrl: wxinfo.avatarUrl,
          token: token ? token : "没token",
        },
        meta: {
          msg: "登陆成功",
          status: 200,
        },
      });
    } else {
      // 没有注册过
      const saveData = Object.assign(
        { wxinfo: insertwx },
        { openid: opid, token: "" }
      );
      let ret = await new User(saveData).save();
      const { openid, role, userinfo, wxinfo, _id } = ret;
      let token = generateToken({ role, _id });
      // 数据库存入token
      await User.findByIdAndUpdate(_id, { token });
      res.json({
        data: {
          openid,
          userid: _id,
          role,
          userinfo: userinfo.name === null ? null : userinfo,
          nickName: wxinfo.nickName,
          avatarUrl: wxinfo.avatarUrl,
          token: token ? token : "没token",
        },
        meta: {
          msg: "注册并登陆成功",
          status: 200,
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.status(500).json({ data: null, msg: "服务器错误" });
  }
};
