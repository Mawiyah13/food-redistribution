const Donation = require("../models/Donation");
const { cleanDonation } = require("../utils/dataCleaner");
const { validateDonation } = require("../utils/dataValidation");

exports.addDonation = async (req, res) => {
  try {
    const cleanedData = cleanDonation(req.body);

    const validationError = validateDonation(cleanedData);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const donation = await Donation.create({
      ...cleanedData,
      remainingQuantity: cleanedData.quantity
    });

    res.status(201).json({
      message: "Donation added successfully",
      data: donation
    });

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