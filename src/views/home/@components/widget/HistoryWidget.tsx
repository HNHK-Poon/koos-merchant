import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getWalletBalance, selectAsset } from '@/infrastructure/state/asset';
import { useAccountService, useTransactionService, useWalletService } from '@/infrastructure/hook/useService';
import { useNavigate } from 'react-router-dom';
import transaction, { getTransactions, selectTransactions } from '@/infrastructure/state/transaction';
import TransactionRecord from '@/views/transaction/@components/TransactionRecord';
import { useQuery } from 'react-query';
import EmptyData from '@/components/widgets/EmptyData';

const HistoryWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const asset = useSelector(selectAsset);
  const walletSerice: any = useWalletService();
  const transactionService = useTransactionService();
  const accountService = useAccountService();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [fetchedTransactions, setFetchedTransactions] = useState([] as any);

  useEffect(() => {
    // dispatch(getWalletBalance(walletSerice.getBalance) as any);
  }, [dispatch]);

  const { isLoading, isError, data, error, isSuccess } = useQuery<any, Error>(
    ['history', { category: 'transactions', currentPage, pageSize }],
    () => transactionService.getTransactions({ pageSize, currentPage }),
    {
      staleTime: 60000,
      enabled: !!currentPage, // Enable query only if currentPage is set
      onSuccess: (newData) => {
        setFetchedTransactions([...fetchedTransactions, ...newData.data.list]);
      },
      onError: () => {
        console.log('error getting transaction service');
      }
    }
  );

  const getMoreList = async () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <p className="w-full text-left text-primary-xl text-base font-semibold">Latest Transactions</p>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && fetchedTransactions.length <= 0 && <EmptyData />}
      {isSuccess &&
        fetchedTransactions &&
        fetchedTransactions.map((transaction: any, idx: any) => {
          return (
            <>
              <TransactionRecord
                key={idx}
                id={transaction.transactionId}
                name={transaction.receivedFrom}
                productName={transaction.productName}
                amount={`${transaction.amount.toFixed(2)}`}
                status={transaction.status}
                user={transaction.userId}
                time={transaction.createdDateTime}
                paymentType={transaction.paymentType}
              />
            </>
          );
        })}
      <div className="p-4">
        <button
          className="bg-primary-m hover:bg-primary-d text-white font-medium py-2 px-4 rounded"
          onClick={getMoreList}
        >
          Load More
        </button>
      </div>
      {/* <p className='text-light-m text-xs -mt-1'>RM{asset.Amount.toFixed(2)} in cash</p> */}
    </div>
  );
};

HistoryWidget.propTypes = {};

export default HistoryWidget;
