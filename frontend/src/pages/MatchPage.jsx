import { useEffect, useState } from "react";
import { getMatches } from "../services/api";

export default function MatchPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches().then((res) => setMatches(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading matches...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-yellow-700">Matched Pairs</h1>
      {matches.length === 0 ? (
        <p className="text-gray-500">No matches found. Ensure donations and requests share the same location and food type.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((m, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-400">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">Donation</p>
                  <p className="font-semibold text-green-700">{m.donation.donorName}</p>
                  <p className="text-sm text-gray-600">{m.donation.foodType} · {m.donation.quantity} units</p>
                  <p className="text-sm text-gray-600">📍 {m.donation.location}</p>
                  <p className="text-sm text-gray-600">📞 {m.donation.contactNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">Request</p>
                  <p className="font-semibold text-blue-700">{m.request.organizationName}</p>
                  <p className="text-sm text-gray-600">{m.request.requiredFoodType} · {m.request.quantityNeeded} units needed</p>
                  <p className="text-sm text-gray-600">📍 {m.request.location}</p>
                  <p className="text-sm text-gray-600">📞 {m.request.contactNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
