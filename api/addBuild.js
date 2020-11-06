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
const HouseModel = function ({
  layer,
  count,
  net,
  electricity,
  water,
  buildId,
  houseType,
}) {
  let HouseArray = [];
  houseType.forEach((item, index) => {
    for (let i = 1; i <= layer; i++) {
      let LayerModel = {
        buildId,
        houseConfig: {
          bathroom: item.bathroom,
          air_condition: item.air_condition,
          geyser: item.geyser,
          gas: item.gas,
          broadband: item.broadband,
        },
        houseCost: {
          net,
          electricity,
          water,
          rent: item.rent,
          clear: item.clear,
        },
        unitType: item.unitType,
      };
      HouseArray.push(
        Object.assign(LayerModel, {
          houseName: `${i}${(index + 1 + "").padStart(2, 0)}号房`,
        })
      );
    }
  });
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
    let BuildResult = await new Build(InitBuildModel).save();
    let InitHouseModel = HouseModel({
      layer,
      count,
      net,
      electricity,
      water,
      buildId: BuildResult._id,
      houseType,
    });

    // 插入数据
    // 解构 公寓信息 用于生成 出租屋
    await Room.insertMany(InitHouseModel);
    let Count = await Room.countDocuments({ buildId: BuildResult._id });
    // console.info(InitHouseModel);
    if (true) {
      res.json({
        data: { Count },
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
