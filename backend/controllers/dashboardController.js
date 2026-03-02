const Donation = require("../models/Donation");
const Request = require("../models/Request");
const Match = require("../models/Match");
const { runExpiryCheck } = require("../utils/expiryChecker");

const getDashboard = async (req, res) => {
  await runExpiryCheck();
  try {
    const userId = req.user._id;
    const role = req.user.role;

    if (role === "donor") {
      const [total, active, completed, failed] = await Promise.all([
        Donation.countDocuments({ donor: userId }),
        Donation.countDocuments({ donor: userId, status: "available" }),
        Donation.countDocuments({ donor: userId, status: "completed" }),
        Donation.countDocuments({ donor: userId, status: "failed" }),
      ]);
      const myDonations = await Donation.find({ donor: userId }).select("_id");
      const ids = myDonations.map((d) => d._id);
      const [pendingMatches, completedMatches, cancelledMatches] = await Promise.all([
        Match.countDocuments({ donation: { $in: ids }, status: "pending" }),
        Match.countDocuments({ donation: { $in: ids }, status: "completed" }),
        Match.countDocuments({ donation: { $in: ids }, status: "cancelled" }),
      ]);
      return res.json({
        role,
        totalDonations: total,
        activeDonations: active,
        completedDonations: completed,
        failedDonations: failed,
        pendingMatches,
        completedMatches,
        cancelledMatches,
      });
    }

    if (role === "ngo") {
      const [total, pending, fulfilled, failed] = await Promise.all([
        Request.countDocuments({ ngo: userId }),
        Request.countDocuments({ ngo: userId, status: "pending" }),
        Request.countDocuments({ ngo: userId, status: "fulfilled" }),
        Request.countDocuments({ ngo: userId, status: "failed" }),
      ]);
      const myRequests = await Request.find({ ngo: userId }).select("_id");
      const ids = myRequests.map((r) => r._id);
      const [pendingMatches, completedMatches] = await Promise.all([
        Match.countDocuments({ request: { $in: ids }, status: "pending" }),
        Match.countDocuments({ request: { $in: ids }, status: "completed" }),
      ]);
      return res.json({
        role,
        totalRequests: total,
        pendingRequests: pending,
        fulfilledRequests: fulfilled,
        failedRequests: failed,
        pendingMatches,
        completedMatches,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };