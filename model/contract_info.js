const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContractInfoSchema = new Schema(
  {
    // 房间ID
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room_info",
      required: true,
    },
    time: {
      // 起租日期
      beginTime: {
        type: Number,
        required: true,
      },
      // 结束时间
      endTime: {
        type: Number,
        default: null,
      },
    },
    // 租房配置
    roomConfig: {
      // 房间名称
      houseName: {
        type: String,
        required: true,
      },
      // 房间户型
      unitType: {
        type: Number,
        required: true,
      },
      // 家电电器等设备
      houseConfig: {
        bathroom: {
          type: Number,
          default: 0,
          enum: [0, 1],
          required: true,
        },
        air_condition: {
          type: Number,
          default: 0,
          enum: [0, 1],
          required: true,
        },
        geyser: {
          type: Number,
          default: 0,
          enum: [0, 1],
          required: true,
        },
        gas: {
          type: Number,
          default: 0,
          enum: [0, 1],
          required: true,
        },
        broadband: {
          type: Number,
          default: 0,
          enum: [0, 1],
          required: true,
        },
      },
      houseCost: {
        clear: {
          type: Number,
          required: true,
        },
        rent: {
          type: Number,
          required: true,
        },
        net: {
          type: Number,
          required: true,
        },
        electricity: {
          type: Number,
          required: true,
        },
        water: {
          type: Number,
          required: true,
        },
      },
    },
    // 是否生效 默认失效  需要租客 确认
    invalid: {
      type: Number,
      default: 0,
      enum: [0, 1, 2], // 0 合同初始化完成，1 合同生效， 2 合同过期
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      default: null,
    },
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
      default: null,
    },

    // 合同信息
    Baseinfo: {
      persons: {
        type: Number,
        default: null,
      },
      // 电表读数
      electric: {
        type: Number,
        required: true,
      },
      // 水表
      water: {
        type: Number,
        required: true,
      },
    },
  },
  { collection: "contract_info" }
);
module.exports = mongoose.model("contract_info", ContractInfoSchema);
