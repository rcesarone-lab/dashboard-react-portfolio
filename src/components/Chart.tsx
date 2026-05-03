import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data?: {
    id?: number;
    mes: string;
    ventas: number;
  }[];
  theme: string;
};

export default function Chart({ data = [], theme }: Props) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        width: "100%",
        height: "360px",
        minHeight: "360px",
        padding: "14px",
        borderRadius: "16px",
        background: isDark ? "rgba(255,255,255,0.08)" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid #e5e7eb",
        backdropFilter: "blur(12px)",
        boxSizing: "border-box",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid stroke={isDark ? "rgba(255,255,255,0.12)" : "#e2e8f0"} />

          <XAxis dataKey="mes" stroke={isDark ? "#d1d5db" : "#334155"} />

          <YAxis stroke={isDark ? "#d1d5db" : "#334155"} />

          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: isDark ? "none" : "1px solid #e5e7eb",
              borderRadius: "8px",
              color: isDark ? "#fff" : "#0f172a",
            }}
          />

          <Bar dataKey="ventas" fill="#38bdf8" barSize={42} radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}