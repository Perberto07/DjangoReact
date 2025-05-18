// src/components/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { createProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices'; // make sure path is correct

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_price: '',
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

        {/* Category dropdown */}
        <select
          name="product_category"
          value={formData.product_category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}
        </select><br />

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
