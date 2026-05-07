import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaSearch, FaEnvelope, FaShoppingBasket, FaEllipsisH } from "react-icons/fa";

export default function Customers() {
    const navigate = useNavigate();
    
    const [customers, setCustomers] = useState(() => {
        const savedData = localStorage.getItem("customersList");
        return savedData ? JSON.parse(savedData) : [
            { id: 1, name: "Andi Pratama", email: "andi@email.com", totalOrder: 5, status: "Active" },
            { id: 2, name: "Budi Santoso", email: "budi@email.com", totalOrder: 3, status: "Inactive" },
            { id: 3, name: "Citra Dewi", email: "citra@email.com", totalOrder: 12, status: "Active" },
            { id: 4, name: "Dian Ayu", email: "dian@email.com", totalOrder: 2, status: "Active" },
        ];
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const savedData = localStorage.getItem("customersList");
            if (savedData) setCustomers(JSON.parse(savedData));
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Database Pelanggan</h1>
                    <p className="text-sm text-gray-400 font-medium">Kelola data pelanggan setia Toko Cendakia</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                        <input 
                            type="text" 
                            placeholder="Cari nama atau email..." 
                            className="pl-12 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-indigo-500/20 w-72"
                        />
                    </div>
                    <button 
                        onClick={() => navigate("/customers/add")}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
                    >
                        <FaUserPlus size={14} /> Tambah Pelanggan
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50">
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Pelanggan</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Kontak</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Total Order</th>
                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                                {/* Nama & Avatar */}
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            {customer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{customer.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Member ID #00{customer.id}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Email */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FaEnvelope className="text-gray-300" size={12} />
                                        <span className="text-sm font-medium">{customer.email}</span>
                                    </div>
                                </td>

                                {/* Total Order */}
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full">
                                            <FaShoppingBasket className="text-orange-500" size={10} />
                                            <span className="text-sm font-black text-orange-600">{customer.totalOrder}</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-5">
                                    <div className="flex justify-center">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                                            customer.status === "Active" 
                                            ? "bg-green-50 text-green-600" 
                                            : "bg-gray-50 text-gray-400"
                                        }`}>
                                            {customer.status}
                                        </span>
                                    </div>
                                </td>

                                {/* Aksi */}
                                <td className="px-8 py-5">
                                    <div className="flex items-center justify-end">
                                        <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                            <FaEllipsisH size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer Info */}
                <div className="px-8 py-6 bg-slate-50/50 flex justify-between items-center border-t border-gray-50">
                    <p className="text-[11px] text-gray-400 font-bold uppercase">Total Database: {customers.length} Pelanggan</p>
                    <div className="flex gap-4">
                        <button className="text-[11px] font-bold text-gray-400 hover:text-indigo-600 transition">Halaman Sebelumnya</button>
                        <button className="text-[11px] font-bold text-indigo-600 transition">Berikutnya</button>
                    </div>
                </div>
            </div>
        </div>
    );
}