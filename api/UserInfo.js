const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { userid } = req.body;
  try {
    let UserInfo = await User.findById(userid);
    if (UserInfo) {
      const { userinfo, role, wxinfo } = UserInfo;
      res.json({
        data: {
          nickName: wxinfo.nickName,
          avatarUrl: wxinfo.avatarUrl,
          role,
          name: userinfo.name ? userinfo.name : null,
          phone: userinfo.phone ? userinfo.phone : null,
          idcard: userinfo.idcard ? userinfo.idcard : null,
          provinces: userinfo.provinces ? userinfo.provinces : null,
          town: userinfo.town ? userinfo.town : null,
        },
        meta: {
          status: 200,
          msg: "获取用户信息成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "不存在该用户",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: {
        status: 500,
        msg: "服务器错误",
      },
    });
  }
};
