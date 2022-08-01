import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineMoreVert } from 'react-icons/md';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface IProps {
    id: string;
    user: string;
    name: string;
    time: string;
    amount: string;
    status: number;
    paymentType?: number;
    paymentInfo?: string;
}

const TransactionRecord = (props: IProps) => {
    const navigate = useNavigate();
    const goToTransaction = () => {
        navigate(`/transaction/${props.id}`, { state: { isCreated: false } });
    };

    return (
        <div
            onClick={goToTransaction}
            className="flex justify-between items-center my-1.5 p-3 rounded-md shadow-sm w-full "
        >
            <div className="text-left text-dark-l">
                <p className="text-lg py-1">{props.name}</p>
                {(props.paymentType===0 || props.paymentType===1) && (
                    <p className="text-xs font-light">
                        {props.paymentType == 0 ? 'Cash Payment' : 'Payment'}
                    </p>
                )}
                {props.paymentInfo && (
                    <p className="text-xs font-light">
                        {props.paymentInfo}
                    </p>
                )}
            </div>
            <div className="text-right text-dark-l">
                <p
                    className={classNames(
                        'text-lg font-semibold py-1 text-primary-l'
                    )}
                >
                    {`RM${props.amount}`}
                </p>
                <p className="font-light text-xs">
                    {format(new Date(props.time), 'dd/MM, hh:mma')}
                </p>
            </div>
        </div>
    );
};

TransactionRecord.propTypes = {};

export default TransactionRecord;
