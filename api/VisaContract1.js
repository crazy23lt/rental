const Contract = require("../model/contract_info");
const nextMonth = require("../utils/nextMonth");
module.exports = async (req, res) => {
  // 合同ID 租客ID
  let { id, tenantId, persons, residents } = req.body;
  const _id = tenantId;
  try {
    // 查询合同信息
    let queryInfo = await Contract.findById(id).lean();
    // 签订合同
    let vis = await Contract.findByIdAndUpdate(
      queryInfo._id,
      {
        tenantId: _id,
        Baseinfo: Object.assign(queryInfo.Baseinfo, { persons }),
        invalid: 1,
        residents,
      },
      {
        new: true,
      }
    )
      .populate({ path: "tenantId" })
      .populate({ path: "roomId" });
    if (vis) {
      res.json({
        data: null,
        meta: { msg: "合同签订成功", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同签订失败", status: 202 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
