import React from "react";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function PageHeader({ title }) {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  // Mendapatkan tanggal hari ini dengan format cantik
  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {isDashboard ? (
            <p className="text-sm text-gray-400 font-medium">
              Selamat datang kembali di sistem manajemen <span className="text-indigo-600 font-bold text-[13px]">TokoBuku Cendakia</span>.
            </p>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Admin</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>Management</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-indigo-500 italic lowercase font-medium">cendakia.app</span>
            </div>
          )}
        </div>
      </div>

      {/* Widget Tanggal (Hanya tampil di Dashboard untuk kesan informatif) */}
      {isDashboard && (
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-50 self-start md:self-auto">
          <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
            <FaCalendarAlt size={14} />
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-black uppercase leading-none mb-1">Hari Ini</p>
            <p className="text-xs font-bold text-slate-700 leading-none">{today}</p>
          </div>
        </div>
      )}
    </div>
  );
}