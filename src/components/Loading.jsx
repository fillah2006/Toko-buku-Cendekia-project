import React from "react";
import logo from "../assets/logo.png";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8F9FD]">
      {/* Container untuk Logo dengan efek bayangan halus */}
      <div className="relative mb-8">
        {/* Efek Denyut (Pulse) di belakang logo */}
        <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        
        <div className="relative bg-white p-6 rounded-[2rem] shadow-xl shadow-indigo-100/50">
          <img 
            src={logo} 
            alt="Loading Cendakia" 
            className="h-16 w-auto object-contain animate-bounce transition-all"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>

      {/* Teks Loading yang elegan */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-black text-slate-800 tracking-tighter">
          Cendakia <span className="text-indigo-600">Pro</span>
        </h2>
        
        {/* Progress Bar Custom */}
        <div className="w-48 h-1.5 bg-indigo-100 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-indigo-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
        
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-4">
          Menyiapkan Data Anda
        </p>
      </div>

      {/* CSS Animasi Custom (Bisa diletakkan di index.css atau style tag) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; transform: translateX(20%); }
          100% { width: 100%; transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}