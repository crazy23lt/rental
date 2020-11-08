const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillInfoSchema = new Schema(
  {
    // 合同ID
    contractId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contract_info",
      required: true,
    },
    // 持续时间
    duration: {
      startTime: {
        type: Number,
        required: true,
      },
      endTime: {
        type: Number,
        required: true,
      },
    },
    // 消耗
    consume: {
      //用水量
      water: {
        start: {
          type: Number,
          required: true,
        },
        end: {
          type: Number,
        },
      },
      //用电量
      electric: {
        start: {
          type: Number,
          required: true,
        },
        end: {
          type: Number,
        },
      },
    },
    // 账单状态
    status: {
      type: Number,
      default: 0,
      enum: [0, 1]  // 待付账单：0，已付账单：1
    }
  },
  { collection: "bill_info" }
);
module.exports = mongoose.model("bill_info", BillInfoSchema);
