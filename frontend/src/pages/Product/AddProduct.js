// src/components/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { createProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices';
import BarcodeScanner from "./BarcodeScanner";
import Button from '../../components/Button/button';
import { ArrowRightToLine } from 'lucide-react';

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
    <div className='max-w-screen-md flex flex-col items-center md:min-w-full'>
      <h2 className='py-2 font-extrabold size-16 flex flex-row items-center w-40 '>
        Add Product
      </h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className='bg-[#FDFDFD] p-10 shadow-md rounded-md space-x-3 space-y-2'>
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
          <label for="product_name">Product Name: </label>
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className='p-2 rounded-md border border-gray-300 hover:border-blue-500'
          />

          <label for="product_price">Price:</label>
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
          <label for="product_categoty">Category:</label>
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
    </div>
  );
};

export default AddProduct;
