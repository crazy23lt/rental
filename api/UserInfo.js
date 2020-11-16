const User = require("../model/user_info");
const Contract = require("../model/contract_info");
const Room = require("../model/room_info");
const { verifyToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  const { userid } = req.body;
  try {
    let tid = null;
    if (req.headers.authorization) {
      let token = req.headers.authorization;
      let { role, _id } = JSON.parse(verifyToken(token));
      tid = _id;
    }
    let qid = userid || tid;
    let UserInfo = await User.findById(qid);
    let ret = await Contract.findOne({ tenantId: tid }, { invalid: 0 });
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
