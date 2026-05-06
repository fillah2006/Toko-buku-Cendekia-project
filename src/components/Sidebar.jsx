import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";
// 1. Impor file logo Anda (Pastikan file berada di src/assets/logo.png)
import logo from "../assets/logo.png"; 

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Customers", path: "/customers", icon: <FaUsers /> },
    { name: "Products", path: "/products", icon: <FaBox /> },
    { name: "Transactions", path: "/transactions", icon: <FaShoppingCart /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-5">
      
      {/* 2. Logo menggantikan teks Tokobuku. */}
      <div className="mb-8 px-2">
        <img 
          src={logo} 
          alt="TokoBuku Cendekia" 
          className="w-full h-auto object-contain" 
        />
      </div>

      <ul className="space-y-3">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition font-medium
                ${
                  location.pathname === item.path
                    ? "bg-red-500 text-white shadow-sm" 
                    : "text-gray-600 hover:bg-red-50 hover:text-red-600"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}