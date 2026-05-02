import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KPI from "../components/KPI";
import Chart from "../components/Chart";
import DataTable from "../components/DataTable";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

type Venta = {
  id: number;
  mes: string;
  ventas: number;
};

const MESES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "Mayo",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState<null | {
    message: string;
    type: "success" | "error" | "info";
  }>(null);

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("tab") || "ventas"
  );

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const isDark = theme === "dark";

  const colors = {
    bg: isDark
      ? "radial-gradient(circle at top left, #243b55, #141e30 35%, #050505 100%)"
      : "linear-gradient(135deg, #f8fafc, #e2e8f0)",
    text: isDark ? "#ffffff" : "#0f172a",
    tabInactive: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb",
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const cambiarTab = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("tab", tab);
  };

  const toggleTheme = () => {
    const nuevo = theme === "dark" ? "light" : "dark";
    setTheme(nuevo);
    localStorage.setItem("theme", nuevo);
  };

  useEffect(() => {
    const guardado = localStorage.getItem("ventas");

    if (guardado) {
      setData(JSON.parse(guardado));
      setLoading(false);
      return;
    }

    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4lEAHNTziOSum50eigHDH-M7RcjYuWf7--0ML0UJoIe2TKt7-DUMwRcQno8jCaC9ycyG8qPiW2vvm/pub?output=csv"
    )
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);

        const ventas = rows
          .filter((row) => row.trim() !== "")
          .map((row, index) => {
            const [mes, ventas] = row.split(",");

            return {
              id: index + 1,
              mes: mes.trim(),
              ventas: Number(ventas),
            };
          });

        setData(ventas);
        localStorage.setItem("ventas", JSON.stringify(ventas));
        setLoading(false);
      })
      .catch(() => {
        showToast("Error cargando datos", "error");
        setLoading(false);
      });
  }, []);

  const guardar = (nuevos: Venta[]) => {
    setData(nuevos);
    localStorage.setItem("ventas", JSON.stringify(nuevos));
  };

  const total = data.reduce((acc, item) => acc + item.ventas, 0);
  const promedio = data.length > 0 ? Math.floor(total / data.length) : 0;

  const mejorMes =
    data.length > 0
      ? data.reduce((max, item) =>
          item.ventas > max.ventas ? item : max
        )
      : null;

  const peorMes =
    data.length > 0
      ? data.reduce((min, item) =>
          item.ventas < min.ventas ? item : min
        )
      : null;

  const handleLogout = () => {
    localStorage.removeItem("auth");
    showToast("Sesión cerrada", "info");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  const agregarMes = () => {
    if (data.length >= 12) {
      showToast("El año ya está completo", "error");
      return;
    }

    const nuevo: Venta = {
      id: Date.now(),
      mes: MESES[data.length],
      ventas: Math.floor(Math.random() * 800),
    };

    guardar([...data, nuevo]);
    showToast("Mes agregado correctamente", "success");
  };

  const eliminarUltimo = () => {
    if (data.length === 0) {
      showToast("No hay meses para eliminar", "error");
      return;
    }

    guardar(data.slice(0, -1));
    showToast("Último mes eliminado", "info");
  };

  const limpiarTodo = () => {
    if (data.length === 0) {
      showToast("No hay datos para limpiar", "error");
      return;
    }

    guardar([]);
    showToast("Todos los datos fueron eliminados", "error");
  };

  const actualizarVenta = (id: number, ventas: number) => {
    const nuevos = data.map((item) =>
      item.id === id ? { ...item, ventas } : item
    );

    guardar(nuevos);
    showToast("Venta actualizada", "success");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.bg,
          color: colors.text,
          fontFamily: "Arial",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid rgba(255,255,255,0.2)",
              borderTop: "4px solid #8b5cf6",
              borderRadius: "50%",
              margin: "0 auto",
              animation: "spin 1s linear infinite",
            }}
          />

          <p style={{ marginTop: "15px" }}>Cargando datos...</p>

          <style>
            {`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial",
        color: colors.text,
        background: colors.bg,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* HEADER SIEMPRE VISIBLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "32px" }}>
            Panel de ventas
          </h1>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: isDark
                ? "1px solid rgba(255,255,255,0.25)"
                : "1px solid #cbd5e1",
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "#ffffff",
              color: colors.text,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            Cerrar sesión
          </button>
        </div>

        {/* TABS SIEMPRE VISIBLES */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "ventas", label: "Ventas" },
            { id: "analisis", label: "Análisis" },
            { id: "config", label: "Configuración" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => cambiarTab(tab.id)}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                background:
                  activeTab === tab.id ? "#8b5cf6" : colors.tabInactive,
                color: activeTab === tab.id ? "#fff" : colors.text,
                transition: "all 0.2s ease",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB VENTAS */}
        {activeTab === "ventas" && (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              <KPI title="Ventas" value={total} theme={theme} />
              <KPI title="Meses" value={data.length} theme={theme} />
              <KPI title="Promedio" value={promedio} theme={theme} />
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={agregarMes}
                disabled={data.length >= 12}
                style={{
                  padding: "10px 15px",
                  borderRadius: "10px",
                  border: "none",
                  background: data.length >= 12 ? "#555" : "#8b5cf6",
                  color: "#fff",
                  cursor:
                    data.length >= 12 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {data.length >= 12 ? "Año completo" : "Agregar mes"}
              </button>

              <button
                onClick={eliminarUltimo}
                disabled={data.length === 0}
                style={{
                  padding: "10px 15px",
                  borderRadius: "10px",
                  border: "none",
                  background: data.length === 0 ? "#555" : "#ef4444",
                  color: "#fff",
                  cursor: data.length === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Eliminar último
              </button>

              <button
                onClick={limpiarTodo}
                disabled={data.length === 0}
                style={{
                  padding: "10px 15px",
                  borderRadius: "10px",
                  border: "none",
                  background: data.length === 0 ? "#555" : "#f97316",
                  color: "#fff",
                  cursor: data.length === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Limpiar todo
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth < 768 ? "1fr" : "1.4fr 0.6fr",
                gap: "14px",
                alignItems: "start",
              }}
            >
              <div>
                <h3 style={{ textAlign: "center" }}>
                  Gráfico de ventas
                </h3>

                <Chart data={data} theme={theme} />
              </div>

              <div>
                <h3 style={{ textAlign: "center" }}>
                  Detalle de ventas
                </h3>

                <DataTable
                  data={data}
                  onUpdateVenta={actualizarVenta}
                  theme={theme}
                />
              </div>
            </div>
          </>
        )}

        {/* TAB ANALISIS */}
        {activeTab === "analisis" && (
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "#ffffff",
              border: isDark
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid #e5e7eb",
            }}
          >
            <h2>Análisis</h2>
            <p>Total anual: {total}</p>
            <p>Promedio mensual: {promedio}</p>
            <p>Mejor mes: {mejorMes ? mejorMes.mes : "Sin datos"}</p>
            <p>Peor mes: {peorMes ? peorMes.mes : "Sin datos"}</p>
          </div>
        )}

        {/* TAB CONFIG */}
        {activeTab === "config" && (
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "#ffffff",
              border: isDark
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid #e5e7eb",
            }}
          >
            <h2>Configuración</h2>

            <p>Modo actual: {theme}</p>

            <button
              onClick={toggleTheme}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: "none",
                background: "#8b5cf6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Cambiar a {theme === "dark" ? "Claro" : "Oscuro"}
            </button>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}