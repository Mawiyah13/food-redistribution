const express = require("express");
const router = express.Router();
const { addRequest, getRequests, getMyRequests } = require("../controllers/requestController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.get("/", protect, getRequests);
router.get("/mine", protect, requireRole("ngo"), getMyRequests);
router.post("/", protect, requireRole("ngo"), addRequest);

module.exports = router;