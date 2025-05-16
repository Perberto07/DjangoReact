// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/ProductServices';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h2 className='pb-5'>Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              <p>Product Name: {product.product_name}</p>
              <p>Product Category: {product.product_category}</p>
              <p>Product Price: {product.product_price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;