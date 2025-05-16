import { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerPanel from './CustomerPanel';
import MainLayout from '../../layouts/MainLayout';
import AddCustomer from './AddCustomer';

const Customer = () => {
  const [activePanel, setActivePanel] = useState('product');

  const renderPanel = () => {
    switch (activePanel) {
      case 'customerlist':
        return <CustomerList />;
      case 'add_customer':
        return <AddCustomer />;
      case 'customerpanel':
        return <CustomerPanel />;
      default:
        return <div>Select a panel</div>;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="flex flex-row items-center space-x-4">
          <li onClick={() => setActivePanel('customerlist')} className="cursor-pointer hover:text-blue-500">Customer List</li>
          <li onClick={() => setActivePanel('add_customer')} className="cursor-pointer hover:text-blue-500">Add Customer</li>
          <li onClick={() => setActivePanel('customerpanel')} className="cursor-pointer hover:text-blue-500">Customer Panel</li>
        </ul>

        <main className="flex-grow p-6">
            {renderPanel()}
        </main>
    </MainLayout>
    </>
  );
};

export default Customer;
