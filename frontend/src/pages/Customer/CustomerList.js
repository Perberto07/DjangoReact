// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../services/CustomerServices';
import Cards from '../../components/card/Cards';



const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getCustomer();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2 className='pb-5'>Customer List</h2>

      <div className='mb-5'>
        <input
          type='text'
          placeholder='Search Customer'
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          className='border border-blue-200 p-2 rounded w-3/6 mb-4 shadow-md'
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customer found.</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          {customers
          .filter((customer) =>
            customer.customer_name.toLowerCase().includes(searchCustomer.toLowerCase())
          )
          .map((customer) => (
            <li key={customer.customer_id}>
              <Cards className='border border-red-200 hover:border-red-500 rounded shadow-orange-400'>
              <p>Customer Name: {customer.customer_name}</p>
              <p>Customer address: {customer.customer_address}</p>
              <p>Customer Number: {customer.customer_number}</p>
              </Cards>
            </li>
          ))}   
        </ul>
      )}
    </div>
  );
};

export default CustomerList;