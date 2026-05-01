type Props = {
  title: string;
  value: number;
};

export default function KPI({ title, value }: Props) {
  return (
    <div
      style={{
        width: "160px",
        padding: "18px",
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.10)",
        border: "1px solid rgba(255, 255, 255, 0.20)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(12px)",
        color: "#ffffff",
      }}
    >
      <p style={{ margin: 0, color: "rgba(255,255,255,0.75)" }}>{title}</p>
      <h2 style={{ margin: "12px 0 0 0", fontSize: "30px" }}>{value}</h2>
    </div>
  );
}
