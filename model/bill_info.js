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
      currTime: {
        type: Number,
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
      enum: [0, 1, 2], // 租客待付账单阶段:0    房东确认收款阶段:1    房东完成收款（账单完结，自动生成下月账单）：2
    },
    // 支付方式
    pay: {
      type: Number,
      enum: [0, 1, 2, 3], // 微信  银行   支付宝   现金
    },
    // totle
    total: {
      type: Number,
      default: 0,
    },
  },
  { collection: "bill_info" }
);
module.exports = mongoose.model("bill_info", BillInfoSchema);


