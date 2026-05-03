import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "../components/Tabs";
import AnalysisTab from "../components/tabs/AnalysisTab";
import SalesTab from "../components/tabs/SalesTab";
import SettingsTab from "../components/tabs/SettingsTab";
import Toast from "../components/Toast";
import { useSalesData } from "../hooks/useSalesData";
import { useTabs } from "../hooks/useTabs";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../hooks/useToast";
import { getSession, logout } from "../services/authService";

export default function Dashboard() {
  const navigate = useNavigate();

  const { toast, showToast, closeToast } = useToast();
  const { activeTab, changeTab } = useTabs();

  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    text: isDark ? "#ffffff" : "#0f172a",
  };

  const {
    data,
    loading,
    metrics,
    addMonth,
    removeLastMonth,
    clearAll,
    updateSale,
  } = useSalesData();

  const session = getSession();

  const handleLogout = () => {
    logout();
    showToast("Sesión cerrada", "info");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  if (loading) {
    return (
      <LoadingScreen
        theme={theme}
        background={colors.bg}
        color={colors.text}
      />
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
            onClose={closeToast}
          />
        )}

        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "32px" }}>Panel de ventas</h1>

          <p style={{ marginTop: "6px", color: "rgba(255,255,255,0.65)" }}>
            Usuario: {session?.name}
          </p>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: isDark
                ? "1px solid rgba(255,255,255,0.25)"
                : "1px solid #cbd5e1",
              background: isDark ? "rgba(255,255,255,0.08)" : "#ffffff",
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
        </header>

        <Tabs activeTab={activeTab} onChangeTab={changeTab} theme={theme} />

        {activeTab === "ventas" && (
          <SalesTab
            data={data}
            total={metrics.total}
            average={metrics.average}
            theme={theme}
            onAddMonth={addMonth}
            onRemoveLastMonth={removeLastMonth}
            onClearAll={clearAll}
            onUpdateSale={updateSale}
          />
        )}

        {activeTab === "analisis" && (
          <AnalysisTab
            total={metrics.total}
            average={metrics.average}
            bestMonth={metrics.bestMonth}
            worstMonth={metrics.worstMonth}
            theme={theme}
          />
        )}

        {activeTab === "config" && (
          <SettingsTab theme={theme} onToggleTheme={toggleTheme} />
        )}

        <Footer />
      </div>
    </div>
  );
}