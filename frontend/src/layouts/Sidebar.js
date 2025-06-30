import {
  FileCog,
  ShoppingCart,
  LogOut,
  ChartSpline,
  Home,
  CircleUser,
} from "lucide-react";
//import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
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
    <aside
      className={`
    text-white 
    transform transition-transform duration-300 ease-in-out
    fixed left-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 md:relative md:static
  `}
    >
      <nav className="overflow-y-auto h-full">
        <ul className="space-y-4 pl-6 pr-4 pb-10 pt-6 ">
          <li className="flex items-center gap-2 hover:text-blue-400 bg-gray-900 p-2 rounded shadow-sm shadow-blue-400  "
              title="Home">
            <Link to="/home">
              <Home size={18} />
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 bg-gray-900 p-2 rounded shadow-sm shadow-blue-400 "
              title="Chart">
            <Link to="/dashboard/report">
              <ChartSpline size={18} />
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 bg-gray-900 p-2 rounded shadow-sm shadow-blue-400"
              title="Category">
            <Link to="/dashboard/category">
              <FileCog size={18} />
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 bg-gray-900 p-2 rounded shadow-sm shadow-blue-400"
              title="User">
            <Link to="/dashboard/user">
              <CircleUser size={18} />
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 bg-gray-900 p-2 rounded shadow-sm shadow-blue-400"
              title="Transaction Panel">
            <Link to="/dashboard/transaction-panel">
              <ShoppingCart size={18} />
            </Link>
          </li>
          <li
            className="flex items-center gap-2 hover:text-blue-400 cursor-pointer bg-gray-900 p-2 rounded shadow-sm shadow-blue-400"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut size={18} />
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
