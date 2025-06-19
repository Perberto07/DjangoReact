import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Button from '../../components/Button/button';
import { PrinterCheck, ArrowLeft } from 'lucide-react';
import { getTransaction } from '../../services/TransactionServices';

const TransactionDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [printableElement, setPrintableElement] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [printReady, setPrintReady] = useState(false);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await getTransaction();
                const found = data.find(t => t.transaction_id === id);
                setTransaction(found || null);
            } catch (error) {
                console.error('Error fetching transaction:', error);
                setTransaction(null);
            } finally {
                setLoading(false);
            }
        };
        fetchTransaction();
    }, [id]);

    // Set print ready when both transaction and printable element are available
    useEffect(() => {
        if (transaction && printableElement) {
            setPrintReady(true);
        }
    }, [transaction, printableElement]);

    const handlePrint = useReactToPrint({
        content: () => printableElement,
        documentTitle: `Receipt_${transaction?.transaction_id.slice(0, 8)}`,
        pageStyle: `
            @page { 
                size: auto; 
                margin: 5mm; 
            }
            @media print {
                body { 
                    -webkit-print-color-adjust: exact; 
                }
                html, body { 
                    height: auto !important; 
                    overflow: visible !important;
                }
                .no-print { 
                    display: none !important; 
                }
            }
        `,
        onBeforeGetContent: () => new Promise(resolve => {
            // Small delay to ensure DOM is ready
            setTimeout(resolve, 100);
        }),
        onPrintError: (error) => {
            console.error('Print error:', error);
            alert('Failed to print receipt. Please try again.');
        }
    });

    if (loading) return <div className="p-8">Loading...</div>;
    if (!transaction) return <div className="p-8">Transaction not found.</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-6 relative">
                <Button 
                    variant="outline" 
                    onClick={() => navigate(-1)} 
                    className="mb-4 flex items-center gap-2 no-print"
                >
                    <ArrowLeft size={16} /> Back
                </Button>
                
                <div className="mb-6">
                    <div 
                        className="p-4 bg-white"
                        ref={el => setPrintableElement(el)}
                    >
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
                </div>
                <div className="flex justify-end no-print">
                    <Button
                        variant="submit"
                        onClick={handlePrint}
                        className="flex items-center gap-2"
                        disabled={!printReady}
                    >
                        <PrinterCheck size={15} />
                        {printReady ? 'Print Receipt' : 'Preparing...'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailPage;