import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login onLogin={() => setIsAuth(true)} />}
      />
    </Routes>
  );
}
