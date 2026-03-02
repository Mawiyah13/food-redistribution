require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const connectDB = require("./config/db");
const { runExpiryCheck } = require("./utils/expiryChecker");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/requests", require("./routes/requestRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

cron.schedule("*/30 * * * *", async () => {
  console.log("Running expiry check...");
  await runExpiryCheck();
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));