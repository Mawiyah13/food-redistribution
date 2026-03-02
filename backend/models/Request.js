const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  requiredFoodType: { type: String, required: true },
  quantityNeeded: { type: Number, required: true },
  location: { type: String, required: true },
  contactNumber: { type: String, required: true },
  requiredBy: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "fulfilled", "failed"],
    default: "pending",
  },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);