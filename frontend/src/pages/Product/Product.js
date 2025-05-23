import { useState } from 'react';
import ProductList from './ProductList';
import ProductPanel from './ProductPanel';
import MainLayout from '../../layouts/MainLayout';
import AddProduct from './AddProduct';
import { CirclePlus,ListCheck,SquarePen } from 'lucide-react';

const Product = () => {
  const [activePanel, setActivePanel] = useState('product');

  const renderPanel = () => {
    switch (activePanel) {
      case 'productlist':
        return <ProductList />;
      case 'add_product':
        return <AddProduct />;
      case 'productpanel':
        return <ProductPanel />;
      default:
        return <ProductList />;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="flex flex-row items-center justify-evenly  space-x-   text-center">
          <li onClick={() => setActivePanel('productlist')} className="bg-white p-2 rounded-md shadow-md flex flex-row items-center space-x-1 cursor-pointer hover:text-blue-500">
            <ListCheck size={18}/>
            <span>Product</span>
          </li>
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
