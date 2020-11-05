const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillInfoSchema = new Schema(
  {
    // 公寓ID
    buildID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
    // 起租时间
    startTime: {
      type: Date,
      required: true,
    },
    // 结束时间
    endTime: {
      type: Date,
      required: true,
    },
    // 租客名称
    userName: {
      type: String,
      required: true,
    },
    // 房间名称
    hourse: {
      type: String,
      required: true,
    },
    // 租金
    rent: {
      type: Number,
      required: true,
    },
    // 清洁费
    clear: Number,
    //月首水费
    preWater: {
      type: Number,
      required: true,
    },
    curWater: Number,
    eachWater: {
      type: Number,
      required: true,
    },
    preElectric: {
      type: Number,
      required: true,
    },
    curElectric: Number,
    eachElectric: {
      type: Number,
      required: true,
    },
    eachInter: Number,
    other: Array,
    othercost: Array,
    oldCost: {
      type: Number,
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
