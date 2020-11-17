const User = require("../model/user_info");
const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { userid = null } = req.body;
  console.info(`查询对象：userid:${userid}`);
  console.info(`使用接口的人：_userid:${req._userid}`);
  try {
    let UserInfo = await User.findById(userid || req._userid);
    let ret = await Contract.findOne(
      { tenantId: userid || req._userid },
      { invalid: 0 }
    );
    let buildName = null;
    if (ret) {
      buildName = await Room.findById(ret.roomId, { buildId: 1 }).populate({
        path: "buildId",
        select: { "buildInfo.buildName": 1 },
      });
    }
    if (UserInfo) {
      const { userinfo, role, wxinfo } = UserInfo;
      res.json({
        data: {
          nickName: wxinfo.nickName,
          avatarUrl: wxinfo.avatarUrl,
          role,
          wxnumber: userinfo.wxnumber ? userinfo.wxnumber : null,
          name: userinfo.name ? userinfo.name : null,
          phone: userinfo.phone ? userinfo.phone : null,
          idcard: userinfo.idcard ? userinfo.idcard : null,
          provinces: userinfo.provinces ? userinfo.provinces : null,
          city: userinfo.city ? userinfo.city : null,
          area: userinfo.area ? userinfo.area : null,
          village: userinfo.village ? userinfo.village : null,
          ret,
          buildName,
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
          msg: "查无此人",
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
