const Contract = require("../model/contract_info");
module.exports = async (req, res) => {
  const { room_id, begin_tiem, electric_val, water_val } = req.body;
  console.info(req.body);
  try {
    let ret = await new Contract({
      room_id,
      begin_tiem,
      electric: { old_val: electric_val },
      water_meter: { old_val: water_val },
    }).save();
    if (ret) {
      res.json({
        data: { id: ret._id },
        meta: { msg: "合同初始化完成，返回合同ID", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同初始失败", status: 200 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
