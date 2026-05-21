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
  FaLayerGroup
} from "react-icons/fa";

import logo from "../assets/logo.png";

export default function Sidebar() {

  const location = useLocation();

  // =========================
  // MAIN MENU
  // =========================
  const mainMenu = [

    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />
    },

    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
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

    // COMPONENT UI
    {
      name: "Components",
      path: "/components",
      icon: <FaLayerGroup />
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
          className={`flex items-center gap-4 px-8 py-3.5 transition-all duration-300 font-bold text-sm rounded-l-2xl
          
          ${isActive
              ? "bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600"
              : "text-gray-400 hover:text-gray-600 hover:bg-slate-50"
            }`}
        >

          <span
            className={`text-lg transition-all
              
              ${isActive
                ? "text-indigo-600"
                : "text-gray-300"
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

    <div className="w-64 bg-white border-r border-gray-100 min-h-screen fixed h-full flex flex-col py-6">

      {/* ========================= */}
      {/* LOGO */}
      {/* ========================= */}
      <div className="mb-10 px-4 flex justify-center items-center">

        <img
          src={logo}
          alt="Logo Utama Cendakia"
          className="h-32 w-full object-contain drop-shadow-sm transition-transform duration-500 hover:scale-105"
        />

      </div>

      {/* ========================= */}
      {/* NAVIGATION */}
      {/* ========================= */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide">

        {/* MAIN MENU */}
        <div className="mb-10">

          <p className="px-8 text-[10px] font-black text-gray-300 mb-4 uppercase tracking-[0.2em]">

            Menu Utama

          </p>

          <ul className="space-y-1">

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

          <p className="px-8 text-[10px] font-black text-gray-400 mb-4 uppercase tracking-[0.2em]">

            Lainnya

          </p>

          <ul className="space-y-1">

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
      <div className="px-8 mt-auto pt-6 border-t border-gray-50">

        <div className="bg-slate-50 p-4 rounded-2xl">

          <p className="text-[10px] font-bold text-slate-400 uppercase">

            Versi Aplikasi

          </p>

          <p className="text-xs font-black text-slate-800 tracking-tight">

            Cendakia Pro v2.0

          </p>

        </div>

      </div>

    </div>
  );
}