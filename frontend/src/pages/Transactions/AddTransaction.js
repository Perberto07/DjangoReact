import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import { createTransaction } from '../../services/TransactionServices'; // You must create this
import CustomerDropdown from '../Customer/CustomerDropDown';
import { getProductByBarcode } from '../../services/ProductServices';


const AddTransaction = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState('');
  const [scannedBarcodes, setScannedBarcodes] = useState(new Set());

  const handleScan = async (barcode) => {
    if (scannedBarcodes.has(barcode)) return; // prevent duplicate scanning
    try {
      const product = await getProductByBarcode(barcode); // must return product with ID
      const newItem = { product: product.product_id, quantity: 1 };

      setOrderItems((prevItems) => [...prevItems, newItem]);
      setScannedBarcodes((prev) => new Set(prev).add(barcode));
    } catch (err) {
      console.error("Product not found", err);
    }
  };

  const handleQuantityChange = (index, newQty) => {
    const updated = [...orderItems];
    updated[index].quantity = parseInt(newQty);
    setOrderItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  const handleSubmit = async () => {
    try {
      await createTransaction({
        customer,
        order_items: orderItems,
      });
      alert('Transaction created!');
      setOrderItems([]);
      setScannedBarcodes(new Set());
    } catch (err) {
      console.error("Error submitting transaction", err);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Add Transaction</h2>
      <BarcodeScanner onScanned={handleScan} />
      <CustomerDropdown onSelect={setCustomer} />
      
      <div>
        <h3 className="text-lg font-semibold mt-4">Order Items</h3>
        <ul className="list-disc pl-6">
          {orderItems.map((item, index) => (
            <li key={index}>
              Product ID: {item.product} <br />
              Quantity:
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                className="border px-2 mx-2 w-16"
              />
              <button onClick={() => handleRemove(index)} className="text-red-500">Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={!customer || orderItems.length === 0}
      >
        Submit Transaction
      </button>
    </div>
  );
};

export default AddTransaction;
