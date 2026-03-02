const express = require("express");
const router = express.Router();
const { addDonation, getDonations, getMyDonations } = require("../controllers/donationController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.get("/", protect, getDonations);
router.get("/mine", protect, requireRole("donor"), getMyDonations);
router.post("/", protect, requireRole("donor"), addDonation);

module.exports = router;