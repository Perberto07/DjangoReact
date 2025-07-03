// src/components/CustomerDropdown.jsx
import React, { useEffect, useState } from 'react';
import { getCustomer } from '../../services/CustomerServices';

const CustomerDropdown = ({ onSelect }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomer(); // returns { results: [...], count: number }
        setCustomers(Array.isArray(res.results) ? res.results : []);
      } catch (err) {
        console.error("Failed to fetch customers", err);
        setCustomers([]);
      }
    };

    fetchCustomers();
  }, []);



  const handleChange = (e) => {
    const selectedName = e.target.value;
    setSelectedCustomer(selectedName);
    onSelect(selectedName); // Pass selected customer name to parent
  };

  return (
    <div className="mb-4">
      <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
        Select Customer
      </label>
      <select
        id="customer"
        name="customer"
        value={selectedCustomer}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">-- Select a customer --</option>
        {customers.map((customer) => (
          <option key={customer.id} value={customer.customer_name}>
            {customer.customer_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerDropdown;
