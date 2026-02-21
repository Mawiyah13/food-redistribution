const Donation = require("../models/Donation");
const Request = require("../models/Request");
const { matchDonationsWithRequests } = require("../utils/matcher");

async function getStats(req, res) {
  try {
    const totalDonations = await Donation.countDocuments();
    const totalRequests = await Request.countDocuments();

    const quantityResult = await Donation.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$quantity" }
        }
      }
    ]);

    const totalQuantity =
      quantityResult.length > 0 ? quantityResult[0].total : 0;

    const donations = await Donation.find();
    const requests = await Request.find();

    const matches = matchDonationsWithRequests(donations, requests);

    let totalMatchedQuantity = 0;

    for (const match of matches) {
      const request = requests.find(
        r => r._id.toString() === match.requestId.toString()
      );
      if (request) {
        totalMatchedQuantity += request.quantityNeeded;
      }
    }

    const totalMatchedRequests = matches.length;

    res.json({
      totalDonations,
      totalRequests,
      totalQuantity,
      totalMatchedRequests,
      totalMatchedQuantity
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching stats",
      error: error.message
    });
  }
}

module.exports = {
  getStats
};