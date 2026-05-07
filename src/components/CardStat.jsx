import React from "react";

export default function CardStat({ icon, value, label, color, trend }) {
  // trend (opsional): bisa berisi "+2.5%" untuk mempermanis card ala Figma
  
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100/50 flex flex-col gap-4 transition-all hover:shadow-xl hover:shadow-indigo-500/5 duration-300 group">
      
      <div className="flex justify-between items-start">
        {/* Container Ikon dengan glassmorphism style */}
        <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center transition-transform group-hover:rotate-6`}>
          <div className={`text-2xl ${color.replace("bg-", "text-")}`}>
            {icon}
          </div>
        </div>

        {/* Badge Trend (Opsional, sangat khas Figma Dashboard) */}
        {trend && (
          <span className="text-[10px] font-black bg-green-50 text-green-500 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      
      {/* Label dan Value */}
      <div className="space-y-1">
        <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest leading-none">
          {label}
        </p>
        <div className="flex items-baseline gap-1">
          <p className="text-2xl font-black text-slate-800 tracking-tighter">
            {value}
          </p>
          {/* Jika value berupa angka besar, bisa tambah 'unit' kecil di sini */}
        </div>
      </div>

      {/* Dekorasi garis halus di bawah card ala premium UI */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
}