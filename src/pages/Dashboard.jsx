import React from "react";
import PageHeader from "../components/PageHeader";
import RevenueChart from "../components/RevenueChart";

import {
    FaArrowUp,
    FaEllipsisV
} from "react-icons/fa";

import SectionCard from "../components/SectionCard";
import BestSellerCard from "../components/BestSellerCard";
import ActivityItem from "../components/ActivityItem";
import TransactionCircle from "../components/TransactionCircle";
import StatCard from "../components/StatCard";

export default function Dashboard() {

    const bestSellers = [
        {
            title: "Laskar Pelangi",
            author: "Andrea Hirata",
            sales: 120,
            color: "bg-red-500"
        },
        {
            title: "Filosofi Teras",
            author: "H. Manampiring",
            sales: 95,
            color: "bg-blue-500"
        },
        {
            title: "Laut Bercerita",
            author: "Leila S. Chudori",
            sales: 80,
            color: "bg-cyan-500"
        }
    ];

    const activities = [
        {
            icon: "💰",
            text: "Invoice #992 diterima",
            time: "Baru saja",
            color: "bg-green-50"
        },
        {
            icon: "📦",
            text: "Restock Filosofi Teras",
            time: "2 jam yang lalu",
            color: "bg-orange-50"
        },
        {
            icon: "👤",
            text: "Pelanggan baru mendaftar",
            time: "5 jam yang lalu",
            color: "bg-blue-50"
        }
    ];

    return (
        <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">

            <PageHeader
                title="Dashboard TokoBuku Cendakia"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Revenue */}
                    <SectionCard>

                        <div className="flex justify-between items-start">

                            <div>

                                <p className="text-gray-400 text-sm font-semibold">
                                    Total Pendapatan
                                </p>

                                <h2 className="text-3xl font-black text-slate-800 mt-1">
                                    Rp 4.250.000
                                </h2>

                                <div className="mt-3 flex items-center gap-2">

                                    <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">

                                        <FaArrowUp size={10} />

                                        2.1%

                                    </span>

                                    <span className="text-[11px] text-gray-400">
                                        vs minggu lalu
                                    </span>

                                </div>

                            </div>

                            <button className="text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all">

                                Lihat Detail

                            </button>

                        </div>

                        <div className="mt-10 h-[280px]">

                            <RevenueChart />

                        </div>

                    </SectionCard>

                    {/* Best Seller */}
                    <SectionCard>

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="font-bold text-slate-800 text-lg">
                                Buku Terlaris
                            </h3>

                            <FaEllipsisV className="text-gray-300" />

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {bestSellers.map((book, index) => (

                                <BestSellerCard
                                    key={index}
                                    title={book.title}
                                    author={book.author}
                                    sales={book.sales}
                                    color={book.color}
                                />

                            ))}

                        </div>

                    </SectionCard>

                </div>

                {/* RIGHT */}
                <div className="space-y-8">

                    {/* Transaction */}
                    <SectionCard>

                        <h3 className="font-bold text-slate-800 mb-2">
                            Transaksi Hari Ini
                        </h3>

                        <p className="text-[11px] text-gray-400 mb-6 uppercase tracking-widest font-bold">
                            Volume Order
                        </p>

                        <TransactionCircle />

                        <div className="grid grid-cols-2 gap-4 mt-8">

                            <StatCard
                                title="Total Buku"
                                value="1,240"
                            />

                            <StatCard
                                title="Pelanggan"
                                value="320"
                            />

                        </div>

                    </SectionCard>

                    {/* Activity */}
                    <SectionCard>

                        <div className="flex justify-between items-center mb-8">

                            <h3 className="font-bold text-slate-800">
                                Aktivitas Terkini
                            </h3>

                            <button className="text-indigo-600 text-[10px] font-bold">
                                Lihat Semua
                            </button>

                        </div>

                        <div className="space-y-8">

                            {activities.map((activity, index) => (

                                <ActivityItem
                                    key={index}
                                    icon={activity.icon}
                                    text={activity.text}
                                    time={activity.time}
                                    color={activity.color}
                                />

                            ))}

                        </div>

                    </SectionCard>

                </div>

            </div>

        </div>
    );
}