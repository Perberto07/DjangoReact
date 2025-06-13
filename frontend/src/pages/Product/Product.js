import { useState } from 'react';
import ProductPanel from './ProductPanel';
import MainLayout from '../../layouts/MainLayout';
import AddProduct from './AddProduct';
import { CirclePlus,SquarePen } from 'lucide-react';

const Product = () => {
  const [activePanel, setActivePanel] = useState('product');

  const renderPanel = () => {
    switch (activePanel) {
      case 'add_product':
        return <AddProduct />;
      case 'productpanel':
        return <ProductPanel />;
      default:
        return <ProductPanel />;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="flex justify-end space-x-3 text-center mr-5">
          <li onClick={() => setActivePanel('add_product')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1 cursor-pointer hover:text-blue-500">
            <CirclePlus size={18}/>
            <span>Product</span>
          </li>
          <li onClick={() => setActivePanel('productpanel')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1 cursor-pointer hover:text-blue-500">
            <SquarePen  size={18}/>
            <span>Product</span>
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
