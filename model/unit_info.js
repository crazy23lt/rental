const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UnitInfoSchema = new Schema(
  {
    build_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
    unit_name: {
      type: String,
      required: true,
    },
    unit_room: {
      type: Number,
      required: true,
    },
    unit_config: {
      bathroom: {
        type: Boolean,
        default: false,
        enum: [true, false],
        required: true,
      },
      air_condition: {
        type: Boolean,
        default: false,
        enum: [true, false],
        required: true,
      },
      geyser: {
        type: Boolean,
        default: false,
        enum: [true, false],
        required: true,
      },
      gas: {
        type: Boolean,
        default: false,
        enum: [true, false],
        required: true,
      },
      net: {
        type: Boolean,
        default: false,
        enum: [true, false],
        required: true,
      },
    },
    unit_cost: {
      clear: {
        type: Number,
        default: 0,
        required: true,
      },
      rent: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  },
  { collection: "unit_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("unit_info", UnitInfoSchema);
