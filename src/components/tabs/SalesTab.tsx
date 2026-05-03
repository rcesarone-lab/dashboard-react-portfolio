import { useMemo, useState } from "react";
import Chart from "../Chart";
import DataTable from "../DataTable";
import KPI from "../KPI";

type Sale = {
  id: number;
  mes: string;
  ventas: number;
};

type Props = {
  data?: Sale[];
  total: number;
  average: number;
  theme: string;
  onAddMonth: () => void;
  onRemoveLastMonth: () => void;
  onClearAll: () => void;
  onUpdateSale: (id: number, ventas: number) => void;
};

export default function SalesTab({
  data = [],
  theme,
  onAddMonth,
  onRemoveLastMonth,
  onClearAll,
  onUpdateSale,
}: Props) {
  const isFullYear = data.length >= 12;
  const [visibleMonths, setVisibleMonths] = useState(12);

  const filteredData = useMemo(() => {
    return data.slice(0, visibleMonths);
  }, [data, visibleMonths]);

  const filteredTotal = filteredData.reduce(
    (acc, item) => acc + item.ventas,
    0
  );

  const filteredMonthsWithSales = filteredData.filter(
    (item) => item.ventas > 0
  );

  const filteredAverage =
    filteredMonthsWithSales.length > 0
      ? Math.round(filteredTotal / filteredMonthsWithSales.length)
      : 0;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ventas.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ["Mes", "Ventas"];

    const rows = data.map((item) => [item.mes, item.ventas]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ventas.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section style={{ marginTop: "28px" }}>
      <div
        style={{
          display: "flex",
          gap: "14px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <KPI title="Ventas totales" value={filteredTotal} theme={theme} />
        <KPI title="Meses visibles" value={filteredData.length} theme={theme} />
        <KPI title="Promedio" value={filteredAverage} theme={theme} />
      </div>


      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "28px",
        }}
      >

<div style={{ marginBottom: "22px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: 600,
          }}
        >
          Período visible
        </label>

        <select
          value={visibleMonths}
          onChange={(e) => setVisibleMonths(Number(e.target.value))}
          style={{
            padding: "10px 14px",
            borderRadius: "12px",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.25)"
                : "1px solid #cbd5e1",
            background: theme === "dark" ? "#1f2937" : "#ffffff",
            color: theme === "dark" ? "#ffffff" : "#0f172a",
            outline: "none",
          }}
        >
          <option value={3}>Primeros 3 meses</option>
          <option value={6}>Primeros 6 meses</option>
          <option value={9}>Primeros 9 meses</option>
          <option value={12}>Año completo</option>
        </select>
      </div>

        <button
          type="button"
          onClick={onAddMonth}
          disabled={isFullYear}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: isFullYear ? "#475569" : "#8b5cf6",
            color: "#fff",
            cursor: isFullYear ? "not-allowed" : "pointer",
          }}
        >
          {isFullYear ? "Año completo" : "Agregar mes"}
        </button>

        <button
          type="button"
          onClick={onRemoveLastMonth}
          disabled={data.length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: data.length === 0 ? "#475569" : "#52525b",
            color: "#fff",
            cursor: data.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Eliminar último
        </button>

        <button
          type="button"
          onClick={onClearAll}
          disabled={data.length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: data.length === 0 ? "#475569" : "#52525b",
            color: "#fff",
            cursor: data.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Limpiar todo
        </button>

        <button
          type="button"
          onClick={exportData}
          disabled={data.length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: data.length === 0 ? "#475569" : "#0ea5e9",
            color: "#fff",
            cursor: data.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Exportar JSON
        </button>

        <button
          type="button"
          onClick={exportCSV}
          disabled={data.length === 0}
          style={{
            padding: "12px 18px",
            borderRadius: "12px",
            border: "none",
            background: data.length === 0 ? "#475569" : "#16a34a",
            color: "#fff",
            cursor: data.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Exportar CSV
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          alignItems: "start",
          width: "100%",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h2 style={{ marginBottom: "14px" }}>Gráfico de ventas</h2>
          <Chart data={filteredData} theme={theme} />
        </div>

        <div style={{ minWidth: 0 }}>
          <h2 style={{ marginBottom: "14px" }}>Detalle de ventas</h2>
          <DataTable
            data={filteredData}
            theme={theme}
            onUpdateVenta={onUpdateSale}
          />
        </div>
      </div>
    </section>
  );
}