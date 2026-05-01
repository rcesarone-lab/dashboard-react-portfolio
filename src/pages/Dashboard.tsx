import { useEffect, useState } from "react";
import KPI from '../components/KPI';
import Chart from '../components/Chart';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<{ mes: string; ventas: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroMes, setFiltroMes] = useState<string>("Todos");

  const dataFiltrada =
  filtroMes === "Todos"
    ? data
    : data.filter((item) => item.mes === filtroMes);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQ4lEAHNTziOSum50eigHDH-M7RcjYuWf7--0ML0UJoIe2TKt7-DUMwRcQno8jCaC9ycyG8qPiW2vvm/pub?output=csv")
    .then((response) => response.text())
    .then((text) => {
      const rows = text.split("\n").slice(1);
    
      const ventas = rows.map((row) => {
        const [mes, ventas] = row.split(",");
        return {
          mes: mes.trim(),
          ventas: Number(ventas),
        };
      });
    
      setData(ventas);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <h1>Cargando datos...</h1>;
  }

  const total = dataFiltrada.reduce((acc, item) => acc + item.ventas, 0);
  const promedio =
  dataFiltrada.length > 0
    ? Math.floor(total / dataFiltrada.length)
    : 0;

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
      <div
        style={{
          minHeight: "100vh",
          padding: "32px",
          fontFamily: "Arial",
          color: "#ffffff",
          background:
            "radial-gradient(circle at top left, #243b55, #141e30 35%, #050505 100%)",
        }}
      >

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(255,255,255,0.08)",
          color: "#ffffff",
          cursor: "pointer",
          marginBottom: "20px",
      }}
>
  Cerrar sesión
</button>

      <h1 style={{ marginBottom: "24px", fontSize: "42px" }}>
          Panel de ventas
      </h1>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <KPI title="Ventas totales" value={total} />
        <KPI title="Meses" value={data.length} />
        <KPI title="Promedio" value={promedio} />
      </div>

      <select
        value={filtroMes}
        onChange={(e) => setFiltroMes(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "20px",
          marginRight: "10px",
        }}
      >
        <option value="Todos">Todos</option>
        {data.map((item) => (
         <option key={item.mes} value={item.mes}>
           {item.mes}
         </option>
        ))}
      </select>

      <button
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() =>
          setData([
            ...data,
            { mes: 'Nuevo', ventas: Math.floor(Math.random() * 800) },
          ])
        }
      >
        Agregar dato
      </button>

      <h2 style={{ marginBottom: '10px' }}>Gráfico de ventas</h2>

      <Chart data={dataFiltrada} />
      <DataTable data={dataFiltrada} />
      <Footer />
    </div>
  );
}
