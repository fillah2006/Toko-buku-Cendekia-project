import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      <button 
        onClick={handleLogout}
        className="flex items-center text-red-500 hover:text-red-700 font-medium"
      >
        <FiLogOut className="mr-2" /> Logout
      </button>
    </header>
  );
}