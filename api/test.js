const bill = require("../model/bill_info");

module.exports = async (req, res) => {
  try {
    let BuildID = req.body.buildid;
    const builds =await bill
      .find({ BuildID }, "ContractID")
      .populate("ContractID", "time,roomConfig,person");
    console.log(builds);
    const builds2 =await bill
      .find({ BuildID }, "ContractID")
      .populate("ContractID", "time,roomConfig,person")
      .populate("person.tenantId", "userinfo");
    res.json({
      builds,
      builds2,
    });
    console.log(builds);
  } catch (error) {
    res.json({ err: "err" });
  }
};
