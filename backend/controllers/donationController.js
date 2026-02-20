const Donation = require("../models/Donation");

exports.addDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({ message: "Donation added successfully", data: donation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};