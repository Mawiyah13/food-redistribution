const Request = require("../models/Request");
const { cleanRequest } = require("../utils/dataCleaner");
const { validateRequest } = require("../utils/dataValidation");

exports.addRequest = async (req, res) => {
  try {
    const cleanedData = cleanRequest(req.body);

    const validationError = validateRequest(cleanedData);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const request = await Request.create(cleanedData);

    res.status(201).json({
      message: "Request added successfully",
      data: request
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};