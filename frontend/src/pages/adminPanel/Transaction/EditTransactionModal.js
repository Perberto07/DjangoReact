import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/button';


const EditTransactionModal = ({ isOpen, onClose, transaction, onSave }) => {
    const [customer, setCustomer] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (transaction) {
            setCustomer(transaction.customer || '');
            setItems(transaction.order_items_read || []);
        }
    }, [transaction]);

    const handleQuantityChange = (index, value) => {
        const updated = [...items];
        updated[index].quantity = parseInt(value, 10);
        setItems(updated);
    };

    const handleRemoveItem = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
    };

    const handleSave = () => {
        const formattedData = {
            customer,
            order_items: items.map(item => ({
                product_id: item.product_id || item.id, // backend must accept this
                quantity: item.quantity,
            }))
        };
        onSave(transaction.transaction_id, formattedData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[95%] max-w-lg max-h-[90vh] overflow-auto">
                <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Customer Name:</label>
                    <input
                        className="w-full border px-3 py-2 rounded-md"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>

                <h3 className="font-semibold mb-2">Items</h3>
                {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 mb-2">
                        <span className="flex-1 text-sm">{item.product_name}</span>
                        <input
                            type="number"
                            min="1"
                            className="w-16 border rounded-md px-2 py-1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                        <Button variant="danger" onClick={() => handleRemoveItem(index)}>
                            Remove
                        </Button>
                    </div>
                ))}

                {/* Future enhancement: Add new product selection */}

                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="submit" onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditTransactionModal;
