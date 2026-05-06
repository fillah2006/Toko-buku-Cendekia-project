export default function CardStat({ icon, value, label, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-105 duration-200">
      {/* Container Ikon dengan warna dinamis */}
      <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
        <div className={color.replace("bg-", "text-")}>
          {icon}
        </div>
      </div>
      
      {/* Label dan Value */}
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}