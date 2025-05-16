import { useState } from 'react';
import ProductList from './ProductList';
import ProductPanel from './ProductPanel';
import MainLayout from '../../layouts/MainLayout';
import AddProduct from './AddProduct';

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
        return <div>Select a panel</div>;
    }
  };
  return (
    <>
    <MainLayout>
        <ul className="space-y-4">
          <li onClick={() => setActivePanel('productlist')} className="cursor-pointer hover:text-blue-500">Product List</li>
          <li onClick={() => setActivePanel('add_product')} className="cursor-pointer hover:text-blue-500">Add Product</li>
          <li onClick={() => setActivePanel('productpanel')} className="cursor-pointer hover:text-blue-500">Product Panel</li>
        </ul>
        
        <main className="flex-grow p-6">
            {renderPanel()}
        </main>
    </MainLayout>
    </>
  );
};

export default Product;
