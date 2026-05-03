type Sale = {
  id: number;
  mes: string;
  ventas: number;
};

type Props = {
  total: number;
  average: number;
  bestMonth: Sale | null;
  worstMonth: Sale | null;
  theme: string;
};

export default function AnalysisTab({
  total,
  average,
  bestMonth,
  worstMonth,
  theme,
}: Props) {
  const isDark = theme === "dark";

  return (
    <section
      style={{
        marginTop: "30px",
        padding: "28px",
        borderRadius: "18px",
        background: isDark
          ? "rgba(255,255,255,0.08)"
          : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid #e5e7eb",
        color: isDark ? "#ffffff" : "#0f172a",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Análisis de ventas</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <MetricCard title="Ventas totales" value={total} theme={theme} />
        <MetricCard title="Promedio" value={average} theme={theme} />
        <MetricCard
          title="Mejor mes"
          value={bestMonth ? `${bestMonth.mes} - ${bestMonth.ventas}` : "N/A"}
          theme={theme}
        />
        <MetricCard
          title="Peor mes"
          value={worstMonth ? `${worstMonth.mes} - ${worstMonth.ventas}` : "N/A"}
          theme={theme}
        />
      </div>
    </section>
  );
}

function MetricCard({
  title,
  value,
  theme,
}: {
  title: string;
  value: string | number;
  theme: string;
}) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: "18px",
        borderRadius: "16px",
        background: isDark
          ? "rgba(255,255,255,0.08)"
          : "#f8fafc",
        border: isDark
          ? "1px solid rgba(255,255,255,0.14)"
          : "1px solid #e5e7eb",
      }}
    >
      <p
        style={{
          margin: 0,
          color: isDark ? "rgba(255,255,255,0.7)" : "#64748b",
        }}
      >
        {title}
      </p>

      <strong
        style={{
          display: "block",
          marginTop: "10px",
          fontSize: "22px",
        }}
      >
        {value}
      </strong>
    </div>
  );
}