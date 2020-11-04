const User = require("../model/user_info");
const kou = function (obj) {
  for (const key in obj) {
    return false; // 非空对象
  }
  return true; // 空对象
};
module.exports = async (req, res) => {
  const { id, name, phone, idcard, city, area, town, wxinfo = {} } = req.body;
  try {
    let UpdataInfo;
    if (id && name && phone && idcard && city && area && town) {
      if (kou(wxinfo)) {
        UpdataInfo = await User.findByIdAndUpdate(
          id,
          {
            userinfo: {
              name,
              phone,
              idcard,
              city,
              area,
              town,
            },
          },
          { new: true, select: { _id: 0, __v: 0, openid: 0 } }
        );
      } else {
        UpdataInfo = await User.findByIdAndUpdate(
          id,
          {
            userinfo: {
              name,
              phone,
              idcard,
              city,
              area,
              town,
            },
            wxinfo,
          },
          { new: true, select: { _id: 0, __v: 0, openid: 0 } }
        );
      }
    } else {
      UpdataInfo = false;
    }

    if (UpdataInfo) {
      // 已注册
      res.json({
        data: UpdataInfo,
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
