export default function SearchFilter({ filters, onChange }) {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm border">
      <input
        name="location"
        value={filters.location || ""}
        onChange={handle}
        placeholder="Search by location..."
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 flex-1 min-w-[160px]"
      />
      <input
        name="foodType"
        value={filters.foodType || ""}
        onChange={handle}
        placeholder="Search by food type..."
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 flex-1 min-w-[160px]"
      />
      <select
        name="status"
        value={filters.status || ""}
        onChange={handle}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">All Statuses</option>
        <option value="available">Available</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="fulfilled">Fulfilled</option>
        <option value="failed">Failed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );
}