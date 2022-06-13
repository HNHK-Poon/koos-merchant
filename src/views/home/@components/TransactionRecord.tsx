import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineMoreVert } from 'react-icons/md';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

interface IProps {
    id: string;
    user: string;
    name: string;
    time: string;
    amount: string;
    status: string;
}

const TransactionRecord = (props: IProps) => {
    const navigate = useNavigate();
    const goToTransaction = () => {
        navigate('/transactionmodal', { state: { id: props.id } });
    };
    return (
        <div
            onClick={goToTransaction}
            className="flex justify-between items-center p-2 rounded-md shadow-md"
        >
            <div className="text-left text-dark-l">
                <p className="text-lg font-semibold py-1">{props.id.slice(0,12)}</p>
                <p className="text-xs">{props.name}</p>
            </div>
            <div className="text-right text-dark-l">
                <p
                    className={classNames('text-lg font-semibold py-1', {
                        'text-orange-500': props.status == 'Pending',
                        'text-red-500': props.status == 'Failed',
                    })}
                >
                    {props.status != 'success' ? props.status : props.amount}
                </p>
                <p className="text-xs">{props.time}</p>
            </div>
        </div>
    );
};

TransactionRecord.propTypes = {};

export default TransactionRecord;
