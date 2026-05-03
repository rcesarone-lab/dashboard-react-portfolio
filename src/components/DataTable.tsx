type Sale = {
  id: number;
  mes: string;
  ventas: number;
};

type Props = {
  data?: Sale[];
  theme: string;
  onUpdateVenta: (id: number, ventas: number) => void;
};

export default function DataTable({
  data = [],
  theme,
  onUpdateVenta,
}: Props) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: isDark ? "rgba(255,255,255,0.06)" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 140px",
          gap: "16px",
          paddingBottom: "10px",
          borderBottom: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #e5e7eb",
          fontWeight: 700,
        }}
      >
        <span>Mes</span>
        <span style={{ textAlign: "right" }}>Ventas</span>
      </div>

      {data.map((item) => (
        <div
          key={item.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 140px",
            gap: "16px",
            alignItems: "center",
            padding: "12px 0",
            borderBottom: isDark
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid #e5e7eb",
          }}
        >
          <span>{item.mes}</span>

          <input
            type="number"
            value={item.ventas}
            onChange={(e) => onUpdateVenta(item.id, Number(e.target.value))}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "10px",
              border: isDark
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid #cbd5e1",
              background: isDark ? "rgba(255,255,255,0.08)" : "#f8fafc",
              color: isDark ? "#ffffff" : "#0f172a",
              textAlign: "right",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}
    </div>
  );
}