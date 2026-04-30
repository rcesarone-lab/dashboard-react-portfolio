type Props = {
  title: string;
  value: number;
};

export default function KPI({ title, value }: Props) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        width: '150px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <p style={{ margin: 0, color: '#555' }}>{title}</p>
      <h2 style={{ margin: '10px 0 0 0' }}>{value}</h2>
    </div>
  );
}
