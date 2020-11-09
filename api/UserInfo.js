const User = require("../model/user_info");
const { verifyToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  try {
    if (req.headers.authorization) {
      let { _id } = JSON.parse(verifyToken(req.headers.authorization));
      let UserInfo = await User.findById(_id);
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
            city: userinfo.city ? userinfo.city : null,
            area: userinfo.area ? userinfo.area : null,
            village: userinfo.village ? userinfo.village : null,
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
            msg: "",
          },
        });
      }
    } else {
      res.json({
        data: null,
        meta: {
          status: 401,
          msg: "token信息错误",
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
