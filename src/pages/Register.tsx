import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const user = registerUser({
      name,
      email,
      password,
    });

    if (!user) {
      setError("Ya existe un usuario con ese email");
      return;
    }

    setError("");
    navigate("/");
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
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Crear cuenta</h1>

        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          Regístrate para usar el dashboard
        </p>

        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {error && (
          <p style={{ color: "#f87171", marginTop: "14px" }}>
            {error}
          </p>
        )}

        <button type="submit" style={buttonStyle}>
          Crear cuenta
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            ...buttonStyle,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            marginTop: "12px",
          }}
        >
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "8px",
  marginBottom: "16px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#ffffff",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: "22px",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#8b5cf6",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};