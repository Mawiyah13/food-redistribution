const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: Number, required: true },
  remainingQuantity: { type: Number },
  location: { type: String, required: true },
  expiryTime: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "completed", "failed"],
    default: "available",
  },
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

donationSchema.pre("save", function (next) {
  if (this.remainingQuantity === undefined || this.remainingQuantity === null) {
    this.remainingQuantity = this.quantity;
  }
  next();
});

module.exports = mongoose.model("Donation", donationSchema);