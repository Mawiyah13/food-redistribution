import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddDonation from "./pages/AddDonation";
import AddRequest from "./pages/AddRequest";
import MatchPage from "./pages/MatchPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-5xl mx-auto p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/add-donation" element={
              <ProtectedRoute role="donor"><AddDonation /></ProtectedRoute>
            } />
            <Route path="/add-request" element={
              <ProtectedRoute role="ngo"><AddRequest /></ProtectedRoute>
            } />
            <Route path="/matches" element={
              <ProtectedRoute><MatchPage /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}