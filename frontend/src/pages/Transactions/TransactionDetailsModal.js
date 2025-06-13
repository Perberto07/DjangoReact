import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableTransaction from './PrintableTransaction';
import Button from '../../components/Button/button';
import { PrinterCheck } from 'lucide-react';

const TransactionDetailsModal = ({ transaction, onClose }) => {
    const printRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        pageStyle: `
            @page { size: auto; margin: 5mm; }
            @media print {
                body { -webkit-print-color-adjust: exact; }
                html, body { height: auto !important; }
            }
        `,
        removeAfterPrint: true,
        onPrintError: (error) => {
            console.error('Print error:', error);
        }
    });

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                {/* Hidden Printable Content */}
                <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
                    <PrintableTransaction
                        ref={printRef}
                        transaction={transaction}
                    />
                </div>

                {/* Visible Preview */}
                <div className="mb-6">
                    <PrintableTransaction transaction={transaction} />
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="submit"
                        onClick={handlePrint}
                        className="flex items-center gap-2"
                    >
                        <PrinterCheck size={15} />
                        Print Receipt
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsModal;
