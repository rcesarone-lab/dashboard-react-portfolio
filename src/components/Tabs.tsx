import type { TabKey } from "../hooks/useTabs";

type Props = {
  activeTab: TabKey;
  onChangeTab: (tab: TabKey) => void;
  theme: string;
};

export default function Tabs({ activeTab, onChangeTab, theme }: Props) {
  const isDark = theme === "dark";

  const tabs: { key: TabKey; label: string }[] = [
    { key: "ventas", label: "Ventas" },
    { key: "analisis", label: "Análisis" },
    { key: "config", label: "Configuración" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        margin: "18px 0 24px",
        flexWrap: "wrap",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChangeTab(tab.key)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              border: isActive
                ? "1px solid #8b5cf6"
                : isDark
                ? "1px solid rgba(255,255,255,0.18)"
                : "1px solid #e5e7eb",
              background: isActive
                ? "#8b5cf6"
                : isDark
                ? "rgba(255,255,255,0.08)"
                : "#ffffff",
              color: isActive ? "#ffffff" : isDark ? "#e5e7eb" : "#0f172a",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}