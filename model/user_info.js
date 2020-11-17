const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    openid: { type: String, required: true },
    wxinfo: { type: Object, required: true },
    userinfo: {
      wxnumber: { type: String, default: null },
      name: { type: String, default: null },
      phone: { type: String, default: null },
      idcard: { type: String, default: null },
      provinces: { type: String, default: null }, // 省
      city: { type: String, default: null }, // 市
      area: { type: String, default: null }, // 区
      village: { type: String, default: null }, // 村
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1], // 0：普通租客    1：房东
    },
    token: {
      type: String,
      // required: true,
    },
  },
  { collection: "user_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("user_info", userInfoSchema);
