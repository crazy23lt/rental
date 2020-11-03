const Contract = require("../model/contract_info");
module.exports = async (req, res) => {
  // 支持，通过关联房间Id 来查询
  // 支持，通过合同ID 来查询
  const { id, room_id } = req.body;
  try {
    let ret = null;
    // 通过房间ID
    if (room_id) {
      ret = await Contract.findOne({ room_id, invalid: true }).populate({
        path: "room_id",
        populate: [{ path: "unit_id" }, { path: "build_id" }],
      });
    } else if (id) {
      // 通过合同ID
      ret = await Contract.findById(id).populate({
        path: "room_id",
        populate: [{ path: "unit_id" }, { path: "build_id" }],
      });
    }
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
