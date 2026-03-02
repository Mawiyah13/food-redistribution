const Donation = require("../models/Donation");

const addDonation = async (req, res) => {
  try {
    const donation = await Donation.create({
      ...req.body,
      donor: req.user._id,
      remainingQuantity: req.body.quantity,
    });
    res.status(201).json({ message: "Donation added successfully", data: donation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getDonations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) filter.location = new RegExp(req.query.location, "i");
    if (req.query.foodType) filter.foodType = new RegExp(req.query.foodType, "i");
    if (req.query.status) filter.status = req.query.status;
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyDonations = async (req, res) => {
  try {
    const filter = { donor: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.foodType) filter.foodType = new RegExp(req.query.foodType, "i");
    if (req.query.location) filter.location = new RegExp(req.query.location, "i");
    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addDonation, getDonations, getMyDonations };