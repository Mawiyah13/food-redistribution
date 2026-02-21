const Donation = require("../models/Donation");
const { cleanDonation } = require("../utils/dataCleaner");
const { validateDonation } = require("../utils/dataValidation");

exports.addDonation = async (req, res) => {
  try {
    // 1️⃣ Clean incoming data
    const cleanedData = cleanDonation(req.body);

    // 2️⃣ Validate cleaned data
    const validationError = validateDonation(cleanedData);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    // 3️⃣ Save to database
    const donation = await Donation.create(cleanedData);

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