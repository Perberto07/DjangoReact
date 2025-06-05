import { ShoppingBag, Users, PlusCircle, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Clear Axios auth header if you are using axios globally
    // import axios from 'axios'; at the top if not already
    // axios.defaults.headers.common['Authorization'] = null;

    // Redirect to login page
    navigate('/login');
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
        <div className="sm:ml-9 pt-5 pl-6 mb-5 text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>

        <nav>
          <ul className="space-y-4 pl-6">
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <ShoppingBag size={18} />
              Reports
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <Users size={18} />
              Transaction
            </li>
            <li
              className="flex items-center gap-2 hover:text-blue-400 cursor-pointer"
              onClick={handleLogout}
            >
              <PlusCircle size={18} />
              Logout
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
