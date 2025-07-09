import React from 'react';

const TransactionReceipt = React.forwardRef(({ transaction }, ref) => (
  <div ref={ref} className="receipt-container">
    <div className="text-center mb-2">
      <h2 className="text-sm font-bold">Transaction Receipt</h2>
      <p className='text-xs'>dev@johnpatrickboleche</p>
    </div>
    <div className="mb-2 text-xs">
      <p>Order No: #{transaction.transaction_id.slice(0, 5)}</p>
      <p>Customer: {transaction.customer}</p>
      <p>Date: {new Date(transaction.create_at).toLocaleDateString()}</p>
      <p>Time: {new Date(transaction.create_at).toLocaleTimeString()}</p>
    </div>
    <div className="border-t border-b border-gray-300 py-1 mb-2 text-xs">
      <div className="flex justify-between font-semibold">
        <span>Item</span>
        <span>Amount</span>
      </div>
      {transaction.order_items_read.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span>{item.product_name} × {item.quantity}</span>
          <span>₱{item.item_subtotal}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between font-bold text-sm">
      <span>Total:</span>
      <span>₱{transaction.total_price}</span>
    </div>
    <div className="mt-4 text-center text-xs">
      <p>Thank you for shopping with us!</p>
      <p>Please come again</p>
    </div>
  </div>
));


export default TransactionReceipt;
