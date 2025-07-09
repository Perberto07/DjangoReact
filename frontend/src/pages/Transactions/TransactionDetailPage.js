import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Button from '../../components/Button/button';
import { PrinterCheck, ArrowLeft } from 'lucide-react';
import { getTransactionById } from '../../services/TransactionServices';
import TransactionReceipt from './TransactionReceipt'; // adjust path as needed

const TransactionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const componentRef = useRef();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const data = await getTransactionById(id);
        setTransaction(data);
      } catch (error) {
        console.error('Error fetching transaction:', error);
        setTransaction(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  contentRef: componentRef,
  documentTitle: transaction ? `Receipt_${transaction.transaction_id.slice(0, 8)}` : 'Receipt',
  pageStyle: `
    @page {
      size: 80mm auto;
      margin: 0;
    }
    @media print {
      body {
        margin: 0;
        font-size: 10px;
        font-family: monospace;
      }
      .receipt-container {
        width: 80mm;
        padding: 0;
      }
      .no-print {
        display: none;
      }
    }
  `,
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
          <TransactionReceipt ref={componentRef} transaction={transaction} />
        </div>

        <div className="flex justify-end no-print">
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

export default TransactionDetailPage;
