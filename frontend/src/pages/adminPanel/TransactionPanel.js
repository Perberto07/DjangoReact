import Cards from "../../components/card/Cards";
import { getTransaction } from "../../services/TransactionServices"
import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout"

const TransactionPanel = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransaction();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);


    return (
        <div>
            <DashboardLayout>
            <h2>Transaction Panel</h2>
            {loading ? (
                <p>Loading</p>
            ) : transactions.length === 0 ? (
                <p>No Transactions Found</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {transactions.map((transaction) => (
                        <li key={transaction.transaction_id}>
                            <Cards className='shadow-blue-500 hover:border-blue-500 border-2 p-4'>
                                    <p className="text-sm">Transaction No. # {transaction.transaction_id.slice(0, 8)}</p>
                                    <p className="text-sm font-medium text-gray-800"> Customer: {transaction.customer}</p>
                                    <p className="text-sm text-gray-800">Date: {new Date(transaction.create_at).toLocaleDateString()}</p>
                                    <p>Total price: {transaction.total_price}</p>
                            </Cards>
                        </li>
                    ))}
                </ul>
            )}
            </DashboardLayout>
        </div>
    )
}

export default TransactionPanel