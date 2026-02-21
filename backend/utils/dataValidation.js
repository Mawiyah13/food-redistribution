function validateDonation(data) {
  if (!data.donorName || !data.foodType || !data.quantity || !data.location || !data.contactNumber) {
    return "All donation fields are required";
  }

  if (data.quantity <= 0) {
    return "Quantity must be greater than 0";
  }

  if (data.contactNumber.length !== 10) {
    return "Contact number must be 10 digits";
  }

  return null;
}

function validateRequest(data) {
  if (!data.organizationName || !data.requiredFoodType || !data.quantityNeeded || !data.location || !data.contactNumber) {
    return "All request fields are required";
  }

  if (data.quantityNeeded <= 0) {
    return "Quantity needed must be greater than 0";
  }

  if (data.contactNumber.length !== 10) {
    return "Contact number must be 10 digits";
  }

  return null;
}

module.exports = {
  validateDonation,
  validateRequest
};