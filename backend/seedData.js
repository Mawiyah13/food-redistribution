require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");
const Donation = require("./models/Donation");
const Request = require("./models/Request");

const { cleanDonation, cleanRequest } = require("./utils/dataCleaner");

async function seedDatabase() {
  try {
    await connectDB();

    const dataPath = path.join(__dirname, "../data/sampleData.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const { donations, requests } = JSON.parse(rawData);
    await Donation.deleteMany();
    await Request.deleteMany();
    const cleanedDonations = donations.map(d => cleanDonation(d));
    const cleanedRequests = requests.map(r => cleanRequest(r));

    await Donation.insertMany(cleanedDonations);
    await Request.insertMany(cleanedRequests);

    console.log("✅ Database seeded successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();