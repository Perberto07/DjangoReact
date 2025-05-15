
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className='flex flex-row'>
        <aside>
          <Sidebar/>
        </aside>

        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
