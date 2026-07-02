import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import supabase from "../services/supabase";

import {
    Button,
    SearchInput,
    Table,
    CustomerRow,
    Pagination
} from "../components";

const normalizeCustomer = (customer, index) => ({
  // Primary key
  id: customer.id ?? index + 1,
  id_pelanggan: customer.id_pelanggan ?? null,

  // Database fields (source of truth)
  nama_pelanggan: customer.nama_pelanggan ?? "",
  email: customer.email ?? "",
  no_hp: customer.no_hp ?? "",
  alamat: customer.alamat ?? "",

  kategori_pelanggan: customer.kategori_pelanggan ?? "Reguler",
  preferensi_produk: customer.preferensi_produk ?? "",
  level_member: customer.level_member ?? "Basic",
  poin_loyalitas: Number(customer.poin_loyalitas ?? 0),
  tgl_transaksi_terakhir: customer.tgl_transaksi_terakhir ?? "",
  status_pelanggan: customer.status_pelanggan ?? "Active",
  total_transaksi: Number(customer.total_transaksi ?? 0),
  status_preorder: customer.status_preorder ?? false,

  // UI alias (optional)
  name: customer.nama_pelanggan ?? "",
  phone: customer.no_hp ?? "",
  address: customer.alamat ?? "",
  levelMember: customer.level_member ?? "Basic",
  poinLoyalitas: Number(customer.poin_loyalitas ?? 0),
  statusPelanggan: customer.status_pelanggan ?? "Active",
  totalOrder: Number(customer.total_transaksi ?? 0),
  transaksiTerakhir: customer.tgl_transaksi_terakhir ?? ""
});



export default function Customers() {
const navigate = useNavigate();
const [customers, setCustomers] = useState([]);
useEffect(() => {
  getCustomers();
}, []);

const getCustomers = async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setCustomers(data.map(normalizeCustomer));
};


 

    const headers = [
        "Pelanggan",
        "Kontak",
        "Kategori",
        "Level",
        "Total Transaksi",
        "Poin",
        "Status",
        "Transaksi Terakhir",
    ];

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(
        (customer) => (customer.statusPelanggan ?? customer.status ?? "Inactive") === "Active"
    ).length;
    const repeatCustomers = customers.filter(
        (customer) => (customer.totalTransaksi ?? customer.totalOrder ?? 0) >= 3
    ).length;
    const totalOrders = customers.reduce(
        (sum, customer) => sum + (customer.totalTransaksi ?? customer.totalOrder ?? 0),
        0
    );
    const averageOrders = totalCustomers
        ? (totalOrders / totalCustomers).toFixed(1)
        : "0.0";

    return (
        <div className="w-full">
            <div className="mx-auto w-full space-y-4 md:space-y-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-black tracking-tight text-slate-800">
                            Database Pelanggan
                        </h1>

                        <p className="text-sm font-medium text-gray-400">
                            Kelola data pelanggan setia Toko Cendakia
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <SearchInput placeholder="Cari nama atau email..." />

                        <Button
                            type="primary"
                            onClick={() => navigate("/customers/add")}
                            className="flex w-full items-center gap-2 shadow-lg shadow-indigo-100 sm:w-auto"
                        >
                            <FaUserPlus size={14} />
                            Tambah Pelanggan
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                            Total Pelanggan
                        </p>
                        <p className="text-3xl font-black text-slate-800">{totalCustomers}</p>
                    </div>

                    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                            Pelanggan Aktif
                        </p>
                        <p className="text-3xl font-black text-slate-800">{activeCustomers}</p>
                    </div>

                    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                            Pelanggan Repeat
                        </p>
                        <p className="text-3xl font-black text-slate-800">{repeatCustomers}</p>
                    </div>

                    <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-gray-400">
                            Rata-rata Order
                        </p>
                        <p className="text-3xl font-black text-slate-800">{averageOrders}</p>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Segmentasi pelanggan membantu tim pemasaran menargetkan kampanye, mempercepat follow-up, dan menjaga retensi pelanggan setia Toko Buku Cendakia.
                    </p>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                    <div className="max-h-[60vh] overflow-auto">
                        <Table headers={headers}>
                            {customers.map((customer) => (
                                <CustomerRow key={customer.id} customer={customer} />
                            ))}
                        </Table>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 bg-slate-50/50 px-8 py-6">
                        <p className="text-[11px] font-bold uppercase text-gray-400">
                            Total Database: {customers.length} Pelanggan
                        </p>

                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
}