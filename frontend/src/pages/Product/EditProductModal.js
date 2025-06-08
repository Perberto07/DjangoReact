import React from 'react';

const EditProductModal = ({
  show,
  categories,
  editForm,
  onClose,
  onChange,
  onSubmit
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Edit Product</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="product_name"
              value={editForm.product_name}
              onChange={onChange}
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
              onChange={onChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="product_category"
              value={editForm.product_category}
              onChange={onChange}
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
              onClick={onClose}
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
  );
};

export default EditProductModal;
