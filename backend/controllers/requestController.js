const Request = require("../models/Request");

const addRequest = async (req, res) => {
  try {
    const request = await Request.create({ ...req.body, ngo: req.user._id });
    res.status(201).json({ message: "Request added successfully", data: request });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const filter = {};
    if (req.query.location) filter.location = new RegExp(req.query.location, "i");
    if (req.query.foodType) filter.requiredFoodType = new RegExp(req.query.foodType, "i");
    if (req.query.status) filter.status = req.query.status;
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const filter = { ngo: req.user._id };
    if (req.query.status) filter.status = req.query.status;
    if (req.query.foodType) filter.requiredFoodType = new RegExp(req.query.foodType, "i");
    if (req.query.location) filter.location = new RegExp(req.query.location, "i");
    const requests = await Request.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addRequest, getRequests, getMyRequests };