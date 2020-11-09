const User = require("../model/user_info");
const { generateToken } = require("../utils/jwt");
module.exports = async (req, res) => {
  const { id, name, phone, idcard, location, village } = req.body;
  const { cert } = req.params; // 此次请求是否市房东认证请求还是普通修改信息请求
  try {
    let UpdataInfo;
    if (id && name && phone && idcard && location && village) {
      let roleChange = cert - 0 ? { role: 1 } : {};
      UpdataInfo = await User.findByIdAndUpdate(
        id,
        Object.assign(roleChange, {
          userinfo: {
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
    } else {
      UpdataInfo = false;
    }
    if (UpdataInfo) {
      const { userinfo, role, wxinfo, _id } = UpdataInfo;
      let token = generateToken(role, _id);
      res.json({
        data: {
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
        meta: { msg: "信息更新失败,表单数据缺失", status: 202 },
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
