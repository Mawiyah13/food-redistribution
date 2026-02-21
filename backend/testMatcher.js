const { matchDonationsWithRequests } = require("./utils/matcher");

const donations = [
  {
    _id: "d1",
    location: "Chennai",
    foodType: "Veg",
    quantity: 50
  }
];

const requests = [
  {
    _id: "r1",
    location: "Chennai",
    requiredFoodType: "Veg",
    quantityNeeded: 30
  }
];

console.log(matchDonationsWithRequests(donations, requests));