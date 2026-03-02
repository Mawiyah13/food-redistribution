import { useState } from "react";
import { addDonation } from "../services/api";

const initial = {
  donorName: "", foodType: "", quantity: "", location: "", expiryTime: "", contactNumber: "",
};

export default function AddDonation() {
  const [form, setForm] = useState(initial);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMsg(null); setError(null);
    try {
      await addDonation({ ...form, quantity: Number(form.quantity) });
      setMsg("Donation submitted successfully!");
      setForm(initial);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Add Donation</h1>
      {msg && <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm">{msg}</div>}
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-4">
        {[
          { label: "Donor Name", name: "donorName", type: "text" },
          { label: "Food Type (e.g. Veg)", name: "foodType", type: "text" },
          { label: "Quantity (units)", name: "quantity", type: "number" },
          { label: "Location", name: "location", type: "text" },
          { label: "Expiry Time", name: "expiryTime", type: "datetime-local" },
          { label: "Contact Number", name: "contactNumber", type: "tel" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type} name={name} value={form[name]} onChange={handle} required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}
        <button type="submit" disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
}