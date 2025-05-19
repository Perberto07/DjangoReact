// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../services/CustomerServices';
import Cards from '../../components/card/Cards';



const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p>No customer found.</p>
      ) : (
        <ul className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {customers.map((customer) => (
            <li key={customer.customer_id}>
              <Cards>
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