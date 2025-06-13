import { useState } from 'react';
import CustomerPanel from './CustomerPanel';
import MainLayout from '../../layouts/MainLayout';
import AddCustomer from './AddCustomer';
import {UserPlus, UserCog } from 'lucide-react';

const Customer = () => {
  const [activePanel, setActivePanel] = useState('product');

  const renderPanel = () => {
    switch (activePanel) {
      case 'add_customer':
        return <AddCustomer />;
      case 'customerpanel':
        return <CustomerPanel />;
      default:
        return <CustomerPanel /> ;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="flex justify-end space-x-3 text-center mr-5">
          <li onClick={() => setActivePanel('add_customer')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1  cursor-pointer hover:text-blue-500">
            <UserPlus size={18}/>
            <span>Customer</span>
          </li>
          <li onClick={() => setActivePanel('customerpanel')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1  cursor-pointer hover:text-blue-500">
             <UserCog  size={18}/>
            <span>Customer</span>
          </li>
        </ul>
        <main className="flex-grow p-6">
            {renderPanel()}
        </main>
    </MainLayout>
    </>
  );
};

export default Customer;
