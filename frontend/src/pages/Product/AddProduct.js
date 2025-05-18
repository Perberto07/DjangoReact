// src/components/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { createProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices'; // make sure path is correct
import BarcodeScanner from "./BarcodeScanner";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_price: '',
    product_barcode: '', // <-- Add this line
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



  const handleBarcodeScanned = (barcode) => {
    console.log("Scanned Barcode:", barcode); // keep this
    setFormData({ ...formData, product_barcode: barcode });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryId = parseInt(formData.product_category, 10);

    if (!formData.product_name || !formData.product_price || !categoryId) {
      setMessage('Please fill in all fields correctly.');
      return;
    }

    try {
      const dataToSend = {
        product_name: formData.product_name,
        product_price: parseFloat(formData.product_price),
        product_category: categoryId,
      };

      console.log("Sending to backend:", dataToSend);

      await createProduct(dataToSend);
      setMessage('Product added successfully!');
      setFormData({
        product_name: '',
        product_category: '',
        product_price: '',
        product_barcode: '', // clear barcode after submission
      });
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
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
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category_name}
            </option>
          ))}

        </select>

        <BarcodeScanner onScanned={handleBarcodeScanned} />
        <input
          type="text"
          name="product_barcode"
          placeholder="Scan barcode"
          value={formData.product_barcode}
          onChange={handleChange}
        />

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
