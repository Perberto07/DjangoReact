import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../../services/ProductServices';
import { getCategory } from '../../services/CategoryServices'; // Import categories
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SquarePen, Trash } from 'lucide-react';
import EditProductModal from './EditProductModal';

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
  const [searchTerm, setSearchTerm] = useState('');

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

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/6 px-4 py-2 border rounded"
          />
        </div>

        <table className="min-w-full bg-[#FBFBFB] shadow-md">
          <thead className="bg-[#FFDDAE] text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((p) =>
                p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((p) => (
                <tr key={p.product_id} className="border-b hover:bg-[#D4F6FF]">
                  <td className="py-2 px-4">{p.product_name}</td>
                  <td className="py-2 px-4">₱{parseFloat(p.product_price).toFixed(2)}</td>
                  <td className="py-2 px-4">{p.product_category}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="bg-[#2696ff] ] px-3 py-1 rounded"
                    >
                      <SquarePen size={18} color='#ffffff' width={30} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.product_id)}
                      className="bg-[#f73f3f] px-3 py-1 rounded"
                    >
                      <Trash size={18} color='#ffffff' width={30} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <EditProductModal
        show={showModal}
        categories={categories}
        editForm={editForm}
        onClose={() => setShowModal(false)}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit} />
      <ToastContainer richColor position='top-center' autoClose={3000} />
    </div>
  );
};

export default ProductPanel;
