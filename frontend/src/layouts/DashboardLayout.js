/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation'*/

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">Dark Theme Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
