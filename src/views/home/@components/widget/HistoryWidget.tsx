import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getWalletBalance, selectAsset } from "@/infrastructure/state/asset";
import {
	useTransactionService,
	useWalletService,
} from "@/infrastructure/hook/useService";
import { useNavigate } from "react-router-dom";
import {
	getTransactions,
	selectTransactions,
} from "@/infrastructure/state/transaction";
import TransactionRecord from "@/views/transaction/@components/TransactionRecord";
import { useQuery } from "react-query";
import EmptyData from "@/components/widgets/EmptyData";

const HistoryWidget = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const asset = useSelector(selectAsset);
	const walletSerice: any = useWalletService();
	const transactionService = useTransactionService();
	console.log("asset", asset);

	useEffect(() => {
		dispatch(getWalletBalance(walletSerice.getBalance) as any);
	}, [dispatch]);

	const {
		isLoading,
		isError,
		data: transactions,
		error,
		isSuccess,
	} = useQuery<any, Error>(
		["history", { category: "transactions" }],
		() => transactionService.getTransactions(),
		{ staleTime: 60000 }
	);

	if (isSuccess) {
		console.log("successfully get own", transactions);
	}
	if (isLoading) {
		console.log("loading");
	}
	if (isError) {
		console.log("error", error);
	}

	return (
		<div className="flex flex-col w-full justify-center items-center">
			<p className="w-full text-left text-primary-xl text-base font-semibold">
				Latest Transactions
			</p>
			{isLoading && <div>Loading...</div>}
			{isError && <div>Error</div>}
			{isSuccess &&
				transactions &&
				transactions.data &&
				transactions.length <= 0 && <EmptyData />}
			{isSuccess &&
				transactions &&
				transactions.data &&
				transactions.data.length > 0 &&
				transactions.data.map((transaction: any, idx: any) => {
					return (
						<TransactionRecord
							key={idx}
							id={transaction.transactionId}
							name={transaction.productName}
							amount={`${transaction.amount.toFixed(2)}`}
							status={transaction.status}
							user={transaction.userId}
							time={transaction.createdDateTime}
							paymentType={transaction.paymentType}
						/>
					);
				})}
			{/* <p className='text-light-m text-xs -mt-1'>RM{asset.Amount.toFixed(2)} in cash</p> */}
		</div>
	);
};

HistoryWidget.propTypes = {};

export default HistoryWidget;
