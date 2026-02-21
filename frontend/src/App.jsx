import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

import AddDonation from "./pages/AddDonation";
import AddRequest from "./pages/AddRequest";
import MatchPage from "./pages/MatchPage";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";


function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const name = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!role) return null;

  return (
    <nav className="bg-green-600 text-white px-6 py-3 flex gap-6 text-sm font-medium items-center">
      <span className="text-lg font-bold mr-4">🥗 FoodShare</span>

      {role === "donor" && (
        <NavLink
          to="/donor-dashboard"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          My Dashboard
        </NavLink>
      )}

      {role === "ngo" && (
        <NavLink
          to="/ngo-dashboard"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          My Dashboard
        </NavLink>
      )}

      {/* Add Actions */}
      {role === "donor" && (
        <NavLink
          to="/add-donation"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Add Donation
        </NavLink>
      )}

      {role === "ngo" && (
        <NavLink
          to="/add-request"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Add Request
        </NavLink>
      )}

      <NavLink
        to="/matches"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        Matches
      </NavLink>

      <div className="ml-auto flex items-center gap-4">
        <span>👤 {name}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}


function ProtectedRoute({ children }) {
  const role = localStorage.getItem("userRole");
  if (!role) {
    return <Navigate to="/" />;
  }
  return children;
}


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/donor-dashboard"
            element={
              <ProtectedRoute>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ngo-dashboard"
            element={
              <ProtectedRoute>
                <NGODashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-donation"
            element={
              <ProtectedRoute>
                <AddDonation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-request"
            element={
              <ProtectedRoute>
                <AddRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <MatchPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}