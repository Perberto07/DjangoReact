// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { createCustomer } from '../../services/CustomerServices';
import Button from '../../components/Button/button';
import {ArrowRightToLine} from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_address: '',
    customer_number: '',
  });


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
      setFormData({
        customer_name: '',
        customer_address: '',
        customer_number: '',
      });
      toast.success("Customer Added Successfully!");
    } catch (error) {
      console.error('Error adding product:', error);
      toast.warning('Failed to add product.');
    }
  };

  return (
    <div className='max-w-screen-md flex flex-col items-center md:min-w-full'>
      <h2 className='text-xl font-bold mb-3'>Customer Form</h2>
      <form onSubmit={handleSubmit}
            className='bg-[#FDFDFD] p-10 rounded-md shadow shadow-blue-500 space-x-3 space-y-2'>
         <div className='flex flex-col grid-cols-2'>
        <label for="customer_name">Name:</label>
        <input  
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
        /><br />

        <label for="customer_address">Addess:</label>
        <input
          name="customer_address"
          placeholder="Customer Address"
          value={formData.customer_address}
          onChange={handleChange}
          className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
        />
        <br/>  
        <label for="customer_address">Phone Number:</label>
        <input
          type="number"
          name="customer_number"
          placeholder="Phone Number"
          value={formData.customer_number}
          onChange={handleChange}
          className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
        /><br />
        </div>
        <div className='flex justify-center items-center'>
        <Button variant='submit'  className="flex flex-row justify-center items-center gap-1">
          <span>Submit</span>
          <ArrowRightToLine size={18} />
        </Button>
        </div>
      </form>
       <ToastContainer richColor position='top-center' autoClose={3000} />
    </div>
  );
};

export default AddCustomer;
