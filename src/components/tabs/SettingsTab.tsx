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

            <p>
              <strong>Nombre:</strong> Cesar Ramirez
            </p>

            <p>
              <strong>Perfil:</strong> Consultor de Sistemas con experiencia en COBOL,
              CICS, DB2 y modernización de aplicaciones legacy.
            </p>

            <p>
              Actualmente fortaleciendo habilidades frontend con React, TypeScript y
              arquitectura moderna para evolucionar hacia un perfil fullstack.
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

            <ul style={{ paddingLeft: "18px", lineHeight: 1.8 }}>
              <li>Deploy activo en Vercel</li>
              <li>Login y registro básico implementados</li>
              <li>Sesión persistente con localStorage</li>
              <li>Ventas editables desde tabla</li>
              <li>Gráfico dinámico con Recharts</li>
              <li>Exportación de datos en JSON y CSV</li>
              <li>Tema oscuro/claro disponible</li>
              <li>Estructura modular con componentes, hooks y servicios</li>
              <li>Base preparada para integración con backend real</li>
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

            <ul style={{ paddingLeft: "18px", lineHeight: 1.8 }}>
              <li>Persistencia real en backend con base de datos</li>
              <li>Autenticación productiva con Firebase/Auth0</li>
              <li>Separación completa de datos por usuario</li>
              <li>Edición avanzada de ventas con CRUD completo</li>
              <li>Filtros por mes, trimestre y año</li>
              <li>Exportación avanzada a Excel y PDF</li>
              <li>Dashboard con más gráficos comparativos</li>
              <li>Panel administrativo para gestión de usuarios</li>
              <li>Mejoras responsive para mobile/tablet</li>
              <li>Migración gradual a arquitectura fullstack</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}