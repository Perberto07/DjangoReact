import React, { useState } from 'react';
import BarcodeScanner from '../BarcodeScanner';
import { createTransaction } from '../../services/TransactionServices';
import CustomerDropdown from '../Customer/CustomerDropDown';
import { getProductByBarcode, getProducts } from '../../services/ProductServices'; // Ensure this exists
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const AddTransaction = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customer, setCustomer] = useState('');
  const [scannedBarcodes, setScannedBarcodes] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [manualQty, setManualQty] = useState(1);

  const handleScan = async (barcode) => {
    if (scannedBarcodes.has(barcode)) return; // prevent duplicate scan
    try {
      const product = await getProductByBarcode(barcode);

      setOrderItems((prevItems) => {
        const index = prevItems.findIndex(item => item.product === product.product_name);

        if (index !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[index].quantity += 1;
          return updatedItems;
        } else {
          return [...prevItems, {
            product: product.product_name,
            quantity: 1,
            product_price: parseFloat(product.product_price),
          }];
        }
      });

      // Add barcode after updating quantity or adding new product
      setScannedBarcodes(prev => new Set(prev).add(barcode));

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
        order_items: orderItems.map(item => ({
          product: item.product,
          quantity: item.quantity
        })),
      });
      setOrderItems([]);
      setScannedBarcodes(new Set());
      toast.success("Transaction created!");
    } catch (err) {
      console.error("Error submitting transaction", err);
    }
  };

  const openModal = async () => {
    try {
      const products = await getProducts();
      setAllProducts(Array.isArray(products.results) ? products.results : []);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };


  const addManualItem = () => {
    if (!selectedProduct || manualQty < 1) return;

    setOrderItems((prevItems) => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex(item => item.product === selectedProduct.product_name);

      if (index !== -1) {
        // Prevent unintended double increments
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + manualQty
        };
        return updatedItems;
      } else {
        return [
          ...updatedItems,
          {
            product: selectedProduct.product_name,
            quantity: manualQty,
            product_price: parseFloat(selectedProduct.product_price),
          }

        ];
      }
    });
    console.log("Manual add", selectedProduct.product_name, "Qty:", manualQty);
    // Reset modal state
    setShowModal(false);
    setManualQty(1);
    setSelectedProduct(null);
  };

  const options = allProducts.map(prod => ({
    value: prod.product_id,
    label: `${prod.product_name} - ₱${prod.product_price}`,
    data: prod,
  }));



  return (
    <div className="w-full grid grid-cols-1 md:flex flex-row space-x-3">
      <div className='w-full h-auto bg-white rounded-md shadow-md p-3'>
        <BarcodeScanner onScanned={handleScan} />
      </div>

      <div className='w-full'>
        <div>
          <CustomerDropdown onSelect={setCustomer} />
        </div>

        <div className='flex flex-col justify-center items-center bg-white shadow-md p-2 rounded-md w-full'>

          <h3 className="text-lg font-semibold mt-4 mb-3">Order Items</h3>
          <ul className="list-none w-full">
            {orderItems.map((item, index) => {
              const subtotal = item.quantity * item.product_price;
              return (
                <li key={index} className='py-1 border-b-2 border-gray-100 flex justify-between items-center'>
                  <div>
                    <div className="font-semibold">{item.product}</div>
                    <div className="text-sm text-gray-600">₱{item.product_price.toFixed(2)} each</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="border px-2 w-16"
                    />
                    <span className="font-semibold text-gray-700">₱{subtotal.toFixed(2)}</span>
                    <button onClick={() => handleRemove(index)} className="text-red-500 font-bold">X</button>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Total Price */}
          <div className="text-right font-bold text-lg mt-4 w-full">
            Total: ₱{orderItems.reduce((acc, item) => acc + item.quantity * item.product_price, 0).toFixed(2)}
          </div>
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

            <Select
              options={options}
              onChange={(selectedOption) => {
                setSelectedProduct(selectedOption?.data || null);
              }}
              value={selectedProduct ? {
                value: selectedProduct.product_id,
                label: `${selectedProduct.product_name} - ₱${selectedProduct.product_price}`,
              } : null}
              className="mb-3"
              isClearable
              placeholder="Select a product..."
            />

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
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddTransaction;
