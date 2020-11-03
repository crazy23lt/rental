const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const buildInfoSchema = new Schema(
  {
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      required: true,
    },
    buildInfo: { type: Object },
    buildCost: { type: Object },
    houseType: {
      type: Array,
    },
  },
  { collection: "build_info" }
);
module.exports = mongoose.model("build_info", buildInfoSchema);
