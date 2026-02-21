const { validateDonation } = require("./utils/dataValidation");

const badData = {
  donorName: "",
  foodType: "Veg",
  quantity: 0,
  location: "Chennai",
  contactNumber: "123"
};

console.log(validateDonation(badData));