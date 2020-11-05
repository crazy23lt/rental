const Build = require("../model/build_info");
const Room = require("../model/room_info");
const buildModel = function (
  landlordId,
  houseType,
  layer,
  name,
  count,
  net,
  electricity,
  water
) {
  return {
    landlordId,
    buildInfo: {
      buildName: name,
      buildLayer: layer,
      layerCount: count,
    },
    buildCost: {
      net,
      electricity,
      water,
    },
    houseType,
  };
};
const HouseModel = function ({ layer, count, net, electricity, water, buildId, houseType }) {
  let HouseArray = [];
  for (let i = 1; i <= layer - 0; i++) {
    for (let j = 1; j <= count - 0; j++) {
      // // 每层房子的模板
      let LayerModel = {
        buildId,
        houseConfig: {
          bathroom: houseType[i - 1].bathroom,
          air_condition: houseType[i - 1].air_condition,
          geyser: houseType[i - 1].geyser,
          gas: houseType[i - 1].gas,
          broadband: houseType[i - 1].broadband
        },
        houseCost: {
          net, electricity, water,
          rent: houseType[i - 1].rent,
          clear: houseType[i - 1].clear
        }, unitType: houseType[i - 1].unitType
      }
      HouseArray.push(Object.assign(LayerModel, {
        houseName: `${i}${(j + '').padStart(2, 0)}号房`
      }))
    }
  }
  return HouseArray;
};
module.exports = async (req, res) => {
  // 解析表单字段
  const { landlordId, buildInfo, houseType } = req.body;
  const { layer, name, count, net, electricity, water } = buildInfo;
  try {
    // 初始化公寓数据模型
    let InitBuildModel = buildModel(
      landlordId,
      houseType,
      layer,
      name,
      count,
      net,
      electricity,
      water
    );
    // 插入数据
    let BuildResult = await new Build(InitBuildModel).save();
    // 解构 公寓信息 用于生成 出租屋
    let HouseResult = await Room.insertMany(HouseModel({ layer, count, net, electricity, water, buildId: BuildResult._id, houseType }));
    let Count = await Room.countDocuments({ buildId: BuildResult._id });
    if (true) {
      res.json({
        data: Count,
        meta: {
          status: 200,
          msg: "房子添加成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "添加失败，检查数据字段",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({
      data: null,
      meta: { msg: "服务器出现错误，请联系维护者", status: 500 },
    });
  }
};
