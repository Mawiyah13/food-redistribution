import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMatchNotifications } from "../services/api";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (!user) return;
    const check = async () => {
      try {
        const res = await getMatchNotifications();
        setHasNew(res.data.hasNew);
      } catch {}
    };
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleMatchClick = () => setHasNew(false);

  const navCls = ({ isActive }) =>
    `hover:underline ${isActive ? "underline font-bold" : ""}`;

  return (
    <nav className="bg-green-700 text-white px-6 py-3 flex items-center gap-6 text-sm font-medium shadow">
      <span className="text-lg font-bold mr-4">🥗 FoodShare</span>
      {user && (
        <>
          <NavLink to="/" className={navCls}>Dashboard</NavLink>
          {user.role === "donor" && (
            <NavLink to="/add-donation" className={navCls}>Add Donation</NavLink>
          )}
          {user.role === "ngo" && (
            <NavLink to="/add-request" className={navCls}>Add Request</NavLink>
          )}
          <NavLink to="/matches" className={(p) => `relative ${navCls(p)}`} onClick={handleMatchClick}>
            Matches
            {hasNew && (
              <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </NavLink>
        </>
      )}
      <div className="ml-auto flex items-center gap-4">
        {user ? (
          <>
            <span className="text-green-200 text-xs">
              {user.name} ({user.role})
            </span>
            <button
              onClick={() => { logoutUser(); navigate("/login"); }}
              className="bg-white text-green-700 px-3 py-1 rounded text-xs font-semibold hover:bg-green-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navCls}>Login</NavLink>
            <NavLink to="/register" className={navCls}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}