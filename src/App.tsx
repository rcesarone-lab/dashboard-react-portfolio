import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
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
        element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={!isAuth ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;