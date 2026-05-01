import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      onLogin();
      navigate("/", { replace: true });
      return;
    }

    alert("Credenciales incorrectas");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top left, #243b55, #141e30 35%, #050505 100%)",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(12px)",
          width: "300px",
          color: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <button
          type="button"
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#8b5cf6",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Ingresar
        </button>
      </div>
      <Footer />
    </div>
  );
}
