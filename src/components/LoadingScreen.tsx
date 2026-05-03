import type { Sale, Theme } from "../../types/sales";

type Props = {
  total: number;
  average: number;
  bestMonth: Sale | null;
  worstMonth: Sale | null;
  theme: Theme;
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
    <div
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: isDark ? "rgba(255,255,255,0.08)" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid #e5e7eb",
      }}
    >
      <h2>Análisis</h2>
      <p>Total anual: {total}</p>
      <p>Promedio mensual: {average}</p>
      <p>Mejor mes: {bestMonth ? bestMonth.mes : "Sin datos"}</p>
      <p>Peor mes: {worstMonth ? worstMonth.mes : "Sin datos"}</p>
    </div>
  );
}
