import { useEffect, useState } from "react"
import { getCustomer, deleteCustomer, updateCustomer } from "../../services/CustomerServices";
import EditCustomerModal from "./EditCustomerModal";
import 'react-toastify/dist/ReactToastify.css';
import { SquarePen, Trash } from 'lucide-react';


const CustomerPanel = () => {
  const [customers, setCustomer] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [EditingCustomer, setEditingCustomer] = useState(null);
  const [editForm, setEditForm] = useState({
    customer_name: '',
    customer_address: '',
    customer_number: '',
  });

  useEffect(() => {
    fetchCustomer();
  }, [])

  const fetchCustomer = async () => {
    try {
      const data = await getCustomer();
      setCustomer(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("error fetching customer", error);
    }
  }

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setEditForm({
      customer_name: customer.customer_name,
      customer_address: customer.customer_address,
      customer_number: customer.customer_number,
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
      await updateCustomer(EditingCustomer.customer_id, editForm);
      setShowModal(false);
      setEditingCustomer(null);
      await fetchCustomer();
      //toast.success("Product Modified Successfully!");
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Customer?")) {
      try {
        await deleteCustomer(id);
        await fetchCustomer();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <>
    <div className="min-h-screen overflow-auto">
      <h1 className="ml-10 mt-10 font-medium text-2xl mb-6">Customer Panel</h1>

      <div className="mb-4">
        <input type="text"
          placeholder="Search Customer"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          className="w-3/6 p-2 ml-10 rounded border border-blue-200 shadow-md"
        />
      </div>

      <table className="bg-white min-w-full mx-5 shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th className="py-3 px-6 text-left">Customer</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Contact</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {customers
            .filter((customer) =>
              customer.customer_name.toLowerCase().includes(searchCustomer.toLowerCase())
            )
            .map((customer) => (
              <tr
                key={customer.customer_id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {customer.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {customer.customer_address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                  {customer.customer_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => openEditModal(customer)}
                    className="bg-[#2696ff] ] px-3 py-1 rounded"
                  >
                    <SquarePen size={18} color='#ffffff' width={30} strokeWidth={1.5} />
                  </button>
                  <button onClick={() => handleDelete(customer.customer_id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all">
                    <Trash size={18} color='#ffffff' width={30} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    <EditCustomerModal
        show={showModal}
        editForm={editForm}
        onClose={() => setShowModal(false)}
        onChange={handleEditChange}
        onSubmit={handleEditSubmit}
      /></>
  );
};


export default CustomerPanel;