/*import Header from '../components/Header';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation'*/

const MainLayout = ({ children }) => {
  return (
    <>
      <main className="min-h-screen p-4">{children}</main>
    </>
  );
};

export default MainLayout;