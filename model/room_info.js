const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const roomInfoSchema = new Schema(
  {
    room_name: {
      type: String,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "room_info" }
);
// usersSchema.plugin(bcryptPlugin);
module.exports = mongoose.model("room_info", roomInfoSchema);
