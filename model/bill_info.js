const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillInfoSchema = new Schema(
  {
    ContractID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contract_info",
      required: true,
    },
    LandlordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_info",
    },
    BuildID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "build_info",
      required: true,
    },
  },
  { collection: "bill_info" }
);
module.exports = mongoose.model("bill_info", BillInfoSchema);
