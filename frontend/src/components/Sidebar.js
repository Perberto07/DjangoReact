// components/Sidebar.js
import React from 'react';
import { ShoppingBag, Users, PlusCircle } from 'lucide-react'; // Optional: for icons

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white shadow-lg">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Dashboard
      </div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <ShoppingBag size={18} />
            Product
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <Users size={18} />
            Customer
          </li>
          <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
            <PlusCircle size={18} />
            Add Transaction
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
