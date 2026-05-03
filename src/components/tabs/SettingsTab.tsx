type Props = {
  theme: string;
  onToggleTheme: () => void;
};

export default function SettingsTab({ theme, onToggleTheme }: Props) {
  const isDark = theme === "dark";

  const cardStyle = {
    padding: "24px",
    borderRadius: "18px",
    background: isDark ? "rgba(255,255,255,0.08)" : "#ffffff",
    border: isDark
      ? "1px solid rgba(255,255,255,0.18)"
      : "1px solid #e5e7eb",
    color: isDark ? "#ffffff" : "#0f172a",
  };

  const buttonStyle = {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#8b5cf6",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  };

  return (
    <section style={{ marginTop: "28px" }}>
      <div style={cardStyle}>
        <h2 style={{ marginTop: 0 }}>Configuración</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Apariencia</h3>
            <p>Modo actual: {theme}</p>

            <button type="button" onClick={onToggleTheme} style={buttonStyle}>
              Cambiar a {isDark ? "Claro" : "Oscuro"}
            </button>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Perfil</h3>
            <p><strong>Nombre:</strong> Cesar Ramirez</p>

            <p>
              <strong>Rol:</strong> Desarrollador Fullstack COBOL / CICS / DB2 <br />
              En transición hacia Frontend Developer (React)
            </p>

            <p>
              Experiencia en modernización de sistemas legacy, integración con APIs
              y desarrollo de interfaces modernas con React y TypeScript.
            </p>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Redes profesionales</h3>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="https://www.linkedin.com/in/cesar-ramirez-especialistacobolcics"
                target="_blank"
                rel="noreferrer"
                style={buttonStyle}
              >
                LinkedIn
              </a>

              <a
                href="https://github.com/rcesarone-lab"
                target="_blank"
                rel="noreferrer"
                style={{
                  ...buttonStyle,
                  background: isDark ? "#334155" : "#475569",
                }}
              >
                GitHub
              </a>

              <a
                href="mailto:rcesarone@gmail.com"
                style={{
                  ...buttonStyle,
                  background: isDark ? "#334155" : "#475569",
                }}
              >
                Contacto
              </a>
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Estado del proyecto</h3>

            <ul>
              <li>Deploy activo en Vercel</li>
              <li>Autenticación local con sesiones</li>
              <li>Persistencia por usuario (localStorage)</li>
              <li>Dashboard modular con React + TypeScript</li>
              <li>Visualización de datos con Recharts</li>
              <li>Base lista para integración backend</li>
            </ul>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Stack técnico</h3>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["React", "TypeScript", "Vite", "Recharts", "LocalStorage"].map(
                (tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "999px",
                      background: isDark
                        ? "rgba(139,92,246,0.18)"
                        : "#ede9fe",
                      color: isDark ? "#ddd6fe" : "#6d28d9",
                      fontWeight: 600,
                      fontSize: "13px",
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Próximas mejoras</h3>

            <ul>
              <li>Autenticación real (Firebase / Auth0)</li>
              <li>Persistencia en backend (Node + DB)</li>
              <li>Multiusuario con datos independientes</li>
              <li>Edición avanzada de ventas (CRUD completo)</li>
              <li>Dashboard con gráficos múltiples</li>
              <li>Exportación avanzada (PDF / Excel)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}