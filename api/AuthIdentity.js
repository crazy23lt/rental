const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { id, name, phone, idcard, provinces, town } = req.body;
  try {
    let UpdataInfo;
    if (id && name && phone && idcard && provinces && town) {
      UpdataInfo = await User.findByIdAndUpdate(
        id,
        {
          userinfo: {
            name,
            phone,
            idcard,
            provinces,
            town,
          },
        },
        { new: true, select: { __v: 0 } }
      );
    } else {
      UpdataInfo = false;
    }
    if (UpdataInfo) {
      // 已注册
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
