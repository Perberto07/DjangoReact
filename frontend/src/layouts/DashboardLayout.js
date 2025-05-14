/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation'*/

const DashboardLayout = ({ children }) => {
  return (
    <>
      <main className="min-h-screen p-4">{children}</main>
    </>
  );
};

export default DashboardLayout;