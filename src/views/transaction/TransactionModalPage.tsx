import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import { HiOutlineMail, HiUserCircle, HiDocumentText } from 'react-icons/hi';
import { MdShoppingCart, MdPayment } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import transaction, {
    getTransactions,
    selectTransactionById,
    store,
} from '@/infrastructure/state/transaction';
import { useSelector, useStore } from 'react-redux';
import { useTransactionService } from '@/infrastructure/hook/useService';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import PageLoading from '@/components/PageLoading';
import success from '@assets/icons/success.png';
import { format } from 'date-fns';

interface IProps {}

interface ILocationState {
    isCreated: boolean;
}

interface ITransactionState {
    TransactionId: string;
    MerchantId: string;
    ProductName: number;
    UserId: string;
    Amount: string;
    Status: number;
    PaymentType: number;
    CreatedDateTime: string;
}

const TransactionModalPage = (props: IProps) => {
    const [isCreated, setIsCreated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let { id }: any = useParams();
    const transactionService = useTransactionService();
    const transaction = useSelector((state: any) =>
        selectTransactionById(state, id)
    );

    useEffect(() => {
        dispatch(getTransactions(transactionService.getTransactions) as any);
    }, []);

    useEffect(() => {
        if (location.state === undefined || location.state === null) {
            console.log('No state');
            navigate('/');
            return;
        } else {
            const { isCreated } = location.state as ILocationState;
            setIsCreated(isCreated);
        }
    }, [location, id]);

    const { t } = useTranslation();

    const back = () => {
        if (isCreated) {
            navigate('/');
        } else {
            navigate(-1);
        }
    };

    // const payByCash = () => {
    //     transactionService
    //         .pay({
    //             merchantId: transaction.merchant,
    //             data: {
    //                 id: transaction.id,
    //                 changes: {
    //                     status: 'Paid By Cash',
    //                 },
    //             },
    //         })
    //         .then((res: any) => {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Payment done',
    //                 timer: 2000,
    //                 showConfirmButton: false,
    //             }).then(() => {
    //                 navigate('/');
    //             });
    //         });
    // };

    // const payOnline = () => {
    //     transactionService
    //         .pay({
    //             merchantId: transaction.merchant,
    //             data: {
    //                 id: transaction.id,
    //                 changes: {
    //                     status: 'Paid By Online',
    //                 },
    //             },
    //         })
    //         .then((res: any) => {
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Payment done',
    //                 timer: 2000,
    //                 showConfirmButton: false,
    //             }).then(() => {
    //                 navigate('/');
    //             });
    //         });
    // };

    return (
        <div className="bg-light-xl h-screen w-screen flex flex-col ">
            <PageHeader title="Details" />
            {!transaction && <PageLoading />}
            {transaction && (
                <div className="relative grow h-48 w-full bg-light-xl">
                    <div className="absolute h-24 w-full bg-primary-m"></div>
                    <div className="absolute pt-12 h-full w-full text-white">
                        {/* <div className="text-white text-lg font-semibold h-16 pt-8 px-2">
                            Request From
                        </div> */}
                        <div className="h-32 mx-4 text-white bg-light-xl shadow-md text-lg rounded-xl flex flex-col justify-center items-center">
                            {isCreated && (
                                <div>
                                    <img
                                        className="w-8 h-8 m-auto"
                                        src={success}
                                        alt=""
                                    />
                                </div>
                            )}

                            <div className="text-center text-3xl text-dark-s ">
                                - RM{transaction.Amount}
                            </div>
                            {transaction.Status === 0 && (
                                <div className="flex p-2">
                                    <img
                                        className="w-4 h-4 m-auto"
                                        src={success}
                                        alt=""
                                    />{' '}
                                    <p className="text-sm text-dark-s px-2">
                                        Success
                                    </p>
                                </div>
                            )}
                            <div className="text-center text-xs text-dark-s">
                                Completed at{' '}
                                {format(
                                    new Date(transaction.CreatedDateTime),
                                    'dd/MM/yyyy HH:mma'
                                )}
                            </div>
                        </div>
                        <div className="p-4 mt-4 mx-4 bg-white rounded-lg border shadow-md sm:p-8 ">
                            <div className="flex justify-start items-center mb-4">
                                <h5 className="text-lg leading-none text-dark-m ">
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
                                                <p className="text-xs font-light text-gray-900 truncate ">
                                                    Transaction ID
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-xs  text-gray-900 ">
                                                {transaction.id.slice(0, 24)}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-light text-gray-900 truncate ">
                                                    Product Name
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-xs  text-gray-900 ">
                                                {transaction.ProductName}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-light  text-gray-900 truncate ">
                                                    Merchant ID
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-xs  text-gray-900 ">
                                                {transaction.MerchantId.slice(
                                                    0,
                                                    24
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-light  text-gray-900 truncate ">
                                                    Payment Method
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-xs  text-gray-900 ">
                                                {transaction.PaymentType === 0
                                                    ? 'E-Wallet'
                                                    : 'Cash'}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div></div>
                        {transaction.status == 'pending' && (
                            <div className="w-full">
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={payByCash}
                                        className="h-16  mx-10 mt-10  w-full bg-primary-s text-light-l text-xl font-bold rounded-lg shadow-lg"
                                    >
                                        Pay by Cash
                                    </button>
                                </div>
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={payOnline}
                                        className="h-16 mx-10 mt-4 w-full bg-primary-s text-light-l text-xl font-bold rounded-lg shadow-lg"
                                    >
                                        Pay Online
                                    </button>
                                </div>{' '}
                            </div>
                        )} */}
                    </div>
                </div>
            )}

            {transaction && (
                <button
                    onClick={back}
                    className="text-center mx-4 mb-8 p-2 text-base bg-primary-m text-white uppercase rounded-md shadow-md"
                >
                    Done
                </button>
            )}
        </div>
    );
};

TransactionModalPage.propTypes = {};

export default TransactionModalPage;
