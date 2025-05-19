// layout/MainLayout.js
import React from 'react';
import Footer from '../components/Footer';
import HeaderMain from '../components/HeaderMain';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen scroll-m-5">
      <HeaderMain />
      <main className="bg-[#F2F8FC] flex-grow p-4 sm:p-6">
        {children}
      </main>

      <Footer theme="dark" />
    </div>
  );
};

export default MainLayout;
