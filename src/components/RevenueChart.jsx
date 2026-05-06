import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sen', pendapatan: 4000 },
  { name: 'Sel', pendapatan: 3000 },
  { name: 'Rab', pendapatan: 2000 },
  { name: 'Kam', pendapatan: 2780 },
  { name: 'Jum', pendapatan: 1890 },
  { name: 'Sab', pendapatan: 2390 },
  { name: 'Min', pendapatan: 3490 },
];

export default function RevenueChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pendapatan" stroke="#ef4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}