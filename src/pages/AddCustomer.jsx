import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function AddCustomer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    totalOrder: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Ambil data pelanggan lama dari localStorage
    const existingCustomers = JSON.parse(localStorage.getItem("customersList") || "[]");

    // 2. Buat objek data baru
    const newCustomer = {
      id: existingCustomers.length + 1, // ID urut sederhana
      name: formData.name,
      email: formData.email,
      totalOrder: parseInt(formData.totalOrder) || 0 // Konversi ke angka
    };

    // 3. Simpan ke localStorage
    const updatedCustomers = [...existingCustomers, newCustomer];
    localStorage.setItem("customersList", JSON.stringify(updatedCustomers));

    // 4. Kembali ke halaman daftar pelanggan
    navigate("/customers");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Tambah Pelanggan Baru" />

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
        <div className="space-y-4">
          {/* Input Nama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Masukkan nama pelanggan"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              required
              type="email" 
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="contoh@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Input Total Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Order</label>
            <input 
              required
              type="number" 
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="0"
              value={formData.totalOrder}
              onChange={(e) => setFormData({...formData, totalOrder: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button 
            type="submit" 
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Simpan Pelanggan
          </button>
          <button 
            type="button"
            onClick={() => navigate("/customers")}
            className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}