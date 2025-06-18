import { FileCog, ShoppingCart, LogOut, Menu, X, ChartSpline, Home } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/');
      } catch (error) {
        console.error("error Logging out:", error);
      }
    };
  };

  return (
    <>
      {/* Toggle Button - Visible only on mobile */}
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
          fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg z-40 
          w-56 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:h-screen
        `}
      >
        <div className="md:ml-0 ml-9 pt-5 pl-6 mb-5 text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>

        <nav>
          <ul className="space-y-4 pl-6">
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <Home size={18} />
              <Link to="/home">Home</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <ChartSpline size={18} />
              Reports
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <FileCog size={18} />
              Manage
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
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
