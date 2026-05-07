import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaArrowLeft, FaEnvelope, FaUser, FaHashtag } from "react-icons/fa";
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

    const existingCustomers = JSON.parse(localStorage.getItem("customersList") || "[]");

    const newCustomer = {
      id: existingCustomers.length + 1,
      name: formData.name,
      email: formData.email,
      totalOrder: parseInt(formData.totalOrder) || 0,
      status: "Active" // Menambahkan status default sesuai desain list pelanggan
    };

    const updatedCustomers = [...existingCustomers, newCustomer];
    localStorage.setItem("customersList", JSON.stringify(updatedCustomers));

    navigate("/customers");
  };

  return (
    <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">
      {/* Tombol Kembali & Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate("/customers")}
          className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 hover:text-indigo-600 transition-all border border-gray-50"
        >
          <FaArrowLeft size={18} />
        </button>
        <PageHeader title="Tambah Pelanggan Baru" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form 
            onSubmit={handleSubmit} 
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
            
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-lg font-black text-slate-800">Informasi Pribadi</h3>
                <p className="text-xs text-gray-400">Pastikan data email aktif untuk keperluan invoice.</p>
              </div>

              {/* Input Nama */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <FaUser className="text-indigo-500" /> Nama Lengkap
                </label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-300"
                  placeholder="Masukkan nama pelanggan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input Email */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" /> Alamat Email
                  </label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-300"
                    placeholder="contoh@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {/* Input Total Order */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <FaHashtag className="text-indigo-500" /> Total Order Awal
                  </label>
                  <input 
                    required
                    type="number" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-300"
                    placeholder="0"
                    value={formData.totalOrder}
                    onChange={(e) => setFormData({...formData, totalOrder: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex gap-4">
              <button 
                type="submit" 
                className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <FaUserPlus /> Simpan Pelanggan
              </button>
              <button 
                type="button"
                onClick={() => navigate("/customers")}
                className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
              >
                Batal
              </button>
            </div>
          </form>
        </div>

        {/* Info Card (Samping) */}
        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold mb-4">Tips Admin</h4>
            <p className="text-xs text-indigo-100 leading-relaxed">
              Menambahkan pelanggan baru akan secara otomatis memberikan mereka **Member ID**. Pastikan data sudah benar sebelum menyimpan.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
            <h4 className="font-bold text-slate-800 mb-4">Preview</h4>
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {formData.name ? formData.name.charAt(0) : "?"}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{formData.name || "Nama Pelanggan"}</p>
                <p className="text-[10px] text-gray-400">{formData.email || "email@cendakia.com"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}