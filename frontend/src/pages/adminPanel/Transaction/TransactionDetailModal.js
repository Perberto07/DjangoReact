import React from 'react';
import Button from '../../../components/Button/button';
import { X } from 'lucide-react';

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
    if (!isOpen || !transaction) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-[#0B192C] text-white rounded-xl shadow-xl w-[95%] max-w-lg max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center px-4 py-2 bg-[#133297] text-white rounded-t-xl">
                    <h2 className="text-xl font-bold">Transaction Details</h2>
                    <Button variant="black" onClick={onClose}>
                        <X size={20} color="white   " />
                    </Button>
                </div>

                <div className="p-4 space-y-2">
                    <p><strong>Transaction ID:</strong> {transaction.transaction_id.slice(0, 8)}</p>
                    <p><strong>Customer:</strong> {transaction.customer}</p>
                    <p><strong>Date:</strong> {new Date(transaction.create_at).toLocaleDateString()}</p>
                    <p><strong>Total Price:</strong> ₱{transaction.total_price}</p>

                    <h3 className="mt-4 mb-2 font-semibold text-lg">Items</h3>
                    <ul className="space-y-2">
                        {(transaction.order_items_read || []).map((item, index) => (
                            <li key={index} className="border border-gray-500 rounded-md p-2">
                                <p><strong>Product:</strong> {item.product_name}</p>
                                <p><strong>Price:</strong> ₱{item.product_price}</p>
                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                <p><strong>Subtotal:</strong> ₱{item.item_subtotal}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailModal;
