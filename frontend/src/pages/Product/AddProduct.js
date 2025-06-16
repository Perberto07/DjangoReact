// src/components/AddProduct.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { createProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices';
import BarcodeScanner from "../BarcodeScanner";
import Button from '../../components/Button/button';
import { ArrowRightToLine } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_price: '',
    product_barcode: '',
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

  // CRITICAL FIX: Use useCallback to prevent function recreation
  const handleBarcodeScanned = useCallback((barcode) => {
    console.log("Scanned Barcode:", barcode);
    setFormData(prevData => ({ 
      ...prevData, 
      product_barcode: barcode 
    }));
  }, []); // Empty dependency array means this function never changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected category to get its name
    const selectedCategory = categories.find(cat => cat.id.toString() === formData.product_category);
    
    if (!formData.product_name || !formData.product_price || !selectedCategory) {
      setMessage('Please fill in all fields correctly.');
      return;
    }

    try {
      const dataToSend = {
        product_name: formData.product_name,
        product_price: parseFloat(formData.product_price),
        product_category: selectedCategory.category_name, // Send category name instead of ID
        product_barcode: formData.product_barcode, // Include barcode if needed
      };

      console.log("Sending to backend:", dataToSend);
      toast.success("Product Added Successfully!");

      await createProduct(dataToSend);
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
    <div className='max-w-screen-md flex flex-col items-center md:min-w-full'>
      <h2 className='py-2 font-extrabold size-16 flex flex-row items-center w-40 '>
        Add Product
      </h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} 
            className='bg-[#FDFDFD] p-10 shadow shadow-blue-500 border border-blue-200 hover:border-blue-500 rounded-md space-x-3 space-y-2'>
        <div className='space-y-1 flex flex-col items-center'>
          <BarcodeScanner onScanned={handleBarcodeScanned} />
          <input
            type="text"
            name="product_barcode"
            placeholder="Scan barcode"
            value={formData.product_barcode}
            onChange={handleChange}
          /><br />
        </div>

        <div className='flex flex-col grid-cols-2'>
          <label htmlFor="product_name">Product Name: </label>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
          />

          <label htmlFor="product_price">Price:</label>
          <input
            type="number"
            name="product_price"
            placeholder="Price"
            value={formData.product_price}
            onChange={handleChange}
            required
            className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
          />
          {/* Category dropdown */}
          <label htmlFor="product_category">Category:</label>
          <select
            name="product_category"
            value={formData.product_category}
            onChange={handleChange}
            required
            className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <Button variant='submit' className='flex flex-row items-center gap-2'>
          <span>Submit</span>
          <ArrowRightToLine size={18} />
        </Button>
      </form>
      <ToastContainer richColor position='top-center' autoClose={3000} />
    </div>
  );
};

export default AddProduct;