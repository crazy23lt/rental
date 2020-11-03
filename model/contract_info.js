const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractInfoSchema = new Schema(
  {
    // 房间ID
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room_info",
      required: true,
    },
    // 租客id
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      default: null,
    },
    // 是否生效 默认失效  需要租客 确认
    invalid: {
      type: Boolean,
      default: false,
    },
    // 起租日期
    begin_tiem: {
      type: String,
      required: true,
    },
    // 租房人
    tenant_info: {
      persons: {
        type: Number,
      },
      name: {
        type: String,
      },
      phone: {
        type: Number,
      },
      idcard: {
        type: String,
      },
    },
    // 电表读数
    electric: {
      new_val: {
        type: Number,
        default: 0,
      },
      old_val: {
        type: Number,
        default: 0,
      },
    },
    // 水表
    water_meter: {
      new_val: {
        type: Number,
        default: 0,
      },
      old_val: {
        type: Number,
        default: 0,
      },
    },
    //
  },
  { collection: "contract_info" }
);
module.exports = mongoose.model("contract_info", ContractInfoSchema);
