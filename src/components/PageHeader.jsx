import React from "react";
import { useLocation } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";

export default function PageHeader({ title }) {

    const location = useLocation();

    const isDashboard =
        location.pathname === "/";

    // Format tanggal Indonesia
    const today = new Date().toLocaleDateString(
        "id-ID",
        {
            day: "numeric",
            month: "short",
            year: "numeric",
        }
    );

    return (
        <div className="mb-2 flex flex-col justify-between gap-3 md:mb-3 lg:flex-row lg:items-center">

            <div className="flex-1">
                <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600">
                    Toko Buku Cendakia
                </div>

                <h1 className="mt-3 max-w-xl text-3xl font-black leading-tight tracking-tight text-slate-800 md:text-4xl">
                    {title}
                </h1>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
                    Selamat datang kembali di sistem manajemen
                    <span className="ml-1 font-bold text-indigo-600">TokoBuku Cendakia</span>
                </p>
            </div>

            {isDashboard && (
                <div className="flex items-center">
                    <div className="flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                            <FaCalendarAlt size={16} />
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                                Hari Ini
                            </p>
                            <h3 className="text-sm font-black leading-tight text-slate-700">
                                {today}
                            </h3>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}