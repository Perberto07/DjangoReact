import React, { useEffect, useState } from 'react';
import { getTransaction } from '../../services/TransactionServices';
import Cards from '../../components/card/Cards';
import Button from '../../components/Button/button';
import { ScanSearch, Users, History, PhilippinePeso } from 'lucide-react';
import { searchData } from '../../utils/searchUtils';
import { sortData } from '../../utils/sortUtils';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'customer',
    direction: 'asc',
    isDate: false,
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const data = await getTransaction(page, pageSize);
        setTransactions(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error('Error fetching transaction:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [page]);

  const handleSortToggle = (key, isDate = false) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
      isDate,
    }));
  };

  const filteredTransactions = sortData(
    searchData(transactions, searchTerm, ['customer', 'transaction_id']),
    sortConfig.key,
    sortConfig.direction,
    sortConfig.isDate
  );

  const handleTransactionClick = (transaction) => {
    window.location.href = `/transaction/${transaction.transaction_id}`;
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <h2 className="flex font-extrabold text-center pb-10">Transaction List</h2>
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search Customer or Transaction No."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-3/6 px-4 py-2 border rounded"
        />
        <div className="flex gap-2">
          <Button onClick={() => handleSortToggle('customer')} className='flex items-center' title='Sort By User'>
            <span> <Users size={16}/></span>
          </Button>
          <Button onClick={() => handleSortToggle('create_at', true)} className='flex items-center' title='Sort By Date'>
           <span><History size={16}/></span>
          </Button>
          <Button onClick={() => handleSortToggle('total_price')} className='flex items-center' title='Sort By Price'>
            <PhilippinePeso size={16} />
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.transaction_id}>
                <Cards className="shadow-blue-500 hover:border-blue-500 border-2 p-4">
                  <div onClick={() => handleTransactionClick(transaction)} className="cursor-pointer">
                    <p className="text-sm">Transaction No. # {transaction.transaction_id.slice(0, 8)}</p>
                    <p className="text-sm font-medium text-gray-800">Customer: {transaction.customer}</p>
                    <p className="text-sm text-gray-800">
                      Date: {new Date(transaction.create_at).toLocaleDateString()}
                    </p>
                    <p>Total price: ₱{parseFloat(transaction.total_price).toFixed(2)}</p>
                  </div>
                  <Button
                    variant="submit"
                    className="flex flex-row items-center gap-2 mt-2"
                    onClick={() => handleTransactionClick(transaction)}
                  >
                    <span>Details</span>
                    <ScanSearch size={20} strokeWidth={2} />
                  </Button>
                </Cards>
              </li>
            ))}
          </ul>

          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" disabled={page === 1} onClick={handlePrevious}>
              Previous
            </Button>
            <span className="flex items-center font-semibold">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" disabled={page === totalPages} onClick={handleNext}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionList;
