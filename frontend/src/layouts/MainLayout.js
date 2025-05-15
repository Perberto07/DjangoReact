// layout/MainLayout.js
import React from 'react';
import HeaderMain from '../components/HeaderMain'; // adjust path as needed
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <HeaderMain />
      <main className="flex-grow p-6">
        {children}
      </main>
      <Footer theme="dark" />
    </div>
  );
};

export default MainLayout;
