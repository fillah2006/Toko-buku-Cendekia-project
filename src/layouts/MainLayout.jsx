import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaHeart } from "react-icons/fa";

export default function MainLayout() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex min-h-screen bg-[#F8F9FD]">
      {/* Sidebar tetap di kiri dengan posisi fixed */}
      <Sidebar />

      {/* Konten Utama Container */}
      {/* ml-64 sangat penting agar konten tidak tertutup sidebar fixed */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen overflow-x-hidden">
        
        {/* Area Utama Dashboard */}
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer Modern sesuai Desain Figma */}
        <footer className="mt-auto px-6 md:px-10 py-8 border-t border-gray-100/50 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Sisi Kiri: Copyright & Identitas */}
            <div className="text-center md:text-left">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                &copy; {currentYear} <span className="text-indigo-600">Toko Buku Cendakia</span>
              </p>
              <p className="text-[10px] text-gray-300 font-medium mt-1 uppercase tracking-tight">
                Inventory & Customer Management System v2.0.4
              </p>
            </div>

            {/* Sisi Tengah: Dekorasi (Opsional) */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              Built with <FaHeart className="text-red-400 animate-pulse" /> for Productivity
            </div>

            {/* Sisi Kanan: Status & Link Bantuan */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">System Online</span>
              </div>
              
              <div className="h-4 w-[1px] bg-gray-200"></div>
              
              <button className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest transition-all">
                Pusat Bantuan
              </button>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}