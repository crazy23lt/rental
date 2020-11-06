const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillInfoSchema = new Schema(
  {
    buildID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    hourse: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    clear: Number,
    intiWater: {
      type: Number,
      required: true,
    },
    preWater: Number,
    curWater: Number,
    eachWater: {
      type: Number,
      required: true,
    },
    initElectric: {
      type: Number,
      required: true,
    },
    preElectric: Number,
    curElectric: Number,
    eachElectric: {
      type: Number,
      required: true,
    },
    eachInter: Number,
    other: Array,
    othercost: Array,
    beforeCost: {
      trpe: Number,
      default: 0,
    },
    max: {
      trpe: Number,
      default: 0,
    },
    toalCost: {
      type: Number,
    },
  },
  { collection: "bill_info" }
);
module.exports = mongoose.model("bill_info", BillInfoSchema);
