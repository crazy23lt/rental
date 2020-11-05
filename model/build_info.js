const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buildInfoSchema = new Schema(
  {
    // 房东ID
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      required: true,
    },
    buildInfo: {
      buildName: { type: String, required: true },
      buildLayer: { type: Number, required: true },
      layerCount: { type: Number, required: true },
    },
    buildCost: {
      net: { type: Number, required: true },
      electricity: { type: Number, required: true },
      water: { type: Number, required: true },
    },
    houseType: {
      type: Array,
    },
    /**
     * houseType 内的值
     *  {
            "unitType": 1,  // 房型
            "bathroom": 0,   // 卫生间
            "air_condition": 0, 空调
            "geyser": 0, 热水器
            "gas": 0, 天然气
            "broadband": 0, 宽带
            "clear": 1000,  清洁费
            "rent": 200 月租
        },
     */
  },
  { collection: "build_info" }
);
module.exports = mongoose.model("build_info", buildInfoSchema);
