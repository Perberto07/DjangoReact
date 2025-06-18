import {
  FileCog,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ChartSpline,
  Home,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <>
      {/* Toggle Button - Mobile Only */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-gray-300 bg-gray-800 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        h-screen w-56 bg-gray-800 text-white shadow-lg z-40 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:relative
      `}
      >
        <div className="pt-5 pl-6 mb-5 text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>

        <nav className="overflow-y-auto h-full">
          <ul className="space-y-4 pl-6 pr-4 pb-10">
            <li className="flex items-center gap-2 hover:text-blue-400">
              <Home size={18} />
              <Link to="/home">Home</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ChartSpline size={18} />
              <Link to="/dashboard/report">Reports</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <FileCog size={18} />
              Manage
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ShoppingCart size={18} />
              <Link to="/dashboard/transaction-panel">Transaction</Link>
            </li>
            <li
              className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
