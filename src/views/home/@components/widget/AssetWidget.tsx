import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getWalletBalance, selectAsset } from "@/infrastructure/state/asset";
import { useWalletService } from "@/infrastructure/hook/useService";
import { useNavigate } from "react-router-dom";

const AssetWidget = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const asset = useSelector(selectAsset);
	const walletSerice: any = useWalletService();
	console.log("asset", asset);

	useEffect(() => {
		dispatch(getWalletBalance(walletSerice.getBalance) as any);
	}, [dispatch]);
	return (
		<div className="flex flex-col justify-center items-center">
			<p className="text-light-xl text-base font-semibold">Total Assets</p>
			<p className="text-4xl font-bold text-light-xl -mt-2">
				RM{asset.amount.toFixed(2)}
			</p>
			{/* <p className='text-light-m text-xs -mt-1'>RM{asset.Amount.toFixed(2)} in cash</p> */}
		</div>
	);
};

AssetWidget.propTypes = {};

export default AssetWidget;
