function matchDonationsWithRequests(donations, requests) {
  const matches = [];
  const now = new Date().getTime(); 
  const usedDonations = new Set();

  for (const request of requests) {
    for (const donation of donations) {

      const donationId = donation._id.toString();

      const notUsed = !usedDonations.has(donationId);
      const isAvailable = donation.status === "available";
      const notExpired =
        new Date(donation.expiryTime).getTime() > now;

      const sameLocation =
        donation.location &&
        request.location &&
        donation.location.toLowerCase() ===
          request.location.toLowerCase();

      const sameFoodType =
        donation.foodType &&
        request.requiredFoodType &&
        donation.foodType.toLowerCase() ===
          request.requiredFoodType.toLowerCase();

      const enoughQuantity =
        donation.quantity >= request.quantityNeeded;

      if (
        notUsed &&
        isAvailable &&
        notExpired &&
        sameLocation &&
        sameFoodType &&
        enoughQuantity
      ) {
        matches.push({
          donationId: donation._id,
          requestId: request._id
        });

        usedDonations.add(donationId);
        break; // move to next request
      }
    }
  }

  return matches;
}

module.exports = {
  matchDonationsWithRequests
};