function matchDonationsWithRequests(donations, requests) {
  const matches = [];

  donations.forEach(donation => {
    requests.forEach(request => {
      if (
        donation.location === request.location &&
        donation.foodType === request.requiredFoodType &&
        donation.quantity >= request.quantityNeeded
      ) {
        matches.push({
          donationId: donation._id,
          requestId: request._id
        });
      }
    });
  });

  return matches;
}

module.exports = {
  matchDonationsWithRequests
};