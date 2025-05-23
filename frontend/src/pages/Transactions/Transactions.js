import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { CirclePlus,ListCheck } from 'lucide-react';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const Product = () => {
  const [activePanel, setActivePanel] = useState('product');

  const renderPanel = () => {
    switch (activePanel) {
      case 'transaction_list':
        return <TransactionList />;
      case 'add_transaction':
        return <AddTransaction />;
      default:
        return <TransactionList/>;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="flex flex-row items-center justify-evenly  space-x-   text-center">
          <li onClick={() => setActivePanel('transaction_list')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1 cursor-pointer hover:text-blue-500">
            <ListCheck size={18}/>
            <span>Transactions</span>
          </li>
          <li onClick={() => setActivePanel('add_transaction')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1 cursor-pointer hover:text-blue-500">
            <CirclePlus size={18}/>
            <span>Transaction</span>
          </li>
        </ul>
        
        <main className="flex-grow p-6">
            {renderPanel()}
        </main>
    </MainLayout>
    </>
  );
};

export default Product;
