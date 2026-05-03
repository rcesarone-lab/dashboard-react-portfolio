import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("rcesarone@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loggedUser = login(email, password);

    if (!loggedUser) {
      setError("Credenciales inválidas");
      return;
    }

    setError("");
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "32px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Iniciar sesión</h1>

        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          Acceso al dashboard de ventas
        </p>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginTop: "8px",
            marginBottom: "16px",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#ffffff",
            boxSizing: "border-box",
          }}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginTop: "8px",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#ffffff",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#f87171", marginTop: "14px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "22px",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            background: "#8b5cf6",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "#ffffff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Crear cuenta
        </button>

        <p
          style={{
            marginTop: "18px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Demo: rcesarone@gmail.com / 123456
        </p>
      </form>
    </div>
  );
}