// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { createCustomer } from '../../services/CustomerServices';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_address: '',
    customer_number: '',
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
      await createCustomer(formData);
      setMessage('Product added successfully!');
      setFormData({
        customer_name: '',
        customer_address: '',
        customer_number: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div>
      <h2>Add Customer</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer_name"
          placeholder="Name"
          value={formData.customer_name}
          onChange={handleChange}
        /><br />

        <textarea
          name="customer_address"
          placeholder="Address"
          value={formData.customer_address}
          onChange={handleChange}
        ></textarea>
        <br />  

        <input
          type="number"
          name="customer_number"
          placeholder="Phone Number"
          value={formData.customer_number}
          onChange={handleChange}
        /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddCustomer;
