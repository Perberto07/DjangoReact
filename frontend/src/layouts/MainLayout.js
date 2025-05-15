/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation'*/

// layout/MainLayout.js
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Optional: Shared header or nav */}
      <header className="p-4 bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold">Main Layout</h1>
      </header>

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default MainLayout;
