import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("donor");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ If already logged in, redirect automatically
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole === "donor") {
      navigate("/donor-dashboard");
    } else if (savedRole === "ngo") {
      navigate("/ngo-dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    setError("");

    localStorage.setItem("userName", name.trim());
    localStorage.setItem("userRole", role);

    if (role === "donor") {
      navigate("/donor-dashboard");
    } else {
      navigate("/ngo-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-6">
          🥗 FoodShare Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Enter Your Name
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Role
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="donor">Donor</option>
            <option value="ngo">NGO</option>
          </select>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Continue
        </button>
      </div>
    </div>
  );
}