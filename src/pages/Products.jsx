import React from "react";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaSearch
} from "react-icons/fa";

import { Link } from "react-router-dom";

const dummyProducts = [
    {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        price: "Rp 85.000",
        stock: 20,
        category: "Novel",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUCQ8rYbCUia0D2P7xr9Jh9z922eROSBcMQ&s"
    },
    {
        id: 2,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        price: "Rp 95.000",
        stock: 5,
        category: "Sejarah",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtAo1fHoWNFh27t76-sNsWVXC71T75a_tOg&s"
    },
    {
        id: 3,
        title: "Negeri 5 Menara",
        author: "Ahmad Fuadi",
        price: "Rp 78.000",
        stock: 30,
        category: "Inspiratif",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAu1Acasfw641aOoYAIbTGzOP6WKpobqn6Q&s"
    },
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        price: "Rp 120.000",
        stock: 0,
        category: "Self-Dev",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKXJh0Z-C0VMF79lHCo12udelN0zgG-DReQ&s"
    },
];

export default function Products() {

    return (
        <div className="w-full">
            <div className="mx-auto w-full space-y-4 md:space-y-5">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Koleksi Buku
                    </h1>

                    <p className="text-sm text-gray-400 font-medium">
                        Kelola stok dan harga buku Toko Cendakia
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                    <div className="relative w-full sm:w-auto">

                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />

                        <input
                            type="text"
                            placeholder="Cari buku..."
                            className="pl-10 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64"
                        />

                    </div>

                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">

                        <FaPlus size={12} />

                        Tambah Buku

                    </button>

                </div>

            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
                <div className="max-h-[65vh] overflow-auto">
                    <table className="min-w-[720px] w-full border-collapse text-left">

                    <thead>
                        <tr className="border-b border-gray-50">

                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                Buku
                            </th>

                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                Kategori
                            </th>

                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                Harga
                            </th>

                            <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                                Stok
                            </th>

                            <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">
                                Aksi
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">

                        {dummyProducts.map((product) => (

                            <tr
                                key={product.id}
                                className="hover:bg-slate-50/50 transition-colors group"
                            >

                                {/* Buku */}
                                <td className="px-8 py-5">

                                    <div className="flex items-center gap-4">

                                        {/* Gambar */}
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                            className="w-12 h-16 object-cover rounded-lg border border-gray-100 shadow-sm"
                                        />

                                        <div>

                                            {/* Dynamic Route */}
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="font-bold text-slate-800 text-sm hover:text-indigo-600 transition-colors"
                                            >
                                                {product.title}
                                            </Link>

                                            <p className="text-[11px] text-gray-400 font-medium">
                                                {product.author}
                                            </p>

                                        </div>

                                    </div>

                                </td>

                                {/* Kategori */}
                                <td className="px-6 py-5">

                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-tight">
                                        {product.category}
                                    </span>

                                </td>

                                {/* Harga */}
                                <td className="px-6 py-5">

                                    <p className="text-sm font-black text-slate-800">
                                        {product.price}
                                    </p>

                                </td>

                                {/* Stock */}
                                <td className="px-6 py-5">

                                    <div className="flex flex-col gap-1">

                                        <div className="flex items-center gap-2">

                                            <div
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    product.stock > 10
                                                        ? "bg-green-500"
                                                        : product.stock > 0
                                                        ? "bg-orange-500"
                                                        : "bg-red-500"
                                                }`}
                                            />

                                            <span className="text-sm font-bold text-slate-700">
                                                {product.stock > 0
                                                    ? `${product.stock} pcs`
                                                    : "Pre-order"}
                                            </span>

                                        </div>

                                        <p className="text-[10px] text-gray-400 font-medium">
                                            {product.stock > 0
                                                ? "Tersedia"
                                                : "Pre-order tersedia"}
                                        </p>

                                    </div>

                                </td>

                                {/* Aksi */}
                                <td className="px-8 py-5">

                                    <div className="flex items-center justify-end gap-2">

                                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                                            <FaEdit size={16} />
                                        </button>

                                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                            <FaTrash size={16} />
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

        </div>
        </div>
    );
}