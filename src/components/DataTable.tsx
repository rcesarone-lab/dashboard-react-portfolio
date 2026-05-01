type Props = {
    data: {
      mes: string;
      ventas: number;
    }[];
  };
  
  export default function DataTable({ data }: Props) {
    return (
      <div
        style={{
          marginTop: "28px",
          padding: "20px",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          color: "#fff",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Detalle de ventas</h2>
  
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "10px" }}>Mes</th>
              <th style={{ textAlign: "right", padding: "10px" }}>Ventas</th>
            </tr>
          </thead>
  
          <tbody>
            {data.map((item) => (
              <tr key={item.mes}>
                <td style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  {item.mes}
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  {item.ventas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }