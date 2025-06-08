import { useEffect, useState } from "react"
import { getCustomer, deleteCustomer } from "../../services/CustomerServices";



const CustomerPanel = () => {
  const [customers, setCustomer] = useState([]);

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Customer?")){
      try{
        await deleteCustomer(id);
        await fetchCustomer();
      }catch(error){
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <h1 className="mt-10 font-medium text-2xl mb-6">Product Panel</h1>

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
          {customers.map((customer) => (
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-all">
                  Edit
                </button>
                <button onClick={() =>handleDelete(customer.customer_id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-all">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};


export default CustomerPanel;