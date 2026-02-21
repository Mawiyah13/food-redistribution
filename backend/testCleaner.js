const { cleanDonation } = require("./utils/dataCleaner");

const sample = {
  donorName: " ABC Hotel ",
  foodType: "vegetarian",
  quantity: "50",
  location: " chennai ",
  expiryTime: "4 hours",
  contactNumber: "9876543210"
};

console.log(cleanDonation(sample));