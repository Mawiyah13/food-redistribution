import { useEffect, useState } from "react";
import axios from "axios";

export default function DonorDashboard() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donations");

      const myDonations = res.data.filter(
        (d) => d.donorName === userName
      );

      setDonations(myDonations);
    } catch (err) {
      console.error("Error fetching donations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        👋 Welcome {userName} (Donor)
      </h2>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">My Donations</h3>

        {loading && (
          <p className="text-gray-500 text-sm">Loading donations...</p>
        )}

        {!loading && donations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-2">
              You haven’t added any donations yet.
            </p>
            <p className="text-sm text-gray-400">
              Click "Add Donation" to get started.
            </p>
          </div>
        )}

        {!loading &&
          donations.map((d) => (
            <div
              key={d._id}
              className="border rounded-lg p-4 mb-4 bg-green-50"
            >
              <p className="font-medium">
                Food Type: <span className="text-gray-700">{d.foodType}</span>
              </p>
              <p className="text-sm">
                Quantity: {d.quantity}
              </p>
              <p className="text-sm">
                Remaining: {d.remainingQuantity}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    d.status === "completed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {d.status}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}