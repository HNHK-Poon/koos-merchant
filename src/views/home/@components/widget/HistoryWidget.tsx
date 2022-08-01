import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getWalletBalance, selectAsset } from '@/infrastructure/state/asset';
import { useTransactionService, useWalletService } from '@/infrastructure/hook/useService';
import { useNavigate } from 'react-router-dom';
import { getTransactions, selectTransactions } from '@/infrastructure/state/transaction';
import TransactionRecord from '@/views/transaction/@components/TransactionRecord';

const HistoryWidget = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const asset = useSelector(selectAsset);
    const walletSerice: any = useWalletService();
    const transactions = useSelector(selectTransactions);
    const transactionService = useTransactionService();
    console.log('asset', asset);

    useEffect(() => {
        dispatch(getWalletBalance(walletSerice.getBalance) as any);
        dispatch(getTransactions(transactionService.getTransactions) as any);
    }, [dispatch]);
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <p className="w-full text-left text-primary-xl text-base font-semibold">
                Latest Transactions
            </p>
            {transactions.slice(0,5).map((transaction, idx) => {
                return (
                    <TransactionRecord
                        key={idx}
                        id={transaction.TransactionId}
                        name={transaction.ProductName}
                        amount={`${transaction.Amount.toFixed(2)}`}
                        status={transaction.Status}
                        user={transaction.UserId}
                        time={transaction.CreatedDateTime}
                        paymentType={transaction.PaymentType}
                    />
                );
            })}
            {/* <p className='text-light-m text-xs -mt-1'>RM{asset.Amount.toFixed(2)} in cash</p> */}
        </div>
    );
};

HistoryWidget.propTypes = {};

export default HistoryWidget;
