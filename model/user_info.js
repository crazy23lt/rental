const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userInfoSchema = new Schema(
  {
    openid: { type: String, required: true, },
    wxinfo: { type: Object, required: true, },
    userinfo: {
      name: { type: String, default: null, },
      phone: { type: String, default: null, },
      idcard: { type: String, default: null, },
      provinces: { type: String, default: null, },
      town: { type: String, default: null, },
    },
    role: {
      type: Number,
      default: 0,
      enum: [0, 1], // 0：普通租客    1：房东 
    },
  },
  { collection: "user_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("user_info", userInfoSchema);
