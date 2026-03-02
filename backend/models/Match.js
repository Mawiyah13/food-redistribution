const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  donation: { type: mongoose.Schema.Types.ObjectId, ref: "Donation", required: true },
  request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
  matchedQuantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  seenByDonor: { type: Boolean, default: false },
  seenByNgo: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Match", matchSchema);