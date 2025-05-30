import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import { createTransaction } from '../../services/TransactionServices';
import CustomerDropdown from '../Customer/CustomerDropDown';
import { getProductByBarcode, getProducts } from '../../services/ProductServices'; // Ensure this exists

const AddTransaction = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState('');
  const [scannedBarcodes, setScannedBarcodes] = useState(new Set());

  const [showModal, setShowModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [manualQty, setManualQty] = useState(1);

  const handleScan = async (barcode) => {
    if (scannedBarcodes.has(barcode)) return;
    try {
      const product = await getProductByBarcode(barcode);
      const newItem = { product: product.product_name, quantity: 1 };
      setOrderItems((prev) => [...prev, newItem]);
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

  const openModal = async () => {
    try {
      const products = await getProducts();
      setAllProducts(products);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const addManualItem = () => {
    if (!selectedProduct || manualQty < 1) return;
    const newItem = { product: selectedProduct, quantity: manualQty };
    setOrderItems((prev) => [...prev, newItem]);
    setShowModal(false);
    setManualQty(1);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full grid grid-cols-1 md:flex flex-row space-x-3">
      <div className='w-full h-auto bg-white rounded-md shadow-md p-3'>
        <BarcodeScanner onScanned={handleScan} />
      </div>

      <div className='w-full'>
        <div>
          <CustomerDropdown onSelect={setCustomer} />
        </div>

        <div className=' flex flex-col justify-center items-center bg-white shadow-md p-2 rounded-md'>
          <h3 className="text-lg font-semibold mt-4 mb-3">Order Items</h3>
          <ul className="list-none">
            {orderItems.map((item, index) => (
              <li key={index} className='py-1 border-b-2 border-gray-100'>
                {item.product}
                <span> #
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    className="border px-2 mx-2 w-16"
                  /></span>
                  
                <button onClick={() => handleRemove(index)} className="text-red-500">X</button>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex mt-3 justify-around'>
          <button onClick={openModal} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Item Manually
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={!customer || orderItems.length === 0}
          >
            Submit Transaction
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add Product Manually</h3>
            <select
              value={selectedProduct || ''}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full border mb-3 p-2"
            >
              <option value="">Select a product</option>
              {allProducts.map((prod) => (
                <option key={prod.product_id} value={prod.product_name}>
                  {`${prod.product_name} - ₱${prod.product_price}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={manualQty}
              onChange={(e) => setManualQty(parseInt(e.target.value))}
              className="w-full border mb-4 p-2"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={addManualItem} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
