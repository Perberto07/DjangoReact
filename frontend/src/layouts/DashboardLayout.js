import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="min-h-screen w-full flex-col  bg-[#1E3E62] text-gray-100 ">
      <header className='w-full min-h-16 sticky top-0 bg-black z-50 flex items-center justify-between px-4 shadow'>
        {/* Toggle Button */}
        <button
          className="md:hidden text-gray-300 bg-gray-900 p-1 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="toggle navigation"
        >
          {isOpen ? <X size={20} color='white'/> : <Menu size={20} color='white'/>}
        </button>

        <h1 className='text-2xl font-bold text-center w-full pr-10 text-white'>Dashboard</h1>
      </header>

      <div className='flex overflow-x-auto'>
        <Sidebar isOpen={isOpen} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
      </div>
      <footer
        className='w-full p-4 text-center text-sm bg-gray-500'
      >
        © {new Date().getFullYear()} John Patrick R. Boleche
      </footer>
      </>
    
  );
};

export default DashboardLayout;
