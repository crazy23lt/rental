const Contract = require("../model/contract_info");
module.exports = async (req, res) => {
  // 租房ID 起租时间 房间配置 基本信息（水电读数）
  const { landlordId, roomId, beginTime, roomConfig, Baseinfo } = req.body;
  console.info(req.body);
  try {
    let ret = await new Contract({
      roomId,
      time: { beginTime },
      roomConfig,
      Baseinfo,
      person: {
        landlordId,
      },
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
