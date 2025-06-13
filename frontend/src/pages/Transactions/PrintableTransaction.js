import React from 'react';

const PrintableTransaction = React.forwardRef(({ transaction }, ref) => {
    if (!transaction) return null;

    return (
        <div ref={ref} className="p-4">
            <div className="text-center mb-4">
                <h2 className="text-xl font-bold">Transaction Receipt</h2>
                <p className="text-sm">Thank you for your purchase!</p>
            </div>
            <div className="mb-4">
                <p className="text-sm">Transaction No. # {transaction.transaction_id.slice(0, 8)}</p>
                <p className="text-sm font-medium">Customer: {transaction.customer}</p>
                <p className="text-sm">Date: {new Date(transaction.create_at).toLocaleDateString()}</p>
                <p className="text-sm">Time: {new Date(transaction.create_at).toLocaleTimeString()}</p>
            </div>
            <div className="border-t border-b border-gray-300 py-2 mb-4">
                <div className="flex justify-between font-semibold mb-2">
                    <span>Item</span>
                    <span>Amount</span>
                </div>
                {transaction.order_items_read.map((item, index) => (
                    <div key={index} className="flex justify-between py-1">
                        <span>{item.product_name} × {item.quantity}</span>
                        <span>₱{item.item_subtotal}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₱{transaction.total_price}</span>
            </div>
            <div className="mt-8 text-center text-xs">
                <p>Thank you for shopping with us!</p>
                <p>Please come again</p>
            </div>
        </div>
    );
});

PrintableTransaction.displayName = 'PrintableTransaction';
export default PrintableTransaction;
