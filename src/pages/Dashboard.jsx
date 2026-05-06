import PageHeader from "../components/PageHeader";
import CardStat from "../components/CardStat";
import { FaBook, FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import RevenueChart from "../components/RevenueChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader title="Dashboard TokoBuku Cendakia" />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <CardStat 
          icon={<FaBook className="text-white text-2xl" />} 
          value="1,240" 
          label="Total Buku" 
          color="bg-red-500" 
        />
        <CardStat 
          icon={<FaUsers className="text-white text-2xl" />} 
          value="320" 
          label="Pelanggan" 
          color="bg-blue-500" 
        />
        <CardStat 
          icon={<FaShoppingCart className="text-white text-2xl" />} 
          value="58" 
          label="Transaksi Hari Ini" 
          color="bg-green-500" 
        />
        <CardStat 
          icon={<FaDollarSign className="text-white text-2xl" />} 
          value="Rp 4.2jt" 
          label="Pendapatan" 
          color="bg-yellow-500" 
        />
      </div>

      {/* Section Bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
          <h2 className="text-lg font-semibold mb-4">Statistik Penjualan Buku</h2>
          <RevenueChart />
        </div>

        {/* Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terkini</h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li>📖 Buku "Laskar Pelangi" terjual</li>
            <li>📦 Restock 50pcs "Filosofi Teras"</li>
            <li>👤 Pelanggan baru mendaftar</li>
            <li>💰 Pembayaran untuk Invoice #992 diterima</li>
          </ul>
        </div>
      </div>

      {/* Bottom section: Best Sellers */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Buku Terlaris (Best Seller)</h2>
        <div className="flex justify-between text-sm border-b py-2">
          <span>Laskar Pelangi - Andrea Hirata</span>
          <span className="text-red-500 font-medium">120 terjual</span>
        </div>
        <div className="flex justify-between text-sm border-b py-2">
          <span>Filosofi Teras - Henry Manampiring</span>
          <span className="text-red-500 font-medium">95 terjual</span>
        </div>
        <div className="flex justify-between text-sm py-2">
          <span>Laut Bercerita - Leila S. Chudori</span>
          <span className="text-red-500 font-medium">80 terjual</span>
        </div>
      </div>
    </div>
  );
}