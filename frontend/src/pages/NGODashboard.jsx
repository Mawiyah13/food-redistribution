import { useEffect, useState } from "react";
import axios from "axios";

export default function NGODashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");

      const myRequests = res.data.filter(
        (r) => r.organizationName === userName
      );

      setRequests(myRequests);
    } catch (err) {
      console.error("Error fetching requests", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        👋 Welcome {userName} (NGO)
      </h2>

      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">My Requests</h3>

        {loading && (
          <p className="text-gray-500 text-sm">Loading requests...</p>
        )}

        {!loading && requests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-2">
              You haven’t made any requests yet.
            </p>
            <p className="text-sm text-gray-400">
              Click "Add Request" to get started.
            </p>
          </div>
        )}

        {!loading &&
          requests.map((r) => (
            <div
              key={r._id}
              className="border rounded-lg p-4 mb-4 bg-green-50"
            >
              <p className="font-medium">
                Food Type:{" "}
                <span className="text-gray-700">
                  {r.requiredFoodType}
                </span>
              </p>

              <p className="text-sm">
                Quantity Needed: {r.quantityNeeded}
              </p>

              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    r.status === "fulfilled"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {r.status}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}