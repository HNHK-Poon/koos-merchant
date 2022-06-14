import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import { HiOutlineMail, HiUserCircle, HiDocumentText } from 'react-icons/hi';
import { MdShoppingCart, MdPayment } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import transaction, {
    selectTransactionById,
    store,
} from '@/infrastructure/state/transaction';
import { useSelector, useStore } from 'react-redux';
import { useTransactionService } from '@/infrastructure/hook/useService';
import Swal from 'sweetalert2';

interface IProps {}

interface ILocationState {
    id: string;
    user: string;
}

interface ITransactionState {
    id: string;
    name: string;
    amount: number;
    status: string;
    merchant: string;
}

const TransactionModalPage = (props: IProps) => {
    const location = useLocation();
    const { id, user } = location.state as ILocationState;
    const transactionService = useTransactionService()

    const transaction = useSelector((state: any) =>
        selectTransactionById(state, id)
    ) as ITransactionState;
    const { t } = useTranslation();
    console.log('State', id, transaction);

    const completeTransaction = () => {
        transactionService.complete({
            userId: user,
            data: {
                id: transaction.id,
                changes: {
                    status: 'Completed'
                }
            }
        }).then((res:any)=> {
            Swal.fire({
                icon: 'success',
                title: "Transaction Completed",
                timer: 1000,
                showConfirmButton: false,
            })
        })
    }

    const handleSubmit = () => {};


    return (
        <div className="bg-light-xl h-screen w-screen">
            <PageHeader title="Details" />
            <div className="relative mt-[56px] h-48 w-full bg-light-xl">
                <div className="absolute h-36 w-full bg-primary-m"></div>
                <div className="absolute h-full w-full text-white">
                    <div className="text-white text-lg font-semibold h-16 pt-8 px-10">
                        Send Request to
                    </div>
                    <div className="h-32 mx-10 text-white bg-light-xl shadow-md text-lg font-semibold rounded-xl flex justify-start items-center">
                        <HiUserCircle className="px-2 w-16 h-16 text-dark-xs" />
                        <div className="text-xl text-dark-m font-semibold">
                            {transaction.merchant.slice(0, 12)}
                        </div>
                    </div>
                    <div className="p-4 mt-10 mx-10 bg-white rounded-lg border shadow-md sm:p-8 ">
                        <div className="flex justify-start items-center mb-4">
                            <h5 className="text-xl font-bold leading-none text-dark-m ">
                                Transaction Info
                            </h5>
                        </div>
                        <div className="flow-root">
                            <ul
                                role="list"
                                className="divide-y divide-gray-200 "
                            >
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                ID
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-sm  text-gray-900 ">
                                            {transaction.id}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                Product Name
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-sm  text-gray-900 ">
                                            {transaction.name}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                Deal Amount
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-sm  text-gray-900 ">
                                            RM{transaction.amount}
                                        </div>
                                    </div>
                                </li>
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                Status
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-sm   text-gray-900 ">
                                            {transaction.status}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {(transaction.status == 'Paid By Cash' ||
                        transaction.status == 'Paid By Online') && (
                        <div className="w-full flex justify-center">
                            <button
                                onClick={completeTransaction}
                                className="h-16  mx-10 mt-10  w-full bg-primary-s text-light-l text-xl font-bold rounded-lg shadow-lg"
                            >
                                Complete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

TransactionModalPage.propTypes = {};

export default TransactionModalPage;
