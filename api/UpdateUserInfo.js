const User = require("../model/user_info");
const Contract = require("../model/contract_info");
const { generateToken, verifyToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  const { name, phone, idcard, location, village, wxnumber = null } = req.body;
  const { cert } = req.params; // 此次请求是否市房东认证请求还是普通修改信息请求
  try {
    if (req.headers.authorization) {
      const { _id } = JSON.parse(verifyToken(req.headers.authorization));
      if (name && phone && idcard && location && village) {
        let roleChange = cert - 0 ? { role: 1 } : {};
        let UpdataInfo = await User.findByIdAndUpdate(
          _id,
          Object.assign(roleChange, {
            token: generateToken({ role: 1, _id }),
            userinfo: {
              wxnumber,
              name,
              phone,
              idcard,
              provinces: location[0],
              city: location[1],
              area: location[2],
              village,
            },
          }),
          { new: true, select: { __v: 0 } }
        );
        if (UpdataInfo) {
          const { userinfo, role, wxinfo, _id, token } = UpdataInfo;
          res.json({
            data: {
              userid: _id,
              nickName: wxinfo.nickName,
              avatarUrl: wxinfo.avatarUrl,
              role,
              name: userinfo.name,
              phone: userinfo.phone,
              idcard: userinfo.idcard,
              provinces: userinfo.provinces,
              city: userinfo.city,
              area: userinfo.area,
              village: userinfo.village,
              token,
            },
            meta: {
              status: 200,
              msg: "信息更新成功",
            },
          });
        } else {
          res.json({
            data: null,
            meta: { msg: "信息更新失败", status: 202 },
          });
        }
      } else {
        res.json({
          data: null,
          meta: { msg: "表单字段缺失，请重新填写", status: 202 },
        });
      }
    } else {
      res.json({
        data: null,
        meta: { msg: "身份验证失败，请重新登陆", status: 202 },
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
