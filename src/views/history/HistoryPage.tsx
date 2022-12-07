import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import classNames from 'classnames';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

const HistoryPage = (props: any) => {
    const numPage = 3;
    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState(0);

    const swipeHandler = useSwipeable({
        onSwipedLeft: (eventData) => {
            setPageIndex(pageIndex < numPage - 1 ? pageIndex + 1 : pageIndex);
        },
        onSwipedRight: (eventData) =>
            setPageIndex(pageIndex > 0 ? pageIndex - 1 : pageIndex),
    });

    const toTransactionPage = () => {
        setPageIndex(0);
    };
    const toTransferPage = () => {
        setPageIndex(1);
    };
    const toTopUpPage = () => {
        setPageIndex(1);
    };
    const toWithdrawalPage = () => {
        setPageIndex(2);
    };

    useEffect(() => {
        if (pageIndex == 0) {
            navigate('transaction');
        } else if (pageIndex == 1) {
            navigate('topup');
        } else if (pageIndex == 2) {
            navigate('withdrawal');
        }
    }, [pageIndex]);
    return (
        <div className="">
            <PageHeader title="History" path="/">
                <div className="w-screen">
                    <ul className="flex w-screen overflow-x-auto scrollbar-hide -mb-px text-lg font-semibold text-center text-white bg-primary-m">
                        <li className="mr-4">
                            <Link
                                to={'transaction'}
                                onClick={toTransactionPage}
                                className={classNames(
                                    'inline-flex p-4 rounded-t-lg border-b-2 border-transparent group',
                                    {
                                        'text-xl font-semibold border-b-8 border-light-xl':
                                            pageIndex == 0,
                                    }
                                )}
                            >
                                Transaction
                            </Link>
                        </li>
                        {/* <li className="mr-4">
                        <Link
                            to={'topup'}
                            onClick={toTopUpPage}
                            className={classNames(
                                'inline-flex p-4 rounded-t-lg border-b-2 border-transparent group whitespace-nowrap',
                                {
                                    'text-xl font-semibold border-b-8 border-light-xl': pageIndex == 1,
                                }
                            )}
                        >
                            Top Up
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link
                            to={'withdrawal'}
                            onClick={toWithdrawalPage}
                            className={classNames(
                                'inline-flex p-4 rounded-t-lg border-b-2 border-transparent group',
                                {
                                    'text-xl font-semibold border-b-8 border-light-xl': pageIndex == 2,
                                }
                            )}
                        >
                            Withdrawal
                        </Link>
                    </li> */}
                    </ul>
                </div>
                <Outlet context={{ swipeHandler }} />
            </PageHeader>
        </div>
    );
};

HistoryPage.propTypes = {};

export default HistoryPage;
