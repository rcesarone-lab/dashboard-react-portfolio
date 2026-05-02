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
  data: {
    id?: number;
    mes: string;
    ventas: number;
  }[];
  theme: string;
};

export default function Chart({ data, theme }: Props) {
  return (
    <div
      style={{
        height: "280px",
        padding: "14px",
        borderRadius: "16px",
        background:
          theme === "dark"
            ? "rgba(255,255,255,0.08)"
            : "#ffffff",
        border:
          theme === "dark"
            ? "1px solid rgba(255,255,255,0.18)"
            : "1px solid #e5e7eb",
        backdropFilter: "blur(12px)",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            stroke={
              theme === "dark"
                ? "rgba(255,255,255,0.12)"
                : "#e2e8f0"
            }
          />

          <XAxis
            dataKey="mes"
            stroke={theme === "dark" ? "#d1d5db" : "#334155"}
          />

          <YAxis
            stroke={theme === "dark" ? "#d1d5db" : "#334155"}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border:
                theme === "dark"
                  ? "none"
                  : "1px solid #e5e7eb",
              borderRadius: "8px",
              color: theme === "dark" ? "#fff" : "#0f172a",
            }}
          />

          <Bar
            dataKey="ventas"
            fill="#8b5cf6"
            barSize={30}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}