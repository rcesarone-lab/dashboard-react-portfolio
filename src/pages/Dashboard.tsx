import { useState } from 'react';
import KPI from '../components/KPI';
import Chart from '../components/Chart';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    { mes: 'Ene', ventas: 400 },
    { mes: 'Feb', ventas: 300 },
    { mes: 'Mar', ventas: 500 },
  ]);

  const total = data.reduce((acc, item) => acc + item.ventas, 0);
  const promedio = Math.floor(total / data.length);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <h1 style={{ marginBottom: '20px' }}>Panel de ventas</h1>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <KPI title="Ventas totales" value={total} />
        <KPI title="Meses" value={data.length} />
        <KPI title="Promedio" value={promedio} />
      </div>

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

      <Chart data={data} />
    </div>
  );
}
