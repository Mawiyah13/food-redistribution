const Donation = require("../models/Donation");
const Request = require("../models/Request");

exports.getMatches = async (req, res) => {
  try {
    const donations = await Donation.find({ status: "available" });
    const requests = await Request.find({ status: "pending" });

    const matches = [];

    for (const request of requests) {
      for (const donation of donations) {
        if (
          donation.location.toLowerCase() === request.location.toLowerCase() &&
          donation.foodType.toLowerCase() === request.requiredFoodType.toLowerCase() &&
          donation.quantity >= request.quantityNeeded
        ) {
          matches.push({ donation, request });
          break; // one donation matched to one request
        }
      }
    }

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};