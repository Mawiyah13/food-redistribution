const Donation = require("../models/Donation");
const Request = require("../models/Request");

const runExpiryCheck = async () => {
  const now = new Date();
  try {
    await Donation.updateMany(
      { status: "available", expiryTime: { $lt: now }, remainingQuantity: { $gt: 0 } },
      { status: "failed" }
    );
    await Request.updateMany(
      { status: "pending", requiredBy: { $lt: now } },
      { status: "failed" }
    );
  } catch (err) {
    console.error("Expiry check error:", err.message);
  }
};

module.exports = { runExpiryCheck };