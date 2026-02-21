const Donation = require("../models/Donation");
const Request = require("../models/Request");

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

    res.json({
      totalDonations,
      totalRequests,
      totalQuantity
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