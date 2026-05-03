import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getSession } from "./services/authService";

function App() {
  const [isAuth, setIsAuth] = useState(!!getSession());

  useEffect(() => {
    setIsAuth(!!getSession());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;