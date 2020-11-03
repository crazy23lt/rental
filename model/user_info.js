const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userInfoSchema = new Schema(
  {
    openid: { type: String },
    wxinfo: { type: Object },
    userinfo: { type: Object },
  },
  { collection: "user_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("user_info", userInfoSchema);
