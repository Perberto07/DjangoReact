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

  // Fetch products on mount
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
    <div>
      <h2>Product Panel</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>
                {editingId === p.product_id ? (
                  <input
                    name="product_name"
                    value={editForm.product_name}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.product_name
                )}
              </td>
              <td>
                {editingId === p.product_id ? (
                  <input
                    name="product_price"
                    value={editForm.product_price}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.product_price
                )}
              </td>
              <td>
                {editingId === p.product_id ? (
                  <input
                    name="product_category"
                    value={editForm.product_category}
                    onChange={handleEditChange}
                  />
                ) : (
                  p.product_category
                )}
              </td>
              <td>
                {editingId === p.product_id ? (
                  <>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.product_id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPanel;
