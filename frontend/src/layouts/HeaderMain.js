import React, { useState } from 'react';
import { ShoppingBag, Users, ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeaderMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-16 bg-white shadow-md relative">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Header ng Store</h1>

        {/* Toggle Button for Mobile */}
        <button
          className="sm:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-6">
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ShoppingBag size={16} />
              <Link to="/product">Product</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <Users size={16} />
              <Link to="/customer">Customer</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ShoppingCart size={16} />
              <Link to="/transaction">Transaction</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <LogIn size={16} />
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <nav className="sm:hidden absolute top-full left-0 w-full bg-[#F4F1F8] shadow-lg z-50">
          <ul className="flex flex-col px-6 py-4 space-y-4 items-end text-right">
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ShoppingBag size={16} />
              <Link to="/product">Product</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <Users size={16} />
              <Link to="/customer">Customer</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <ShoppingCart size={16} />
              <Link to="/transaction  ">Transaction</Link>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400">
              <LogIn size={16} />
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default HeaderMain;
