import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import EmptyData from "@/components/widgets/EmptyData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/infrastructure/state/store";
import {
	getTransactions,
	selectTransactions,
} from "@/infrastructure/state/transaction";
import TransactionRecord from "../transaction/@components/TransactionRecord";
import { useTransactionService } from "@/infrastructure/hook/useService";
import { useQuery } from "react-query";

const TransactionHistoryPage = (props: any) => {
	const context: any = useOutletContext();
	const dispatch = useDispatch<AppDispatch>();
	const transactionService = useTransactionService();

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
	console.log("transactions", transactions);
	return (
		<div {...context.swipeHandler} className="grow bg-light-xl p-4">
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
		</div>
	);
};

TransactionHistoryPage.propTypes = {};

export default TransactionHistoryPage;
