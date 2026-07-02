import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    PageHeader,
    RevenueChart,
    SectionCard,
    BestSellerCard,
    ActivityItem,
    TransactionCircle,
    StatCard
} from "../components";
import supabase from "../services/supabase";

import {
    FaArrowUp,
    FaEllipsisV,
    FaSignOutAlt
} from "react-icons/fa";

const readStorageArray = (key, fallbackKey = null) => {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const primary = localStorage.getItem(key);
        if (primary) {
            const parsed = JSON.parse(primary);
            return Array.isArray(parsed) ? parsed : [];
        }

        if (fallbackKey) {
            const fallback = localStorage.getItem(fallbackKey);
            if (fallback) {
                const parsed = JSON.parse(fallback);
                return Array.isArray(parsed) ? parsed : [];
            }
        }
    } catch {
        return [];
    }

    return [];
};

const parseAmount = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === "string") {
        const cleaned = value.replace(/[^0-9.-]/g, "");
        const parsed = Number(cleaned);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    return 0;
};

const parseCount = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) {
        return Math.max(0, Math.floor(value));
    }

    if (typeof value === "string") {
        const cleaned = value.replace(/[^0-9]/g, "");
        const parsed = Number(cleaned);
        return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0;
    }

    return 0;
};

const getTransactionAmount = (transaction) => {
    const candidates = [
        transaction.amount,
        transaction.total,
        transaction.nominal,
        transaction.totalAmount,
        transaction.grandTotal,
        transaction.price
    ];

    for (const candidate of candidates) {
        const amount = parseAmount(candidate);
        if (amount > 0) {
            return amount;
        }
    }

    return 0;
};

