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
    mes: string;
    ventas: number;
  }[];
};

export default function Chart({ data }: Props) {
  return (
    <div style={{ width: "100%", height: "320px", marginTop: "20px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.12)" />
          <XAxis dataKey="mes" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              color: "#ffffff",
            }}
          />
          <Bar dataKey="ventas" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}