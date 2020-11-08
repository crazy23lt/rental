const Bill = require("../model/bill_info");
module.exports = async (req, res) => {
  // 解析表单字段
  try {
    res.json({
      data: null,
      meta: {
        status: 200,
        msg: "此乃创建账单接口未完成",
      },
    });
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: { msg: "服务器出现错误，请联系维护者", status: 500 },
    });
  }
};
