import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, updateProduct } from '../../services/ProductServices';

const ProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    product_name: '',
    product_price: '',
    product_category: '',
  });

  useEffect(() => {
    fetchProducts();
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

  const startEdit = (product) => {
    setEditingId(product.product_id);
    setEditForm({
      product_name: product.product_name,
      product_price: product.product_price,
      product_category: product.product_category,
    });
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
      await updateProduct(editingId, editForm);
      setEditingId(null);
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="p-6 bg-[#C6E7FF] min-h-screen rounded-md shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Panel</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#FBFBFB] shadow-md ">
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
                <td className="py-2 px-4">
                  {editingId === p.product_id ? (
                    <input
                      name="product_name"
                      value={editForm.product_name}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    p.product_name
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === p.product_id ? (
                    <input
                      name="product_price"
                      value={editForm.product_price}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    `₱${parseFloat(p.product_price).toFixed(2)}`
                  )}
                </td>
                <td className="py-2 px-4">
                  {editingId === p.product_id ? (
                    <input
                      name="product_category"
                      value={editForm.product_category}
                      onChange={handleEditChange}
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                    />
                  ) : (
                    p.product_category
                  )}
                </td>
                <td className="py-2 px-4 space-x-2">
                  {editingId === p.product_id ? (
                    <>
                      <button
                        onClick={handleEditSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-[#71da25] text-black hover:bg-[#65ac32] px-3 py-1 rounded"
                      >Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.product_id)}
                        className="bg-[#e02f2f] text-black hover:bg-[#b53b3b px-3 py-1 rounded"
                      >Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductPanel;
