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
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-6">

            {/* LEFT */}
            <div className="flex-1">

                <h1 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight tracking-tight max-w-xl">

                    {title}

                </h1>

                <p className="mt-2 text-sm text-gray-400 font-medium leading-relaxed">

                    Selamat datang kembali di sistem manajemen{" "}

                    <span className="text-indigo-600 font-bold">
                        TokoBuku Cendakia
                    </span>

                </p>

            </div>

            {/* RIGHT */}
            {isDashboard && (

                <div className="flex items-center">

                    {/* DATE CARD */}
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all">

                        {/* ICON */}
                        <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">

                            <FaCalendarAlt size={16} />

                        </div>

                        {/* TEXT */}
                        <div>

                            <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">

                                Hari Ini

                            </p>

                            <h3 className="text-sm font-black text-slate-700 leading-tight">

                                {today}

                            </h3>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}