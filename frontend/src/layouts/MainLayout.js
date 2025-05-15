/*import Header from '../components/Header';
import Navigation from '../components/Navigation'*/
import Footer from "../components/Footer";

// layout/MainLayout.js
const MainLayout = ({ children }) => {
  return (
    <>
      <header className="p-4 bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold">Store</h1>
      </header>

      <main  className="min-h-screen bg-white text-gray-900">
        {children}
      </main>
 
      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default MainLayout;
