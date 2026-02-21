import { useState, useEffect } from "react";
import { addDonation } from "../services/api";

export default function AddDonation() {
  const donorName = localStorage.getItem("userName");

  const [form, setForm] = useState({
    donorName: donorName || "",
    foodType: "Veg",
    quantity: "",
    location: "",
    expiryTime: "",
    contactNumber: "",
    categories: [],
    characteristics: []
  });

  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedContact = localStorage.getItem("donorContact");
    const savedLocation = localStorage.getItem("donorLocation");

    setForm((prev) => ({
      ...prev,
      contactNumber: savedContact || "",
      location: savedLocation || ""
    }));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckboxChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    setError(null);

    try {
      await addDonation({
        donorName,
        foodType: form.foodType,
        quantity: Number(form.quantity),
        location: form.location,
        expiryTime: form.expiryTime,
        contactNumber: form.contactNumber
      });
      localStorage.setItem("donorContact", form.contactNumber);
      localStorage.setItem("donorLocation", form.location);

      setMsg("✅ Donation submitted successfully!");

      setForm((prev) => ({
        ...prev,
        quantity: "",
        expiryTime: "",
        categories: [],
        characteristics: []
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        🥗 Add Donation
      </h1>

      {msg && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm">
          {msg}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Donor Name
          </label>
          <input
            type="text"
            value={donorName || ""}
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Food Type
          </label>
          <select
            name="foodType"
            value={form.foodType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
          >
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Quantity (units)
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Expiry Time
          </label>
          <input
            type="datetime-local"
            name="expiryTime"
            value={form.expiryTime}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={form.contactNumber}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Food Category
          </label>
          <div className="space-y-1 text-sm">
            {[
              "Freshly Cooked",
              "Packed Meals",
              "Bakery Items",
              "Groceries / Raw Ingredients",
              "Beverages"
            ].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.categories.includes(option)}
                  onChange={() =>
                    handleCheckboxChange("categories", option)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Food Characteristics
          </label>
          <div className="space-y-1 text-sm">
            {[
              "Less Spicy",
              "High Protein",
              "Suitable for Children",
              "Suitable for Elderly",
              "Ready-to-Eat"
            ].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.characteristics.includes(option)}
                  onChange={() =>
                    handleCheckboxChange("characteristics", option)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          {loading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
}