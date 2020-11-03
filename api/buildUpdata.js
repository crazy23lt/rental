const Build = require("../model/build_info");
module.exports = async (req, res) => {
  const { id, buildInfo, houseType } = req.body;
  const { layer, name, count, net, electricity, water } = buildInfo;
  try {
    const buildData = {
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
    let newBuild = await Build.findByIdAndUpdate(id, buildData, { new: true });
    if (newBuild) {
      res.json({
        data: newBuild,
        meta: {
          status: 200,
          msg: "信息修改成功",
        },
      });
    } else {
      res.json({
        data: null,
        meta: {
          status: 202,
          msg: "信息修改失败",
        },
      });
    }
  } catch (e) {
    console.info(e);
    res.json({ data: null, meta: { msg: "服务器错误", status: 500 } });
  }
};
