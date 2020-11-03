const Unit = require("../model/unit_info");
const Build = require("../model/build_info");
module.exports = async (req, res) => {
  const { id } = req.body;
  try {
    let build_ret = await Build.find(
      { _id: id },
      { _id: 0, user_id: 0, __v: 0 }
    );
    let unit_ret = await Unit.find({ build_id: id }, { build_id: 0, __v: 0 });
    if (build_ret && unit_ret) {
      res.json({
        data: { build_ret, unit_ret },
        meta: {
          status: 200,
          msg: "信息获取成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "信息获取失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
