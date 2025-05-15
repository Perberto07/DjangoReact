// components/HeaderMain.js

import Navigation from "./Navigation";

const HeaderMain = () => {
  return (
    <header className="w-auto h-16 bg-white shadow-md flex items-center justify-around px-6">
      <h1 className="text-xl font-semibold text-gray-800">Header ng Store</h1>
      <Navigation/>
    </header>
  );
};

export default HeaderMain;
