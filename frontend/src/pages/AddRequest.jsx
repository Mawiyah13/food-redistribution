import { useState, useEffect } from "react";
import axios from "axios";

export default function AddRequest() {
  const organizationName = localStorage.getItem("userName");

  const [formData, setFormData] = useState({
    requiredFoodType: "Veg",
    quantityNeeded: "",
    location: "",
    contactNumber: "",
    targetGroup: "General Public",
    preferences: []
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const savedContact = localStorage.getItem("ngoContact");
    const savedLocation = localStorage.getItem("ngoLocation");

    setFormData((prev) => ({
      ...prev,
      contactNumber: savedContact || "",
      location: savedLocation || ""
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePreferenceChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(value)
        ? prev.preferences.filter((p) => p !== value)
        : [...prev.preferences, value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:5000/api/requests", {
        organizationName,
        requiredFoodType: formData.requiredFoodType,
        quantityNeeded: Number(formData.quantityNeeded),
        location: formData.location,
        contactNumber: formData.contactNumber
      });

      localStorage.setItem("ngoContact", formData.contactNumber);
      localStorage.setItem("ngoLocation", formData.location);

      setSuccessMessage("✅ Request submitted successfully!");

      setFormData((prev) => ({
        ...prev,
        quantityNeeded: "",
        targetGroup: "General Public",
        preferences: []
      }));

    } catch (error) {
      console.error(error);
      setSuccessMessage("❌ Error submitting request.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          📦 Request Food
        </h2>

        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={organizationName || ""}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Required Food Type
            </label>
            <select
              name="requiredFoodType"
              value={formData.requiredFoodType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Quantity Needed
            </label>
            <input
              type="number"
              name="quantityNeeded"
              value={formData.quantityNeeded}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
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
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Target Beneficiary Group
            </label>
            <div className="space-y-1 text-sm">
              {[
                "Children",
                "Elderly",
                "General Public",
                "Disaster Affected Families",
                "Shelter Residents"
              ].map((group) => (
                <label key={group} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="targetGroup"
                    value={group}
                    checked={formData.targetGroup === group}
                    onChange={handleChange}
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Food Preferences
            </label>
            <div className="space-y-1 text-sm">
              {[
                "Less Spicy",
                "High Protein",
                "Soft / Easy to Chew",
                "Ready-to-Eat",
                "Freshly Cooked Only"
              ].map((pref) => (
                <label key={pref} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={pref}
                    checked={formData.preferences.includes(pref)}
                    onChange={handlePreferenceChange}
                  />
                  {pref}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}