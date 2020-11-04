const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buildInfoSchema = new Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      required: true,
    },
    buildInfo: {
      buildName: { type: String, required: true, },
      buildLayer: { type: Number, required: true, },
      layerCount: { type: Number, required: true, },
    },
    buildCost: {
      net: { type: Number, required: true, },
      electricity: { type: Number, required: true, },
      water: { type: Number, required: true, },
    },
    houseType: {
      type: Array,
    },
  },
  { collection: "build_info" }
);
module.exports = mongoose.model("build_info", buildInfoSchema);
