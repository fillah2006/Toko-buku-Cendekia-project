import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Sen', pendapatan: 4000 },
  { name: 'Sel', pendapatan: 3000 },
  { name: 'Rab', pendapatan: 5000 },
  { name: 'Kam', pendapatan: 2780 },
  { name: 'Jum', pendapatan: 4890 },
  { name: 'Sab', pendapatan: 2390 },
  { name: 'Min', pendapatan: 3490 },
];

// Custom Tooltip agar terlihat mewah ala Figma
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-3 rounded-xl shadow-xl border-none text-xs">
        <p className="font-bold mb-1">{`${payload[0].payload.name}`}</p>
        <p className="text-indigo-300 font-black">
          Rp {payload[0].value.toLocaleString('id-ID')}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        {/* Menggunakan AreaChart untuk efek gradasi di bawah garis */}
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          {/* Menghilangkan garis grid vertikal, hanya horizontal yang tipis */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4f46e5', strokeWidth: 1 }} />
          
          <Area 
            type="monotone" 
            dataKey="pendapatan" 
            stroke="#4f46e5" 
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorPendapatan)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}