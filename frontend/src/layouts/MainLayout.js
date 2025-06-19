// layout/MainLayout.js
import React from 'react';

import HeaderMain from './HeaderMain';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen scroll-m-5">
      <HeaderMain />
      <main className="bg-[#F2F8FC] flex-grow p-4 sm:p-6">
        {children}
      </main>

      <footer
        className='w-full p-4 text-center text-sm '
      >
        © {new Date().getFullYear()} John Patrick R. Boleche
      </footer>
    </div>
  );
};

export default MainLayout;
