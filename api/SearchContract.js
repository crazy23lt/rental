const Contract = require("../model/contract_info");
module.exports = async (req, res) => {
  // 支持，通过关联房间Id 来查询
  // 支持，通过合同ID 来查询
  const { id } = req.body;
  try {
    let ret = await Contract.findById(id, {
      time: 1,
      roomConfig: 1,
      Baseinfo: 1,
    }).populate({ path: "roomId", select: { houseStatus: 1 } });

    if (ret) {
      res.json({
        data: ret,
        meta: { msg: "合同查询成功", status: 200 },
      });
    } else {
      res.json({ data: null, meta: { msg: "合同查询失败", status: 202 } });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
