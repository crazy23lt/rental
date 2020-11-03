const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomInfoSchema = new Schema(
  {
    buildId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
    houseName: {
      type: String,
      required: true,
    },
    houseStatus: {
      type: Number,
      default: 0,
      enum: [0, 1, 2],
    },
    houseType: { type: Number },
    houseConfig: { type: Object },
    houseCost: { type: Object },
  },
  { collection: "room_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("room_info", roomInfoSchema);
