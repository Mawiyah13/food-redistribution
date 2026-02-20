const Request = require("../models/Request");

exports.addRequest = async (req, res) => {
  try {
    const request = await Request.create(req.body);
    res.status(201).json({ message: "Request added successfully", data: request });
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