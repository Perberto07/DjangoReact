// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getTransaction } from '../../services/TransactionServices';
import Cards from '../../components/card/Cards';
import Button from '../../components/Button/button';
import { PrinterCheck } from 'lucide-react';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await getTransaction();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transaction:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, []);

    return (
        <div>
            <h2 className='flex font-extrabold text-center pb-10'>Product List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {transactions.map((transaction) => (
                        <li key={transactions.transaction_id}>
                            <Cards>
                                <p className="text-sm">Transaction No. # {transaction.transaction_id.slice(0, 8)}</p>
                                <p className="text-sm font-medium text-gray-800"> Customer: {transaction.customer}</p>
                                <p className="text-sm text-gray-800">Date: {new Date(transaction.create_at).toLocaleDateString()}</p>
                                <div className="mt-2">
                                    <p className="font-semibold">Items:</p>
                                    <ul className="ml-4 list-none">
                                        {transaction.order_items_read.map((item, index) => (
                                            <li key={index} className='border-b-[1px] border-gray-300'>
                                                {item.product_name} — ₱{item.product_price} × {item.quantity} = {item.item_subtotal}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <p>Total price: {transaction.total_price}</p>
                                <Button variant='submit' className='flex flex-row items-center gap-2'>
                                    <span>print</span>
                                   <PrinterCheck size={15} />
                                </Button>
                            </Cards>
                        </li>
                    ))}
                </ul>

            )}
        </div>
    );
};

export default TransactionList;