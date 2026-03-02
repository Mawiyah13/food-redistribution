import { useEffect, useState } from "react";
import { getDashboard, getMyDonations, getMyRequests } from "../services/api";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import SearchFilter from "../components/SearchFilter";

const StatCard = ({ label, value, color }) => (
  <div className={`rounded-xl p-5 text-center ${color}`}>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm mt-1 font-medium">{label}</div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getDashboard().then((res) => setStats(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const fn = user.role === "donor" ? getMyDonations : getMyRequests;
    fn(filters)
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        {user.role === "donor" ? "Donor Dashboard" : "NGO Dashboard"}
      </h1>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {user.role === "donor" ? (
            <>
              <StatCard label="Total Donations" value={stats.totalDonations} color="bg-green-100 text-green-800" />
              <StatCard label="Active" value={stats.activeDonations} color="bg-blue-100 text-blue-800" />
              <StatCard label="Completed" value={stats.completedDonations} color="bg-purple-100 text-purple-800" />
              <StatCard label="Failed" value={stats.failedDonations} color="bg-red-100 text-red-800" />
              <StatCard label="Pending Matches" value={stats.pendingMatches} color="bg-yellow-100 text-yellow-800" />
              <StatCard label="Completed Matches" value={stats.completedMatches} color="bg-green-100 text-green-800" />
              <StatCard label="Cancelled Matches" value={stats.cancelledMatches} color="bg-gray-100 text-gray-700" />
            </>
          ) : (
            <>
              <StatCard label="Total Requests" value={stats.totalRequests} color="bg-blue-100 text-blue-800" />
              <StatCard label="Pending" value={stats.pendingRequests} color="bg-yellow-100 text-yellow-800" />
              <StatCard label="Fulfilled" value={stats.fulfilledRequests} color="bg-green-100 text-green-800" />
              <StatCard label="Failed" value={stats.failedRequests} color="bg-red-100 text-red-800" />
              <StatCard label="Pending Matches" value={stats.pendingMatches} color="bg-yellow-100 text-yellow-800" />
              <StatCard label="Completed Matches" value={stats.completedMatches} color="bg-green-100 text-green-800" />
            </>
          )}
        </div>
      )}

      <SearchFilter filters={filters} onChange={setFilters} />

      <h2 className="font-semibold text-lg mb-3 text-gray-700">
        {user.role === "donor" ? "My Donations" : "My Requests"}
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 text-sm">No records found.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-xl p-4 shadow-sm border flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">
                  {user.role === "donor" ? item.donorName : item.organizationName}
                </p>
                <p className="text-sm text-gray-600">
                  {user.role === "donor"
                    ? `${item.foodType} · ${item.remainingQuantity}/${item.quantity} remaining · ${item.location}`
                    : `${item.requiredFoodType} · ${item.quantityNeeded} units · ${item.location}`}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {user.role === "donor"
                    ? `Expires: ${new Date(item.expiryTime).toLocaleString()}`
                    : `Required by: ${new Date(item.requiredBy).toLocaleString()}`}
                </p>
                <p className="text-xs text-gray-400">
                  Added: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}