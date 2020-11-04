const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { id, name, phone, idcard, provinces, town } = req.body;
  const { cert } = req.params; // 此次请求是否市房东认证请求还是普通修改信息请求
  try {
    let UpdataInfo;
    if (id && name && phone && idcard && provinces && town) {
      let roleChange = cert - 0 ? { role: 1 } : {};
      console.info(roleChange);
      UpdataInfo = await User.findByIdAndUpdate(
        id, Object.assign(roleChange,
          {
            userinfo: {
              name,
              phone,
              idcard,
              provinces,
              town,
            },
          }),
        { new: true, select: { __v: 0 } }
      );
    } else {
      UpdataInfo = false;
    }
    if (UpdataInfo) {
      const { userinfo, role, wxinfo } = UpdataInfo;
      res.json({
        data: {
          nickName: wxinfo.nickName,
          avatarUrl: wxinfo.avatarUrl,
          role,
          name: userinfo.name,
          phone: userinfo.phone,
          idcard: userinfo.idcard,
          provinces: userinfo.provinces,
          town: userinfo.town,
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
