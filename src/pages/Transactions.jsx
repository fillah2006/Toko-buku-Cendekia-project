import React from "react";
import { FaDownload, FaFilter, FaSearch, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const dummyTransactions = [
    { id: "TRX001", customer: "Andi Pratama", book: "Laskar Pelangi", total: "Rp 85.000", status: "Selesai", date: "12 Des 2023" },
    { id: "TRX002", customer: "Budi Santoso", book: "Atomic Habits", total: "Rp 120.000", status: "Diproses", date: "12 Des 2023" },
    { id: "TRX003", customer: "Citra Dewi", book: "Bumi Manusia", total: "Rp 95.000", status: "Selesai", date: "11 Des 2023" },
    { id: "TRX004", customer: "Dian Ayu", book: "Negeri 5 Menara", total: "Rp 78.000", status: "Dibatalkan", date: "10 Des 2023" },
];

const statusStyles = {
    Selesai: {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: <FaCheckCircle className="mr-1.5" />
    },
    Diproses: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        icon: <FaClock className="mr-1.5" />
    },
    Dibatalkan: {
        bg: "bg-red-50",
        text: "text-red-600",
        icon: <FaTimesCircle className="mr-1.5" />
    },
};

export default function Transactions() {
    return (
        <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Riwayat Transaksi</h1>
                    <p className="text-sm text-gray-400 font-medium">Pantau semua pesanan masuk di Toko Cendakia</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white text-slate-600 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm border border-gray-100 hover:bg-slate-50 transition-all">
                        <FaFilter /> Filter
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
                        <FaDownload /> Unduh Laporan
                    </button>
                </div>
            </div>

            {/* Transaction Table Card */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Toolbar */}
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input 
                            type="text" 
                            placeholder="Cari ID transaksi atau nama..." 
                            className="w-full pl-11 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Total 4 Transaksi Hari Ini
                    </p>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/30">
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID Transaksi</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Pelanggan</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Detail Buku</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Nominal</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {dummyTransactions.map((trx) => (
                            <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors group">
                                {/* ID Transaksi */}
                                <td className="px-8 py-5">
                                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                                        {trx.id}
                                    </span>
                                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{trx.date}</p>
                                </td>

                                {/* Nama Pelanggan */}
                                <td className="px-6 py-5">
                                    <p className="font-bold text-slate-800 text-sm">{trx.customer}</p>
                                </td>

                                {/* Judul Buku */}
                                <td className="px-6 py-5">
                                    <p className="text-sm font-medium text-slate-600">{trx.book}</p>
                                </td>

                                {/* Total Bayar */}
                                <td className="px-6 py-5">
                                    <p className="text-sm font-black text-slate-800">{trx.total}</p>
                                </td>

                                {/* Status Badge */}
                                <td className="px-8 py-5 text-center">
                                    <div className="flex justify-center">
                                        <span className={`flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tight ${statusStyles[trx.status].bg} ${statusStyles[trx.status].text}`}>
                                            {statusStyles[trx.status].icon}
                                            {trx.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer Empty Space */}
                <div className="h-4 bg-slate-50/30"></div>
            </div>
        </div>
    );
}