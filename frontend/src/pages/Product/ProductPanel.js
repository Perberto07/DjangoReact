import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices'; // Import categories
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // New state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    product_name: '',
    product_price: '',
    product_category: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        await fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      product_name: product.product_name,
      product_price: product.product_price,
      product_category: product.product_category,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(editingProduct.product_id, editForm);
      setShowModal(false);
      setEditingProduct(null);
      await fetchProducts();
      toast.success("Product Modified Successfully!");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-6 bg-[#C6E7FF] min-h-screen rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Panel</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#FBFBFB] shadow-md">
          <thead className="bg-[#FFDDAE] text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.product_id} className="border-b hover:bg-[#D4F6FF]">
                <td className="py-2 px-4">{p.product_name}</td>
                <td className="py-2 px-4">₱{parseFloat(p.product_price).toFixed(2)}</td>
                <td className="py-2 px-4">{p.product_category}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="bg-[#71da25] text-black hover:bg-[#65ac32] px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="bg-[#e02f2f] text-black hover:bg-[#b53b3b] px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  name="product_name"
                  value={editForm.product_name}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  name="product_price"
                  type="number"
                  step="0.01"
                  value={editForm.product_price}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="product_category"
                  value={editForm.product_category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c.category_id} value={c.category_name}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer richColor position='top-center' autoClose={3000}/>
    </div>
  );
};

export default ProductPanel;
