const Bill = require("../model/bill_info");
const moment = require("moment"); //引入moment
moment.locale("zh-cn"); //设置时区
module.exports = async (req, res) => {
  const { buildID } = req.body;
  const { page, size } = req.params;
  //   console.info(buildID);
  // 解析表单字段
  const time = moment().format("x");
  try {
    /**
     * $lt,$lte,$gt,$gte.
     *  <,<=,>,>=
     *  展示账单结束日期小于当前时间戳的账单
     */
    //  { buildID, endTime: { $gte: time } },
    const queryBills = await Bill.find(
      { buildID },
      { _id: 1, startTime: 1, endTime: 1, userName: 1, houser: 1 }
    )
      .lean()
      .limit(size - 0)
      .skip((page - 1) * size);
    queryBills.forEach((item) => {
      console.info(item);
    });
    res.json({
      data: { queryBills },
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
