import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import Table from "../components/Table";
import CustomerRow from "../components/CustomerRow";
import Pagination from "../components/Pagination";

export default function Customers() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState(() => {

        const savedData =
            localStorage.getItem("customersList");

        return savedData
            ? JSON.parse(savedData)
            : [
                {
                    id: 1,
                    name: "Andi Pratama",
                    email: "andi@email.com",
                    totalOrder: 5,
                    status: "Active"
                },
                {
                    id: 2,
                    name: "Budi Santoso",
                    email: "budi@email.com",
                    totalOrder: 3,
                    status: "Inactive"
                },
                {
                    id: 3,
                    name: "Citra Dewi",
                    email: "citra@email.com",
                    totalOrder: 12,
                    status: "Active"
                },
                {
                    id: 4,
                    name: "Dian Ayu",
                    email: "dian@email.com",
                    totalOrder: 2,
                    status: "Active"
                }
            ];
    });

    useEffect(() => {

        const handleStorageChange = () => {

            const savedData =
                localStorage.getItem("customersList");

            if (savedData) {
                setCustomers(JSON.parse(savedData));
            }
        };

        window.addEventListener(
            "storage",
            handleStorageChange
        );

        return () =>
            window.removeEventListener(
                "storage",
                handleStorageChange
            );

    }, []);

    const headers = [
        "Pelanggan",
        "Kontak",
        "Total Order",
        "Status",
        "Aksi"
    ];

    return (
        <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        Database Pelanggan
                    </h1>

                    <p className="text-sm text-gray-400 font-medium">
                        Kelola data pelanggan setia Toko Cendakia
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <SearchInput
                        placeholder="Cari nama atau email..."
                    />

                    <Button
                        type="primary"
                        onClick={() =>
                            navigate("/customers/add")
                        }
                        className="flex items-center gap-2 shadow-lg shadow-indigo-100"
                    >
                        <FaUserPlus size={14} />
                        Tambah Pelanggan
                    </Button>

                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">

                <Table headers={headers}>

                    {customers.map((customer, index) => (
                        <CustomerRow
                            key={customer.id}
                            customer={customer}
                            index={index}
                        />
                    ))}

                </Table>

                {/* Footer */}
                <div className="px-8 py-6 bg-slate-50/50 flex justify-between items-center border-t border-gray-50">

                    <p className="text-[11px] text-gray-400 font-bold uppercase">
                        Total Database:
                        {" "}
                        {customers.length}
                        {" "}
                        Pelanggan
                    </p>

                      <Pagination />

                </div>

            </div>

        </div>
    );
}