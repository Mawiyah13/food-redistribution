const Match = require("../models/Match");
const Donation = require("../models/Donation");
const Request = require("../models/Request");
const { runExpiryCheck } = require("../utils/expiryChecker");

const getMatches = async (req, res) => {
  await runExpiryCheck();
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    if (req.user.role === "donor") {
      const myDonations = await Donation.find({ donor: req.user._id }).select("_id");
      filter.donation = { $in: myDonations.map((d) => d._id) };
    } else if (req.user.role === "ngo") {
      const myRequests = await Request.find({ ngo: req.user._id }).select("_id");
      filter.request = { $in: myRequests.map((r) => r._id) };
    }

    const matches = await Match.find(filter)
      .populate("donation")
      .populate("request")
      .sort({ createdAt: -1 });

    // Mark as seen
    if (req.user.role === "donor") {
      await Match.updateMany(
        { donation: { $in: matches.map((m) => m.donation._id) }, seenByDonor: false },
        { seenByDonor: true }
      );
    } else {
      await Match.updateMany(
        { request: { $in: matches.map((m) => m.request._id) }, seenByNgo: false },
        { seenByNgo: true }
      );
    }

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createMatch = async (req, res) => {
  await runExpiryCheck();
  try {
    const donations = await Donation.find({ status: "available" });
    const requests = await Request.find({ status: "pending" });

    const newMatches = [];
    const now = new Date();

    for (const request of requests) {
      if (request.requiredBy && request.requiredBy < now) continue;
      for (const donation of donations) {
        if (donation.expiryTime < now) continue;
        if (
          donation.location.toLowerCase() === request.location.toLowerCase() &&
          donation.foodType.toLowerCase() === request.requiredFoodType.toLowerCase() &&
          donation.remainingQuantity >= request.quantityNeeded
        ) {
          const existing = await Match.findOne({
            donation: donation._id,
            request: request._id,
            status: "pending",
          });
          if (existing) continue;

          const match = await Match.create({
            donation: donation._id,
            request: request._id,
            matchedQuantity: request.quantityNeeded,
          });
          newMatches.push(match);
          break;
        }
      }
    }

    res.json({ message: `${newMatches.length} new match(es) created`, matches: newMatches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const completeMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("donation")
      .populate("request");

    if (!match) return res.status(404).json({ error: "Match not found" });
    if (match.status !== "pending")
      return res.status(400).json({ error: "Match is not pending" });

    // Verify NGO owns the request
    if (
      req.user.role === "ngo" &&
      match.request.ngo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const donation = await Donation.findById(match.donation._id);
    donation.remainingQuantity -= match.matchedQuantity;
    if (donation.remainingQuantity <= 0) {
      donation.remainingQuantity = 0;
      donation.status = "completed";
    }
    await donation.save();

    await Request.findByIdAndUpdate(match.request._id, { status: "fulfilled" });
    match.status = "completed";
    await match.save();

    res.json({ message: "Match confirmed and donation deducted", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const cancelMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });
    if (match.status !== "pending")
      return res.status(400).json({ error: "Only pending matches can be cancelled" });

    match.status = "cancelled";
    await match.save();

    res.json({ message: "Match cancelled", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNotificationStatus = async (req, res) => {
  try {
    let count = 0;
    if (req.user.role === "donor") {
      const myDonations = await Donation.find({ donor: req.user._id }).select("_id");
      count = await Match.countDocuments({
        donation: { $in: myDonations.map((d) => d._id) },
        seenByDonor: false,
        status: "pending",
      });
    } else {
      const myRequests = await Request.find({ ngo: req.user._id }).select("_id");
      count = await Match.countDocuments({
        request: { $in: myRequests.map((r) => r._id) },
        seenByNgo: false,
        status: "pending",
      });
    }
    res.json({ hasNew: count > 0, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMatches, createMatch, completeMatch, cancelMatch, getNotificationStatus };