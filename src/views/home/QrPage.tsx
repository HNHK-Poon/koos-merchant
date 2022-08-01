import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import bwipjs from 'bwip-js';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import { getWalletBalance, selectAsset } from '@/infrastructure/state/asset';
import { useAccountService, useWalletService } from '@/infrastructure/hook/useService';
import { useDispatch } from 'react-redux';
import PageHeader from '@/components/PageHeader';
import { getAccount, selectAccount } from '@/infrastructure/state/account';

const QrPage = ({ route }: any) => {
    const barCode: any = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(selectAccount);
    const walletSerice: any = useWalletService();
    const accountService: any = useAccountService();
    const auth = useSelector((state: { auth: any }) => state.auth);
    const [qrCodeValue, setQrCodeValue] = useState('');

    console.log('auth', auth);

    const { state }: any = useLocation();
    console.log('state', state);

    useEffect(() => {
        dispatch(getAccount(() => accountService.getAccount(auth.userId)) as any);
        dispatch(getWalletBalance(walletSerice.getBalance) as any);
        try {
            // The return value is the canvas element
            const canvas = bwipjs.toCanvas('barCode', {
                bcid: 'code128', // Barcode type
                text: auth.userId
                    ? auth.userId.slice(0, 12)
                    : 'xya812a0-8axa8-shax8a', // Text to encode
                scale: 1, // 3x scaling factor
                height: 15, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: 'center', // Always good to set this
            });
        } catch (e) {
            // `e` may be a string or Error object
        }
    }, []);

    useEffect(() => {
        console.log("QR", auth.userId, auth.name)
        // setQrCodeValue(JSON.stringify({
        //     merchantId: auth.userId,
        //     name: auth.name,
        // }));
        setQrCodeValue(`https://koosbonus.com/?prm=0&merchant=${auth.userId}&name=${auth.name}`);
    }, [auth])

    const backToMain = () => {
        navigate('/');
    };

    return (
        <div className="relative bg-primary-m w-screen h-screen flex justify-center items-center flex flex-col">
            <PageHeader title="Back" path='/'/>
            <div className="grow flex flex-col justify-center items-center">
                <div className="w-full p-4 mb-2 bg-light-xl rounded-lg shadow-md text-center">
                    <p>{account.ShopName}</p>
                </div>
                <div className="bg-light-xl rounded-lg overflow-hidden">
                    <canvas className="py-4 m-auto" id="barCode"></canvas>
                    <QRCode className="m-8" value={qrCodeValue} />
                </div>
            </div>
        </div>
    );
};

QrPage.propTypes = {};

export default QrPage;
