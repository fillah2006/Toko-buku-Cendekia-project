import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Customers() {
    const navigate = useNavigate();
    
    // State awal mengambil data dari localStorage, jika kosong gunakan data dummy
    const [customers, setCustomers] = useState(() => {
        const savedData = localStorage.getItem("customersList");
        return savedData ? JSON.parse(savedData) : [
            { id: 1, name: "Andi Pratama", email: "andi@email.com", totalOrder: 5 },
            { id: 2, name: "Budi Santoso", email: "budi@email.com", totalOrder: 3 },
            { id: 3, name: "Citra Dewi", email: "citra@email.com", totalOrder: 8 },
            { id: 4, name: "Dian Ayu", email: "dian@email.com", totalOrder: 2 },
        ];
    });

    // Menggunakan useEffect untuk memperbarui state jika ada perubahan di localStorage
    // (Opsional, berguna jika aplikasi Anda berkembang lebih kompleks)
    useEffect(() => {
        const handleStorageChange = () => {
            const savedData = localStorage.getItem("customersList");
            if (savedData) setCustomers(JSON.parse(savedData));
        };
        
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Pelanggan</h1>
                <button 
                    onClick={() => navigate("/customers/add")}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                    + Tambah Pelanggan
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Nama</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Total Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr
                                key={customer.id}
                                className="border-b hover:bg-red-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {customer.name}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                                <td className="px-6 py-4 text-red-500 font-semibold">
                                    {customer.totalOrder}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}