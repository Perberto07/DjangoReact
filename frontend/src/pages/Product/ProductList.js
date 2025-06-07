// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/ProductServices';
import Cards from '../../components/card/Cards';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchProduct, setSearchProduct] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className='flex font-extrabold text-center pb-5'>Product List</h2>

      <div className='mb-4'>
        <input
          type="text"
          placeholder='Search products...'
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          className='w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

      </div>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {products
            .filter((product) =>
              product.product_name.toLowerCase().includes(searchProduct.toLowerCase())
            )
            .map((product) => (
              <li key={product.product_id}>
                <Cards className='border border-red-200 hover:border-red-500 rounded-md shadow-orange-400 '>
                  <p className="text-lg font-bold">{product.product_name}</p>
                  <p className="text-sm text-gray-600">Category: {product.product_category}</p>
                  <p className="text-sm text-gray-800 font-medium">Price: ₱{product.product_price}</p>
                  <p className="text-sm text-gray-800 font-medium">{product.product_category_name}</p>
                  <p className="text-sm text-gray-800 font-medium">QR code: {product.product_barcode}</p>
                </Cards>
              </li>
            ))}
        </ul>
      )
      }
    </div>
  );
};

export default ProductList;