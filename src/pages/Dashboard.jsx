import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PageHeader from "../components/PageHeader";
import RevenueChart from "../components/RevenueChart";
import { 
  FaBook, FaUsers, FaShoppingCart, FaDollarSign, 
  FaArrowUp, FaArrowDown, FaEllipsisV, FaSignOutAlt 
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate(); // Inisialisasi navigate

  const handleLogout = () => {
    // Tambahkan logika hapus session/localstorage di sini jika ada
    navigate("/login"); 
  };

  return (
    <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">
      {/* Header & Profil Ringkas */}
      <div className="flex justify-between items-center px-2">
        <PageHeader title="Dashboard TokoBuku Cendakia" />
        
        <div className="flex items-center gap-3">
          {/* Box Profil */}
          <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-sm border border-gray-50">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
              C
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">Admin Cendakia</p>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Toko Buku Pusat</p>
            </div>
          </div>

          {/* Button Logout */}
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 bg-white text-red-500 rounded-xl shadow-sm border border-gray-50 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: REVENUE & BEST SELLERS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section Pendapatan (Revenue) */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/50 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-400 text-sm font-semibold tracking-tight">Total Pendapatan</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Rp 4.250.000</h2>
                </div>
                <div className="mt-2 flex items-center gap-2">
                   <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                    <FaArrowUp size={10} /> 2.1%
                   </span>
                   <span className="text-[11px] text-gray-400">vs minggu lalu</span>
                </div>
              </div>
              <button className="text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all active:scale-95">
                Lihat Detail
              </button>
            </div>

            <div className="mt-10 h-[280px] w-full">
              <RevenueChart />
            </div>
          </div>

          {/* Buku Terlaris (Best Seller) */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/50">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 text-lg">Buku Terlaris (Best Seller)</h3>
              <FaEllipsisV className="text-gray-300 cursor-pointer hover:text-indigo-500 transition" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Laskar Pelangi", author: "Andrea Hirata", sales: 120, color: "bg-red-500" },
                { title: "Filosofi Teras", author: "H. Manampiring", sales: 95, color: "bg-blue-500" },
                { title: "Laut Bercerita", author: "Leila S. Chudori", sales: 80, color: "bg-cyan-500" }
              ].map((buku, i) => (
                <div key={i} className="group p-4 rounded-2xl border border-gray-50 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                  <div className={`w-12 h-12 ${buku.color} rounded-xl shadow-lg mb-4 flex items-center justify-center text-white text-xl`}>
                    <FaBook />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{buku.title}</h4>
                  <p className="text-[11px] text-gray-400 mb-3">{buku.author}</p>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Terjual</span>
                    <span className="text-xs font-black text-indigo-600">{buku.sales} pcs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: STATS & ACTIVITY */}
        <div className="space-y-8">
          
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/50">
            <h3 className="font-bold text-slate-800 mb-2">Transaksi Hari Ini</h3>
            <p className="text-[11px] text-gray-400 mb-6 uppercase tracking-widest font-bold">Volume Order</p>
            
            <div className="relative flex justify-center py-6">
              <div className="w-44 h-44 rounded-full border-[18px] border-indigo-50 border-t-indigo-600 border-r-indigo-400 -rotate-45 relative flex items-center justify-center">
                <div className="rotate-45 text-center">
                   <p className="text-3xl font-black text-slate-800 leading-none">58</p>
                   <p className="text-[10px] text-gray-400 font-bold mt-1">Order</p>
                </div>
                <div className="absolute -top-2 right-0 bg-slate-800 text-white px-3 py-2 rounded-xl text-[10px] shadow-xl rotate-45">
                    <FaShoppingCart size={12} /> 20 Order Baru
                   <p className="font-bold italic">13:00 - 16:00</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold mb-1">Total Buku</p>
                <p className="text-lg font-black text-slate-800">1,240</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold mb-1">Pelanggan</p>
                <p className="text-lg font-black text-slate-800">320</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800">Aktivitas Terkini</h3>
              <button className="text-indigo-600 text-[10px] font-bold">Lihat Semua</button>
            </div>
            
            <div className="space-y-8">
              {[
                { icon: "💰", text: "Invoice #992 diterima", time: "Baru saja", color: "bg-green-50" },
                { icon: "📦", text: "Restock 'Filosofi Teras'", time: "2 jam yang lalu", color: "bg-orange-50" },
                { icon: "👤", text: "Pelanggan baru mendaftar", time: "5 jam yang lalu", color: "bg-blue-50" },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 ${act.color} rounded-xl flex items-center justify-center text-lg`}>
                    {act.icon}
                  </div>
                  <div className="flex-1 border-b border-gray-50 pb-4">
                    <p className="text-xs font-bold text-slate-700 leading-tight">{act.text}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}