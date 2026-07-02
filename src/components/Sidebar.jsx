import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaCog,
  FaCreditCard,
  FaUserAlt,
  FaQuestionCircle,
  FaTimes
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Sidebar({ closeSidebar }) {

  const location = useLocation();

  // =========================
  // MAIN MENU
  // =========================
  const mainMenu = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />
    },

    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
    },

    {
      name: "Users",
      path: "/users",
      icon: <FaUserAlt />
    },

    {
      name: "Products",
      path: "/products",
      icon: <FaBox />
    },

    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaShoppingCart />
    },

  ];

  // =========================
  // OTHER MENU
  // =========================
  const otherMenu = [

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />
    },

    {
      name: "Payment",
      path: "/payment",
      icon: <FaCreditCard />
    },

    {
      name: "Accounts",
      path: "/accounts",
      icon: <FaUserAlt />
    },

    {
      name: "Help",
      path: "/help",
      icon: <FaQuestionCircle />
    },

  ];

  // =========================
  // MENU ITEM
  // =========================
  const MenuItem = ({ item }) => {

    const isActive =
      location.pathname === item.path;

    return (
      <li>

        <Link
          to={item.path}
          onClick={() => closeSidebar?.()}
          className={`flex items-center gap-4 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-300 ${isActive
              ? "bg-white text-indigo-700 shadow-lg shadow-indigo-950/10"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
        >

          <span
            className={`text-lg transition-all ${isActive
                ? "text-indigo-600"
                : "text-slate-400"
              }`}
          >

            {item.icon}

          </span>

          {item.name}

        </Link>

      </li>
    );
  };

  return (

    <div className="flex h-full w-64 flex-col bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 py-6 text-white">

      {/* ========================= */}
      {/* LOGO */}
      {/* ========================= */}
      <div className="mb-8 flex items-center justify-between gap-4 px-4">

        <div className="rounded-[24px] border border-white/10 bg-white/10 p-2 backdrop-blur-sm">
          <img
            src={logo}
            alt="Logo Utama Cendakia"
            className="h-20 w-full max-w-[140px] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-105"
          />
        </div>

        {closeSidebar && (
          <button
            type="button"
            onClick={closeSidebar}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-200 shadow-sm transition hover:bg-white/20 md:hidden"
          >
            <FaTimes className="text-lg" />
            <span className="sr-only">Tutup menu</span>
          </button>
        )}

      </div>

      {/* ========================= */}
      {/* NAVIGATION */}
      {/* ========================= */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide">

        {/* MAIN MENU */}
        <div className="mb-8">

          <p className="mb-3 px-5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">

            Menu Utama

          </p>

          <ul className="space-y-1.5 px-2">

            {mainMenu.map((item, index) => (

              <MenuItem
                key={index}
                item={item}
              />

            ))}

          </ul>

        </div>

        {/* OTHER MENU */}
        <div>

          <p className="mb-3 px-5 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">

            Lainnya

          </p>

          <ul className="space-y-1.5 px-2">

            {otherMenu.map((item, index) => (

              <MenuItem
                key={index}
                item={item}
              />

            ))}

          </ul>

        </div>

      </nav>

      {/* ========================= */}
      {/* FOOTER */}
      {/* ========================= */}
      <div className="mt-auto border-t border-white/10 px-4 pt-6">

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">

            Versi Aplikasi

          </p>

          <p className="mt-1 text-sm font-black tracking-tight text-white">

            Cendakia Pro v2.0

          </p>

        </div>

      </div>

    </div>
  );
}