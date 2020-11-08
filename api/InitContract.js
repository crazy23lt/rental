const Contract = require("../model/contract_info");
module.exports = async (req, res) => {
  // 租房ID 起租时间 房间配置 基本信息（水电读数）
  const {
    landlordId,
    roomId,
    beginTime,
    houseName,
    unitType,
    houseConfig,
    houseCost,
    Baseinfo,
  } = req.body;
  console.info(req.body);
  try {
    let ret = await new Contract({
      roomId,
      time: { beginTime },
      roomConfig: {
        houseName,
        unitType,
        houseConfig: {
          bathroom: houseConfig.bathroom === "none" ? 0 : houseConfig.bathroom,
          air_condition:
            houseConfig.air_condition === "none"
              ? 0
              : houseConfig.air_condition,
          geyser: houseConfig.geyser === "none" ? 0 : houseConfig.geyser,
          gas: houseConfig.gas === "none" ? 0 : houseConfig.gas,
          broadband:
            houseConfig.broadband === "none" ? 0 : houseConfig.broadband,
        },
        houseCost,
      },
      Baseinfo,
      landlordId,
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
