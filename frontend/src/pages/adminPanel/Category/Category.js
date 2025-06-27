import React, { useEffect, useState } from 'react'
import { deleteCategory, getCategory, updateCategory } from '../../../services/CategoryServices';
import { Plus, SquarePen, Trash } from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import EditCategoryModal from './EditCategoryModal';

const Category = () => {
  const [categories, setCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [EditingCategory, setEditingCategory] = useState(null);
  const [editForm, setEditForm] = useState({
    category_name: '',
  });

  useEffect(() => {
    fetchCategory();
  }, []
  )

  const fetchCategory = async () => {
    try {
      const data = await getCategory();
      setCategory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('error fetching the Category', { err })
    }
  }

  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditForm({
      category_name: category.category_name,
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
      await updateCategory(EditingCategory.id, editForm);
      setShowModal(false);
      setEditingCategory(null);
      await fetchCategory();
      //toast.success("Product Modified Successfully!");
    } catch (error) {
      console.error('Error updating Category:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Category?")) {
      try {
        await deleteCategory(id);
        await fetchCategory();
      } catch (error) {
        console.error("Error deleting Category:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className='mb-4 text-gray-700 flex justify-between'>
          <input type="text"
            placeholder='Search Category'
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className='w-3/6 px-4 py-2 border rounded' 
          />
          <button className='bg-green-600 p-2 rounded-lg shadow-lg mr-2'>
           <Plus />
          </button>
        </div>
        
        <table className="min-w-full bg-[#FBFBFB] border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#FFDDAE] text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Category ID</th>
              <th className="py-3 px-6 text-left">Categories</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories
              .filter((category) =>
                category.category_name.toLowerCase().includes(searchCategory.toLowerCase())
              )
              .map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-[#D4F6FF] border-b transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {category.category_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="bg-[#2696ff] ] px-3 py-1 rounded"
                    >
                      <SquarePen size={18} color='#ffffff' width={30} strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all">
                      <Trash size={18} color='#ffffff' width={30} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <EditCategoryModal
          show={showModal}
          editForm={editForm}
          onClose={() => setShowModal(false)}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
        />
      </div>
    </DashboardLayout>
  )
}

export default Category