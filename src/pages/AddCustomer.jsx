import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import {
  FaUserPlus,
  FaArrowLeft,
  FaEnvelope,
  FaUser,
  FaHashtag,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar
} from "react-icons/fa";
import { PageHeader } from "../components";

export default function AddCustomer() {
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    idPelanggan: "",
    name: "",
    email: "",
    no_handphone: "",
    alamat: "",
    kategoriPelanggan: "Reguler",
    preferensiProduk: "",
    levelMember: "Basic",
    poinLoyalitas: "0",
    transaksiTerakhir: "",
    statusPelanggan: "Active",
    totalOrder: ""
  });

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Konversi data string input ke Integer sesuai kebutuhan database
    const totalTransaksi = parseInt(formData.totalOrder, 10) || 0;
    const poinLoyalitas = parseInt(formData.poinLoyalitas, 10) || 0;

    // 2. Petakan data Form ke NAMA KOLOM DATABASE SUPABASE milikmu
    // Catatan: Kolom 'id' dan 'id_pelanggan' tidak perlu dimasukkan jika sudah auto-increment di Supabase
    const newCustomerData = {
      // optional custom customer id (jika tidak mau auto-increment)
      nama_pelanggan: formData.name,
      level_member: formData.levelMember,
      tgl_transaksi_terakhir: formData.transaksiTerakhir || null,
      total_transaksi: totalTransaksi,
      status_pelanggan: formData.statusPelanggan,
      poin_loyalitas: poinLoyalitas,
      status_preorder: !!formData.statusPreorder,
      // optional contact fields
      email: formData.email || null,
      no_handphone: formData.no_handphone || null,
      alamat: formData.alamat || null
      
      /* PENTING: Jika kamu ingin menyimpan email, no hp, atau alamat, 
        pastikan kolom tersebut sudah kamu tambahkan dulu di dashboard Supabase kamu.
        Contoh jika kolomnya sudah ada di database, buka comment di bawah ini:
        
        email: formData.email,
        no_hp: formData.nohandphone,
        alamat: formData.alamat,
      */
    };

    try {
      // 3. Kirim data ke Supabase (ganti 'customers' dengan nama tabel aslimu di Supabase jika berbeda)
      const { data, error } = await supabase
        .from("customers") 
        .insert([newCustomerData]);

      if (error) {
        throw error;
      }

      console.log("Data berhasil masuk ke Supabase:", data);
      
      // 4. Redirect kembali ke halaman list pelanggan setelah sukses
      navigate("/customers");

    } catch (error) {
      console.error("Gagal menyimpan ke Supabase:", error.message);
      alert("Gagal menyimpan data ke database: " + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full space-y-4 md:space-y-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/customers")}
            className="rounded-2xl border border-gray-50 bg-white p-3 text-slate-400 shadow-sm transition-all hover:text-indigo-600"
          >
            <FaArrowLeft size={18} />
          </button>
          <PageHeader title="Tambah Pelanggan Baru" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white p-10 shadow-sm"
            >
              <div className="absolute left-0 top-0 h-full w-2 bg-indigo-600"></div>

              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-lg font-black text-slate-800">Informasi Pelanggan</h3>
                  <p className="text-xs text-gray-400">Lengkapi data pelanggan untuk kebutuhan loyalitas dan transaksi.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaUser className="text-indigo-500" /> Nama Lengkap
                    </label>
                    <input
                      ref={nameInputRef}
                      required
                      type="text"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Masukkan nama pelanggan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaHashtag className="text-indigo-500" /> ID Pelanggan (opsional)
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Contoh: CEND-001"
                      value={formData.idPelanggan}
                      onChange={(e) => setFormData({ ...formData, idPelanggan: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaEnvelope className="text-indigo-500" /> Alamat Email
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaPhone className="text-indigo-500" /> No. HP
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="08xxxxxxxxxx"
                      value={formData.no_handphone}
                      onChange={(e) => setFormData({ ...formData, no_handphone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaCalendarAlt className="text-indigo-500" /> Transaksi Terakhir
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.transaksiTerakhir}
                      onChange={(e) => setFormData({ ...formData, transaksiTerakhir: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <FaMapMarkerAlt className="text-indigo-500" /> Alamat
                  </label>
                  <textarea
                    rows="3"
                    className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="Masukkan alamat lengkap pelanggan"
                    value={formData.alamat}
                    onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaStar className="text-indigo-500" /> Kategori Pelanggan
                    </label>
                    <select
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.kategoriPelanggan}
                      onChange={(e) => setFormData({ ...formData, kategoriPelanggan: e.target.value })}
                    >
                      <option value="Reguler">Reguler</option>
                      <option value="Member">Member</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaStar className="text-indigo-500" /> Level Member
                    </label>
                    <select
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.levelMember}
                      onChange={(e) => setFormData({ ...formData, levelMember: e.target.value })}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaHashtag className="text-indigo-500" /> Preferensi Produk
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Contoh: Novel, Self-Development"
                      value={formData.preferensiProduk}
                      onChange={(e) => setFormData({ ...formData, preferensiProduk: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaHashtag className="text-indigo-500" /> Poin Loyalitas
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="0"
                      value={formData.poinLoyalitas}
                      onChange={(e) => setFormData({ ...formData, poinLoyalitas: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaHashtag className="text-indigo-500" /> Total Transaksi Awal
                    </label>
                    <input
                      required
                      type="number"
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="0"
                      value={formData.totalOrder}
                      onChange={(e) => setFormData({ ...formData, totalOrder: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                      <FaStar className="text-indigo-500" /> Status Pelanggan
                    </label>
                    <select
                      className="w-full rounded-2xl border-none bg-slate-50 p-4 text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/20"
                      value={formData.statusPelanggan}
                      onChange={(e) => setFormData({ ...formData, statusPelanggan: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <label className="ml-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                    <input
                      type="checkbox"
                      checked={!!formData.statusPreorder}
                      onChange={(e) => setFormData({ ...formData, statusPreorder: e.target.checked })}
                      className="h-4 w-4 rounded"
                    />
                    Status Preorder
                  </label>
                </div>
              </div>

              <div className="mt-12 flex gap-4 border-t border-gray-50 pt-8">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
                >
                  <FaUserPlus /> Simpan Pelanggan
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/customers")}
                  className="rounded-2xl bg-slate-100 px-8 py-4 text-sm font-bold text-slate-500 transition-all hover:bg-slate-200"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-100">
              <h4 className="mb-4 font-bold">Tips Admin</h4>
              <p className="text-xs leading-relaxed text-indigo-100">
                Data pelanggan baru akan membantu tim pemasaran mengelola loyalitas, segmentasi, dan follow-up transaksi.
              </p>
            </div>

            <div className="rounded-[2rem] border border-gray-100 bg-white p-8">
              <h4 className="mb-4 font-bold text-slate-800">Preview</h4>
              <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-bold text-white">
                  {formData.name ? formData.name.charAt(0) : "?"}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{formData.name || "Nama Pelanggan"}</p>
                  <p className="text-[10px] text-gray-400">{formData.email || "email@cendakia.com"}</p>
                  <p className="mt-1 text-[10px] text-indigo-500">
                    {formData.kategoriPelanggan} • {formData.levelMember} • {formData.poinLoyalitas || 0} poin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}