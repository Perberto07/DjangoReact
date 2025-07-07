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

      await createProduct(dataToSend);
      setFormData({
        product_name: '',
        product_category: '',
        product_price: '',
        product_barcode: '', // clear barcode after submission
      });

      toast.success("Product Added Successfully!");
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-700">Add Product</h2>

      {message && <p className="text-center text-red-500 text-sm mb-2">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md space-y-4"
      >
        {/* Barcode Scanner */}
        <div className="bg-gray-50 p-3 rounded border border-blue-200">
          <div className="flex flex-col items-center">
            <BarcodeScanner onScanned={handleBarcodeScanned} />
            <input
              type="text"
              name="product_barcode"
              placeholder="Scanned barcode"
              value={formData.product_barcode}
              onChange={handleChange}
              required
              className="mt-2 w-full px-3 border rounded-md text-sm"
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="product_category"
            value={formData.product_category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md text-sm"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="submit" className="w-full flex items-center justify-center gap-2 py-2">
          <span>Submit</span>
          <ArrowRightToLine size={18} />
        </Button>
      </form>

      <ToastContainer richColor position="top-center" autoClose={3000} />
    </div>
  );

};

export default AddProduct;