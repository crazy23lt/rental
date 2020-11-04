const User = require("../model/user_info");
module.exports = async (req, res) => {
  const { id, name, phone, idcard, city, area, town } = req.body;
  try {
    let UpdataInfo;
    if (id && name && phone && idcard && city && area && town) {
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
          role: 1,
        },
        {
          new: true,
          select: {
            _id: 0,
            openid: 0,
            __v: 0,
          },
        }
      );
    } else {
      UpdataInfo = false;
    }

    if (UpdataInfo) {
      res.json({
        data: UpdataInfo,
        meta: {
          status: 200,
          msg: "认证成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: { msg: "认证失败，表单信息填写有问题", status: 202 },
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
