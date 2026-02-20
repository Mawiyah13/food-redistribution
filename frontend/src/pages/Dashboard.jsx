import { useEffect, useState } from "react";
import { getDonations, getRequests, getMatches } from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ donations: 0, requests: 0, matches: 0 });
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDonations(), getRequests(), getMatches()])
      .then(([d, r, m]) => {
        setDonations(d.data);
        setRequests(r.data);
        setStats({ donations: d.data.length, requests: r.data.length, matches: m.data.length });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-700">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Donations", value: stats.donations, color: "bg-green-100 text-green-800" },
          { label: "Total Requests", value: stats.requests, color: "bg-blue-100 text-blue-800" },
          { label: "Matched Pairs", value: stats.matches, color: "bg-yellow-100 text-yellow-800" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl p-5 text-center font-semibold ${s.color}`}>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-lg mb-2 text-green-700">Recent Donations</h2>
          {donations.length === 0 && <p className="text-gray-500 text-sm">No donations yet.</p>}
          {donations.slice(0, 5).map((d) => (
            <div key={d._id} className="bg-white rounded-lg p-3 mb-2 shadow-sm border">
              <p className="font-medium">{d.donorName}</p>
              <p className="text-sm text-gray-600">{d.foodType} · {d.quantity} units · {d.location}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${d.status === "available" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{d.status}</span>
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2 text-blue-700">Recent Requests</h2>
          {requests.length === 0 && <p className="text-gray-500 text-sm">No requests yet.</p>}
          {requests.slice(0, 5).map((r) => (
            <div key={r._id} className="bg-white rounded-lg p-3 mb-2 shadow-sm border">
              <p className="font-medium">{r.organizationName}</p>
              <p className="text-sm text-gray-600">{r.requiredFoodType} · {r.quantityNeeded} units · {r.location}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"}`}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}