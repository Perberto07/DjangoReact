import Cards from "../../../components/card/Cards";
import { getTransaction } from "../../../services/TransactionServices";
import { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { deleteTransaction, updateTransaction } from "../../../services/TransactionServices";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditTransactionModal from "./EditTransactionModal";
import Button from "../../../components/Button/button";


const TransactionPanel = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [transactionToEdit, setTransactionToEdit] = useState(null);


    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getTransaction(page, pageSize);
                setTransactions(data.results);
                setTotalPages(Math.ceil(data.count / pageSize));
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [page]);

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1);
    };
    const openDeleteModal = (transaction) => {
        setTransactionToDelete(transaction);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!transactionToDelete) return;
        await deleteTransaction(transactionToDelete.transaction_id);
        setShowDeleteModal(false);
        setTransactionToDelete(null);
        const data = await getTransaction(page, pageSize);
        setTransactions(data.results);
    };

    const openEditModal = (transaction) => {
        setTransactionToEdit(transaction);
        setShowEditModal(true);
    };

    const handleSaveEdit = async (id, updatedData) => {
        await updateTransaction(id, updatedData);
        setShowEditModal(false);
        setTransactionToEdit(null);
        const data = await getTransaction(page, pageSize);
        setTransactions(data.results);
    };


    return (
        <DashboardLayout>
            <div className="p-4 text-black">
                <h2 className="text-2xl font-bold mb-6 text-white">Transaction Panel</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : transactions.length === 0 ? (
                    <p>No Transactions Found</p>
                ) : (
                    <>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {transactions.map((transaction) => (
                                <li key={transaction.transaction_id}>
                                    <Cards className="shadow-blue-500 hover:border-blue-500 border-2 p-4">
                                        <p className="text-sm">Transaction No. # {transaction.transaction_id.slice(0, 8)}</p>
                                        <p className="text-sm font-medium text-gray-800">Customer: {transaction.customer}</p>
                                        <p className="text-sm text-gray-800">Date: {new Date(transaction.create_at).toLocaleDateString()}</p>
                                        <p className="text-sm font-semibold">Total price: ₱{transaction.total_price}</p>
                                        <Button
                                            variant="outline"
                                            onClick={() => openEditModal(transaction)}
                                            className="mt-2"
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            variant="danger"
                                            onClick={() => openDeleteModal(transaction)}
                                            className="mt-2 ml-2"
                                        >
                                            Delete
                                        </Button>

                                    </Cards>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={handlePrevious}
                            >
                                Previous
                            </Button>
                            <span className="font-medium">Page {page} of {totalPages}</span>
                            <Button
                                variant="outline"
                                disabled={page === totalPages}
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                transactionId={transactionToDelete?.transaction_id || ""}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />

            <EditTransactionModal
                isOpen={showEditModal}
                transaction={transactionToEdit}
                onClose={() => setShowEditModal(false)}
                onSave={handleSaveEdit}
            />

        </DashboardLayout>
    );
};

export default TransactionPanel;
