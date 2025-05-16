// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { createProduct } from '../../services/ProductServices';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_price: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(formData);
      setMessage('Product added successfully!');
      setFormData({
        product_name: '',
        product_category: '',
        product_price: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleChange}
          required
        /><br />

        <textarea
          name="product_category"
          placeholder="Product Category"
          value={formData.product_category}
          onChange={handleChange}
          required
        ></textarea><br />

        <input
          type="number"
          name="product_price"
          placeholder="Price"
          value={formData.product_price}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
