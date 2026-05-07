import React from "react";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto px-10 py-8 border-t border-gray-100/50 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Sisi Kiri: Hak Cipta */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            &copy; {currentYear} <span className="text-indigo-600">Toko Buku Cendakia</span>
          </p>
          <p className="text-[10px] text-gray-300 font-medium mt-1">
            Sistem Manajemen Inventaris & Pelanggan v2.0.4
          </p>
        </div>

        {/* Sisi Tengah: Dibuat dengan cinta (Aksen Figma) */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
          Developed with <FaHeart className="text-red-400 animate-pulse" /> for Better Literasi
        </div>

        {/* Sisi Kanan: Status Sistem */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <button className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-tight transition-colors">
            Pusat Bantuan
          </button>
        </div>
        
      </div>
    </footer>
  );
}