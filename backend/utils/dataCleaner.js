function normalizeFoodType(type) {
  const value = type.toLowerCase().trim();

  if (value.includes("non")) {
    return "Non-Veg";
  }

  if (value.includes("veg")) {
    return "Veg";
  }

  return "Veg";
}

function normalizeLocation(location) {
  return location
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());
}
function convertExpiryToDate(expiryString) {
  const hours = parseInt(expiryString);
  if (isNaN(hours)) return new Date();

  const now = new Date();
  now.setHours(now.getHours() + hours);
  return now;
}
function normalizeQuantity(quantity) {
  return Number(quantity);
}
function cleanDonation(donation) {
  return {
    donorName: donation.donorName.trim(),
    foodType: normalizeFoodType(donation.foodType),
    quantity: normalizeQuantity(donation.quantity),
    location: normalizeLocation(donation.location),
    expiryTime: convertExpiryToDate(donation.expiryTime),
    contactNumber: donation.contactNumber.trim(),
    status: "available",
    createdAt: new Date()
  };
}

function cleanRequest(request) {
  return {
    organizationName: request.organizationName.trim(),
    requiredFoodType: normalizeFoodType(request.requiredFoodType),
    quantityNeeded: normalizeQuantity(request.quantityNeeded),
    location: normalizeLocation(request.location),
    contactNumber: request.contactNumber.trim(),
    status: "pending",
    createdAt: new Date()
  };
}

module.exports = {
  cleanDonation,
  cleanRequest
};