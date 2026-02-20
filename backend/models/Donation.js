const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  location: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  status: { type: String, default: "available" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);