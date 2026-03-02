export default function StatusBadge({ status }) {
  const map = {
    available: { label: "Available", cls: "bg-green-100 text-green-700" },
    pending: { label: "⏳ Pending", cls: "bg-yellow-100 text-yellow-700" },
    completed: { label: "✔ Completed", cls: "bg-green-100 text-green-800" },
    fulfilled: { label: "✔ Fulfilled", cls: "bg-blue-100 text-blue-700" },
    failed: { label: "✖ Failed", cls: "bg-red-100 text-red-700" },
    cancelled: { label: "✖ Cancelled", cls: "bg-gray-100 text-gray-600" },
  };
  const s = map[status] || { label: status, cls: "bg-gray-100 text-gray-600" };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>
      {s.label}
    </span>
  );
}