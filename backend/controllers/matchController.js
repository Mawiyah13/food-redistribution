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
          donation.remainingQuantity >= request.quantityNeeded &&
          donation.expiryTime > new Date()
        ) {

          donation.remainingQuantity -= request.quantityNeeded;

          if (donation.remainingQuantity === 0) {
            donation.status = "completed";
          }

          request.status = "fulfilled";

          await donation.save();
          await request.save();

          matches.push({
            donation,
            request,
            matchedQuantity: request.quantityNeeded
          });

          break;
        }
      }
    }

    res.json(matches);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};