const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomInfoSchema = new Schema(
  {
    buildId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
    billId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bill_info",
    },
    houseName: {
      type: String,
      required: true,
    },
    houseStatus: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], // 未发布 发布未出租 已出租
    },
    unitType: { type: Number }, // 户型
    houseConfig: {
      bathroom: {
        type: Number,
        default: 0,
        enum: [0, 1],
      },
      air_condition: {
        type: Number,
        default: 0,
      },
      geyser: {
        type: Number,
        default: 0,
        enum: [0, 1],
      },
      gas: {
        type: Number,
        default: 0,
        enum: [0, 1],
      },
      broadband: {
        type: Number,
        default: 0,
        enum: [0, 1],
      },
    },
    houseCost: {
      clear: {
        type: Number,
        default: 0,
      },
      rent: {
        type: Number,
        default: 0,
      },
      net: {
        type: Number,
        default: 0,
      },
      electricity: {
        type: Number,
        default: 0,
      },
      water: {
        type: Number,
        default: 0,
      },
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { collection: "room_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("room_info", roomInfoSchema);
