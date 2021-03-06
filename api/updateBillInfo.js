const Bill = require("../model/bill_info");

module.exports = async (req, res) => {
  const { billId, water = null, electric = null, status = null } = req.body;
  console.info(req.body);
  try {
    let update = {};
    if (status !== null) {
      update = {
        status: status,
      };
    } else {
      update = {
        "consume.water.end": water - 0,
        "consume.electric.end": electric - 0,
      };
    }
    console.info(update);
    let BillInfo = await Bill.findByIdAndUpdate(billId, update, { new: true });
    if (BillInfo) {
      res.json({
        data: { BillId: BillInfo._id },
        meta: {
          status: 200,
          msg: "成功！更新账单信息。",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "失败！更新账单信息。",
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
