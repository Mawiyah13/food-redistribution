import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddDonation from "./pages/AddDonation";
import AddRequest from "./pages/AddRequest";
import MatchPage from "./pages/MatchPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-green-600 text-white px-6 py-3 flex gap-6 text-sm font-medium">
        <span className="text-lg font-bold mr-4">🥗 FoodShare</span>
        <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Dashboard</NavLink>
        <NavLink to="/add-donation" className={({ isActive }) => isActive ? "underline" : ""}>Add Donation</NavLink>
        <NavLink to="/add-request" className={({ isActive }) => isActive ? "underline" : ""}>Add Request</NavLink>
        <NavLink to="/matches" className={({ isActive }) => isActive ? "underline" : ""}>Matches</NavLink>
      </nav>
      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-donation" element={<AddDonation />} />
          <Route path="/add-request" element={<AddRequest />} />
          <Route path="/matches" element={<MatchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}