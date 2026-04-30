import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: { mes: string; ventas: number }[];
};

export default function Chart({ data }: Props) {
  return (
    <div style={{ width: '100%', height: '300px', marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ventas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