export default function Dashboard() {
    const navigate = useNavigate();
const { signOut } = useAuth();
const [customers, setCustomers] = useState([]);
const [transactions, setTransactions] = useState([]);
const [products, setProducts] = useState([]);
const [preorders, setPreorders] = useState([]);

useEffect(() => {
    const fetchDashboardData = async () => {
        const fallbackCustomers = readStorageArray("customers", "customersList");
        const fallbackTransactions = readStorageArray("transactions");
        const fallbackProducts = readStorageArray("products");
        const fallbackPreorders = readStorageArray("preorders");

        const customersResult = await supabase.from("customers").select("*");
        if (!customersResult.error && Array.isArray(customersResult.data)) {
            setCustomers(customersResult.data);
        } else {
            console.warn("Dashboard: customers fetch failed, fallback to localStorage", customersResult.error);
            setCustomers(fallbackCustomers);
        }

        const transactionsResult = await supabase.from("transactions").select("*");
        if (!transactionsResult.error && Array.isArray(transactionsResult.data) && transactionsResult.data.length) {
            setTransactions(transactionsResult.data);
        } else {
            console.warn("Dashboard: transactions fetch failed or no data returned, fallback to localStorage", transactionsResult.error, transactionsResult.data);
            setTransactions(fallbackTransactions);
        }

        const productsResult = await supabase.from("products").select("*");
        if (!productsResult.error && Array.isArray(productsResult.data) && productsResult.data.length) {
            setProducts(productsResult.data);
        } else {
            console.warn("Dashboard: products fetch failed or no data returned, fallback to localStorage", productsResult.error, productsResult.data);
            setProducts(fallbackProducts);
        }

        const preordersResult = await supabase.from("preorders").select("*");
        if (!preordersResult.error && Array.isArray(preordersResult.data)) {
            setPreorders(preordersResult.data);
        } else {
            console.warn("Dashboard: preorders fetch failed, fallback to localStorage", preordersResult.error);
            setPreorders(fallbackPreorders);
        }
    };

    fetchDashboardData();
}, []);

const handleLogout = async () => {
    try {
        await signOut();
        navigate("/login", { replace: true });
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

    const totalPendapatan = useMemo(() => {
        return transactions.reduce((sum, transaction) => sum + getTransactionAmount(transaction), 0);
    }, [transactions]);

    const totalOrder = useMemo(() => {
        return transactions.reduce((sum, transaction) => {
            const explicitOrderCount = Number(transaction.orderCount ?? transaction.quantity ?? transaction.items ?? transaction.qty ?? 1);
            return sum + (Number.isFinite(explicitOrderCount) && explicitOrderCount > 0 ? explicitOrderCount : 1);
        }, 0);
    }, [transactions]);

    const totalPelanggan = customers.length;

    const totalBukuTerjual = useMemo(() => {
        const customerSum = customers.reduce((sum, customer) => {
            return (
                sum +
                parseCount(
                    customer.total_transaksi ??
                    customer.totalTransaksi ??
                    customer.totalOrder ??
                    customer.total_orders ??
                    customer.totalTransactions ??
                    customer.jumlah_transaksi ??
                    customer.total_buku ??
                    customer.buku_terjual ??
                    customer.terjual ??
                    0
                )
            );
        }, 0);

        if (customerSum > 0) {
            return customerSum;
        }

        const transactionSum = transactions.reduce((sum, transaction) => {
            const count = parseCount(
                transaction.quantity ??
                transaction.items ??
                transaction.qty ??
                transaction.orderCount ??
                transaction.total ??
                transaction.bookCount ??
                transaction.jumlah_buku ??
                transaction.terjual ??
                0
            );
            return sum + (count > 0 ? count : 1);
        }, 0);

        return transactionSum;
    }, [customers, transactions]);

    const pelangganVIP = customers.filter((customer) => {
        const category = String(customer.kategoriPelanggan ?? customer.customerCategory ?? "").toLowerCase();
        const level = String(customer.levelMember ?? customer.memberLevel ?? "").toLowerCase();
        return category === "vip" || level === "vip";
    }).length;

    const retention = useMemo(() => {
        if (!totalPelanggan) {
            return 0;
        }

        const aktif = customers.filter((customer) => {
            const status = String(customer.statusPelanggan ?? customer.status ?? "").toLowerCase();
            return status === "active";
        }).length;

        return Math.round((aktif / totalPelanggan) * 100);
    }, [customers, totalPelanggan]);

    const revenueData = useMemo(() => {
        const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
        const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            return {
                key: date.toISOString().slice(0, 10),
                label: dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1],
                value: 0
            };
        });

        transactions.forEach((transaction) => {
            const rawDate = transaction.date ?? transaction.createdAt ?? transaction.tanggal ?? transaction.transaksiTerakhir;
            if (!rawDate) {
                return;
            }

            const parsedDate = new Date(rawDate);
            if (Number.isNaN(parsedDate.getTime())) {
                return;
            }

            const key = parsedDate.toISOString().slice(0, 10);
            const matchedDay = lastSevenDays.find((day) => day.key === key);

            if (matchedDay) {
                matchedDay.value += getTransactionAmount(transaction);
            }
        });

        return lastSevenDays.map((day) => ({
            name: day.label,
            pendapatan: day.value
        }));
    }, [transactions]);

    const bestSellers = useMemo(() => {
        if (!products.length) {
            return [
                {
                    title: "Belum ada data",
                    author: "Produk",
                    sales: 0,
                    color: "bg-slate-400"
                },
                {
                    title: "Belum ada data",
                    author: "Produk",
                    sales: 0,
                    color: "bg-slate-400"
                },
                {
                    title: "Belum ada data",
                    author: "Produk",
                    sales: 0,
                    color: "bg-slate-400"
                }
            ];
        }

        return products.slice(0, 3).map((product, index) => ({
            title: product.name ?? product.title ?? `Produk ${index + 1}`,
            author: product.author ?? product.penulis ?? "Tanpa penulis",
            sales: Number(product.sold ?? product.sales ?? product.terjual ?? 0),
            color: index % 2 === 0 ? "bg-red-500" : index === 1 ? "bg-blue-500" : "bg-cyan-500"
        }));
    }, [products]);

    const activities = useMemo(() => {
        const items = [];

        if (transactions.length) {
            items.push({
                icon: "💰",
                text: `${transactions.length} transaksi tercatat`,
                time: "Baru saja",
                color: "bg-green-50"
            });
        }

        if (preorders.length) {
            items.push({
                icon: "📦",
                text: `${preorders.length} pre-order aktif`,
                time: "Perlu dipantau",
                color: "bg-orange-50"
            });
        }

        if (customers.length) {
            items.push({
                icon: "👤",
                text: `${customers.length} pelanggan terdaftar`,
                time: "Data terbaru",
                color: "bg-blue-50"
            });
        }

        if (!items.length) {
            items.push({
                icon: "📊",
                text: "Belum ada data aplikasi",
                time: "0 data",
                color: "bg-slate-50"
            });
        }

        return items;
    }, [customers, preorders, transactions]);

    const crmHighlights = [
        {
            title: "Pelanggan VIP",
            value: pelangganVIP.toString()
        },
        {
            title: "Retention",
            value: `${retention}%`
        },
        {
            title: "Pre-order",
            value: preorders.length.toString()
        },
        {
            title: "Total Order",
            value: totalOrder.toString()
        }
    ];

    return (
        <div className="w-full">
            <div className="mx-auto w-full max-w-7xl space-y-4">
               <div className="flex items-center justify-between">
    <PageHeader title="Dashboard TokoBuku Cendakia" />

    <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
    >
        <FaSignOutAlt />
        Logout
    </button>
</div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_0.8fr]">
                    <div className="space-y-4">
                        <SectionCard>
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-slate-400">
                                        Total Pendapatan
                                    </p>
                                    <h2 className="mt-1 text-3xl font-black text-slate-800">
                                        Rp {totalPendapatan.toLocaleString("id-ID")}
                                    </h2>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                                            <FaArrowUp size={10} />
                                            0%
                                        </span>
                                        <span className="text-[11px] text-slate-400">
                                            berdasarkan data transaksi
                                        </span>
                                    </div>
                                </div>

                                <button className="rounded-2xl bg-indigo-50 px-5 py-2.5 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-100">
                                    Lihat Detail
                                </button>
                            </div>

                            <div className="mt-6 h-[260px]">
                                <RevenueChart data={revenueData} />
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800">
                                    Buku Terlaris
                                </h3>
                                <FaEllipsisV className="text-slate-300" />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

                    <div className="space-y-4">
                        <SectionCard>
                            <h3 className="mb-2 text-lg font-bold text-slate-800">
                                Ringkasan Operasional
                            </h3>
                            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
                                Data aplikasi
                            </p>

                            <TransactionCircle />

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <StatCard title="Pelanggan" value={totalPelanggan.toLocaleString("id-ID")} />
                                <StatCard title="Buku Terjual" value={totalBukuTerjual.toLocaleString("id-ID")} />
                            </div>

                            <div className="mt-4 space-y-3">
                                {crmHighlights.map((item) => (
                                    <div key={item.title} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                        <span className="text-sm font-semibold text-slate-500">{item.title}</span>
                                        <span className="text-sm font-black text-slate-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800">
                                    Aktivitas Terkini
                                </h3>
                                <button className="text-[10px] font-bold text-indigo-600">
                                    Lihat Semua
                                </button>
                            </div>

                            <div className="space-y-5">
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
        </div>
    );
}