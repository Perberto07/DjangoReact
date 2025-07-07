import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../../services/UserServices';
import {Trash } from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUsers();
      console.log("Fetched Users:", data);  // <-- See what you get
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this User")){
      try{
        await deleteUser(id);
        await fetchUser();
        toast.warning("User Deleted Successfully!")
      }catch(err){
        console.log(err);
      }
    }
  };


  return (
    <>
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Users</h1>
          <table className="min-w-full bg-[#FBFBFB] border-gray-200 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#FFDDAE] text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Password</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-[#D4F6FF] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    ********
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => handleDelete(user.id)}>
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer richColor position='top-center' autoClose={3000} />
      </DashboardLayout>
    </>
  );
};

export default Users;
