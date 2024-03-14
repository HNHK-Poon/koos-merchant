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
  productName?: number;
  paymentInfo?: string;
}

const TransactionRecord = (props: IProps) => {
  const navigate = useNavigate();
  const goToTransaction = () => {
    navigate(`/transaction/${props.id}`, { state: { isCreated: false } });
  };

  return (
    <div className="flex justify-between h-28 border-b border-gray-200 p-2">
      <div className="flex-initial w-64">
        <p className="text-gray-500 text-left text-xs ">{format(new Date(props.time), 'dd/MM/yyyy, hh:mma')}</p>
        <p className="text-gray-600 text-left font-semibold text-md pt-1 pb-2">{props.name}</p>
        <p className="text-gray-600 text-left overflow-hidden text-ellipsis whitespace-nowrap text-xs">
          {props.productName}
        </p>
      </div>

      <div className="flex items-center justify-end w-20">
        <p className="text-green-500">{`RM${props.amount}`}</p>
      </div>
    </div>
  );
};

TransactionRecord.propTypes = {};

export default TransactionRecord;
