type Props = {
  data: {
    id: number;
    mes: string;
    ventas: number;
  }[];
  onUpdateVenta: (id: number, ventas: number) => void;
  theme: string;
};

export default function DataTable({ data, onUpdateVenta, theme }: Props) {
  const isDark = theme === "dark";

  return (
    <div
      style={{
        maxHeight: "280px",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "14px",
        borderRadius: "16px",
        background: isDark ? "rgba(255,255,255,0.08)" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid #e5e7eb",
        backdropFilter: "blur(12px)",
        scrollbarWidth: "thin",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: isDark ? "#fff" : "#0f172a",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "6px" }}>Mes</th>
            <th style={{ textAlign: "right", padding: "6px" }}>
              Ventas
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td
                style={{
                  padding: "6px",
                  borderTop: isDark
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid #e5e7eb",
                }}
              >
                {item.mes}
              </td>

              <td
                style={{
                  padding: "6px",
                  textAlign: "right",
                  borderTop: isDark
                    ? "1px solid rgba(255,255,255,0.12)"
                    : "1px solid #e5e7eb",
                }}
              >
                <input
                  type="number"
                  value={item.ventas}
                  onChange={(e) =>
                    onUpdateVenta(item.id, Number(e.target.value))
                  }
                  style={{
                    width: "80px",
                    padding: "6px",
                    borderRadius: "8px",
                    border: isDark
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid #cbd5e1",
                    textAlign: "right",
                    color: isDark ? "#fff" : "#0f172a",
                    background: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#f1f5f9",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.background = isDark
                      ? "#1f2937"
                      : "#e2e8f0";
                    e.target.style.border = "1px solid #8b5cf6";
                  }}
                  onBlur={(e) => {
                    e.target.style.background = isDark
                      ? "rgba(255,255,255,0.08)"
                      : "#f1f5f9";
                    e.target.style.border = isDark
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid #cbd5e1";
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}