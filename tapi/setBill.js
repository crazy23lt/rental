const bill = require("../model/bill_info");
// const util = require('./util')
module.exports = async (req, res) => {
  let id = req.body.id; //账单id
  let { curWater, curElectric, toalCost } = req.body;
  try {
    const d = await bill.findById(id);
    let preWater = d.intiWater;
    let preElectric = d.initElectric;
    const water = curWater - preWater;
    const electric = curElectric - preElectric;
    //  preWater = d.initWater
    //  preElectric = d.initElectric
    const othercost = d.othercost.reduce(
      (pre, cur) => parseFloat(pre) + parseFloat(cur),
      0
    );
    // console.log(water);
    const toatl =
      water * d.eachWater +
      electric * d.eachElectric +
      d.clear +
      d.rent +
      // d.beforeCost 数据库没有字段
      (d.beforeCost - 0) +
      othercost +
      d.eachInter;
    console.log(toatl);
    // util.curWater = curWater
    // util.curElectric = curElectric
    if (toatl === parseFloat(toalCost)) {
      const data = await bill.findByIdAndUpdate(
        id,
        {
          preWater,
          preElectric,
          curWater,
          curElectric,
          toalCost: (toalCost - 0).toFixed(2),
        },
        {
          new: true,
        }
      );
      if (data) {
        res.json({
          state: "success",
          data: data,
          mes: "每月账单",
        });
      }
    } else {
      res.json({
        state: "fail",
        data: "",
        mes: "账单有误",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      err: "err",
    });
  }
};
