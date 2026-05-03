import { Routes, Route, Navigate } from "react-router-dom";
import { getSession } from "./services/authService";
import { useState, useEffect } from "react";

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