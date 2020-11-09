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
    const beforeCost = 0;
    const max = 0;
    const data = await bill.findByIdAndUpdate(
      id,
      {
        initWater,
        initElectric,
        startTime,
        endTime,
        beforeCost,
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
        mes: "已结账",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      err: "err",
    });
  }
};
