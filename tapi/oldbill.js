const bill = require("../model/bill_info");
const nextMonth = require("../utils/nextMonth");
module.exports = async (req, res) => {
  let id = req.body.id; //账单id
  try {
    const d = await bill.findById(id);
    const initWater = d.curWater;
    const initElectric = d.curElectric;
    const t = d.endTime;
    const startTime = t;
    const endTime = nextMonth(t);
    const beforeCost = d.toalCost;
    const max = parseInt(d.max) + 1;
    if (max > 3) {
      res.json({
        state: "success",
        data: data,
        mes: "超过最大次数",
      });
    } else {
      const data = await bill.findByIdAndUpdate(
        id,
        {
          initWater,
          initElectric,
          endTime,
          beforeCost,
          startTime,
          max,
        },
        {
          new: true,
        }
      );
      if (data) {
        res.json({
          state: "success",
          data: data,
          mes: "已合并,剩余次数" + 3 - max,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      err: "err",
    });
  }
};
