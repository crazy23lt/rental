const Bill = require("../model/bill_info");
module.exports = async (req, res) => {
  const { billId, pay } = req.body;
  try {
    let payret = await Bill.findByIdAndUpdate(
      billId,
      { pay: pay - 0 },
      { new: true, pay: 1 }
    );
    if (payret) {
      res.json({
        data: payret,
        meta: {
          status: 200,
          msg: "成功！用户支付。",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "失败！用户支付。",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: { msg: "服务器出现错误，请联系维护者", status: 500 },
    });
  }
};
