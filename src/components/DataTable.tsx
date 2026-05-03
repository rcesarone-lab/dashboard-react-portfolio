type Props = {
  data: {
    mes: string;
    ventas: number;
  }[];
  onUpdate: (index: number, value: number) => void;
};

export default function DataTable({ data, onUpdate }: Props) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "10px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          marginBottom: "10px",
          fontWeight: 600,
          opacity: 0.8,
        }}
      >
        <span>Mes</span>
        <span>Ventas</span>
      </div>

      {/* FILAS */}
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span>{item.mes}</span>

          <input
            type="number"
            value={item.ventas}
            onChange={(e) =>
              onUpdate(index, Number(e.target.value))
            }
            style={{
              width: "90px",
              textAlign: "center",
              padding: "6px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
            }}
          />
        </div>
      ))}
    </div>
  );
}