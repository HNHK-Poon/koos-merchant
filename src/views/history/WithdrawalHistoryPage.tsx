import React from 'react'
import PropTypes from 'prop-types'
import { useOutletContext } from 'react-router-dom';
import EmptyData from '@/components/widgets/EmptyData';

const WithdrawalHistoryPage = (props:any) => {
  const context: any = useOutletContext();
    return (
        <div {...context.swipeHandler} className="grow bg-light-xl">
            <EmptyData/>
        </div>
    );
}

WithdrawalHistoryPage.propTypes = {}

export default WithdrawalHistoryPage