import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "../components";

import {
  FaBars,
  FaHeart,
  FaCircle
} from "react-icons/fa";

export default function MainLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (

    <div className="relative flex min-h-screen overflow-hidden bg-transparent text-slate-700">

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_25%)]" />

      {/* ========================= */}
      {/* MOBILE OVERLAY */}
      {/* ========================= */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/45 transition-opacity duration-300 md:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 transform border-r border-white/60 bg-white/80 shadow-[12px_0_40px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      {/* ========================= */}
      {/* MAIN CONTENT */}
      {/* ========================= */}
      <div className="flex min-h-screen flex-1 flex-col overflow-x-hidden">

        <div className="border-b border-white/70 bg-white/70 px-4 py-3 backdrop-blur-xl md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-black uppercase tracking-[0.3em] text-slate-600">TokoBuku</div>

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            >
              <FaBars className="text-lg" />
              <span className="sr-only">Buka menu</span>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <main className="flex-1 p-3 md:p-5 lg:p-6">

          <div className="mx-auto w-full max-w-7xl">
            <div className="rounded-[32px] border border-white/70 bg-white/80 p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-5 lg:p-6">
              <Outlet />
            </div>
          </div>

        </main>

        {/* ========================= */}
        {/* FOOTER */}
        {/* ========================= */}
        <footer className="mt-auto border-t border-slate-200/70 bg-white/70 px-6 py-6 backdrop-blur-sm md:px-10">

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 lg:flex-row">

            {/* LEFT */}
            <div className="text-center lg:text-left">

              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">

                © {currentYear}

                {" "}

                <span className="text-indigo-600">

                  Toko Buku Cendakia

                </span>

              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">

                Inventory & Customer Management System v2.0.4

              </p>

            </div>

            {/* CENTER */}
            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 xl:flex">

              Built with

              <FaHeart className="animate-pulse text-red-400" />

              for productivity

            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-5">

              {/* STATUS */}
              <div className="flex items-center gap-2">

                <FaCircle className="animate-pulse text-[8px] text-emerald-500" />

                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">

                  System Online

                </span>

              </div>

              {/* DIVIDER */}
              <div className="h-4 w-[1px] bg-slate-200"></div>

              {/* BUTTON */}
              <button className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-500 transition-all duration-300 hover:text-indigo-700">

                Pusat Bantuan

              </button>

            </div>

          </div>

        </footer>

      </div>

    </div>
  );
}