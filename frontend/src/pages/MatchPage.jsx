import { useEffect, useState } from "react";
import { getMatches, createMatches, completeMatch, cancelMatch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

export default function MatchPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runMsg, setRunMsg] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMatches(statusFilter ? { status: statusFilter } : {});
      setMatches(res.data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleRun = async () => {
    try {
      const res = await createMatches();
      setRunMsg(res.data.message);
      load();
    } catch (err) {
      setRunMsg(err.response?.data?.error || "Error running match");
    }
  };

  const handleComplete = async (id) => {
    if (!window.confirm("Confirm donation received?")) return;
    try {
      await completeMatch(id);
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Error completing match");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this match?")) return;
    try {
      await cancelMatch(id);
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Error cancelling match");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-yellow-700">Matches</h1>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleRun}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition"
          >
            Run Matching
          </button>
        </div>
      </div>

      {runMsg && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded mb-4 text-sm">{runMsg}</div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p className="text-gray-500 text-sm">No matches found. Click "Run Matching" to find matches.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((m) => (
            <div key={m._id} className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-400">
              <div className="flex justify-between items-start mb-3">
                <StatusBadge status={m.status} />
                <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">Donation</p>
                  <p className="font-semibold text-green-700">{m.donation?.donorName}</p>
                  <p className="text-sm text-gray-600">{m.donation?.foodType} · {m.donation?.quantity} units</p>
                  <p className="text-sm text-gray-600">📍 {m.donation?.location}</p>
                  <p className="text-sm text-gray-600">📞 {m.donation?.contactNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">Request</p>
                  <p className="font-semibold text-blue-700">{m.request?.organizationName}</p>
                  <p className="text-sm text-gray-600">{m.request?.requiredFoodType} · {m.request?.quantityNeeded} needed</p>
                  <p className="text-sm text-gray-600">📍 {m.request?.location}</p>
                  <p className="text-sm text-gray-600">📞 {m.request?.contactNumber}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Matched Quantity: <span className="text-green-700">{m.matchedQuantity} units</span>
              </p>
              {m.status === "pending" && user.role === "ngo" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleComplete(m._id)}
                    className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700"
                  >
                    ✔ Confirm Received
                  </button>
                  <button
                    onClick={() => handleCancel(m._id)}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600"
                  >
                    ✖ Cancel Match
                  </button>
                </div>
              )}
              {m.status === "pending" && user.role === "donor" && (
                <button
                  onClick={() => handleCancel(m._id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-red-600"
                >
                  ✖ Cancel Match
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}