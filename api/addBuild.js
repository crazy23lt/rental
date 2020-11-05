const Build = require("../model/build_info");
const Room = require("../model/room_info");
module.exports = async (req, res) => {
  const { landlordId, buildInfo, houseType } = req.body;
  const { layer, name, count, net, electricity, water } = buildInfo;
  try {
    const buildData = {
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
    console.info(buildData);
    // let newBuild = await new Build(buildData).save();
    const houseArray = [];
    // for (let i = 1; i <= layer - 0; i++) {
    //   for (let j = 1; j <= count - 0; j++) {
    //     let {
    //       bathroom,
    //       air_condition,
    //       geyser,
    //       gas,
    //       broadband,
    //       clear,
    //       rent,
    //     } = houseType[i - 1];
    //     let num = j >= 10 ? j : `0${j}`;
    //     houseArray.push({
    //       // buildId: newBuild._id,
    //       houseName: `${i}${num}房`,
    //       houseType: houseType[i - 1].unitType,
    //       houseConfig: {
    //         bathroom,
    //         air_condition,
    //         geyser,
    //         gas,
    //         broadband,
    //       },
    //       houseCost: { clear, rent, net, electricity, water },
    //     });
    //   }
    // }
    console.info(houseArray);
    // let NewHouse = await Room.insertMany(houseArray);
    // let Count = await Room.countDocuments({ buildId: newBuild._id });
    if (newBuild && NewHouse) {
      const {} = res.json({
        data: {
          Count,
          buildInfo: newBuild.buildInfo,
          buildCost: newBuild.buildCost,
        },
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
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
