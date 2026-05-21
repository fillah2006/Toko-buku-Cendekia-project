import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
  FaHeart,
  FaCircle
} from "react-icons/fa";

export default function MainLayout() {

  const currentYear =
    new Date().getFullYear();

  return (

    <div className="flex min-h-screen bg-[#F8F9FD]">

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}
      <Sidebar />

      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}
      <div className="flex flex-col flex-1 ml-64 min-h-screen overflow-x-hidden">

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8 lg:p-10">

          <div className="max-w-7xl mx-auto">

            <Outlet />

          </div>

        </main>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}
        <footer className="mt-auto border-t border-gray-100 bg-white/70 backdrop-blur-sm px-6 md:px-10 py-6">

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">

            {/* LEFT */}
            <div className="text-center lg:text-left">

              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">

                © {currentYear}

                {" "}

                <span className="text-indigo-600">

                  Toko Buku Cendakia

                </span>

              </p>

              <p className="text-[10px] text-gray-300 font-semibold mt-1 uppercase tracking-wide">

                Inventory & Customer Management System v2.0.4

              </p>

            </div>

            {/* CENTER */}
            <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">

              Built with

              <FaHeart className="text-red-400 animate-pulse" />

              for productivity

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

              {/* STATUS */}
              <div className="flex items-center gap-2">

                <FaCircle className="text-green-500 text-[8px] animate-pulse" />

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">

                  System Online

                </span>

              </div>

              {/* DIVIDER */}
              <div className="w-[1px] h-4 bg-gray-200"></div>

              {/* BUTTON */}
              <button className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-500 hover:text-indigo-700 transition-all duration-300">

                Pusat Bantuan

              </button>

            </div>

          </div>

        </footer>

      </div>

    </div>
  );
}