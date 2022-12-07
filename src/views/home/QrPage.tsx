import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import bwipjs from 'bwip-js';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import { getWalletBalance, selectAsset } from '@/infrastructure/state/asset';
import {
    useAccountService,
    useWalletService,
} from '@/infrastructure/hook/useService';
import { useDispatch } from 'react-redux';
import PageHeader from '@/components/PageHeader';
import { getAccount, selectAccount } from '@/infrastructure/state/account';
import { useQuery } from 'react-query';

const QrPage = ({ route }: any) => {
    const barCode: any = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector(selectAccount);
    const walletSerice: any = useWalletService();
    const accountService: any = useAccountService();
    const auth = useSelector((state: { auth: any }) => state.auth);
    const [qrCodeValue, setQrCodeValue] = useState('');

    console.log('auth', auth, account);

    const { state }: any = useLocation();
    console.log('state', state);

    const {
        isLoading,
        isError,
        data: merchant,
        error,
        isSuccess,
    } = useQuery<any, Error>(
        ['merchant', { id: auth.userId }],
        () => accountService.getMerchantOwn(),
        { staleTime: 60000 }
    );

    if (isSuccess) {
        console.log('successfully get own', merchant);
    }

    useEffect(() => {
        // dispatch(
        //     getAccount(() => accountService.getAccount(auth.userId)) as any
        // );
        dispatch(getWalletBalance(walletSerice.getBalance) as any);
    }, []);

    useEffect(() => {
        console.log('QR', auth.userId, auth.name);
        // setQrCodeValue(JSON.stringify({
        //     merchantId: auth.userId,
        //     name: auth.name,
        // }));
        setQrCodeValue(
            `https://koosbonus.com/?prm=0&merchant=${auth.userId}&name=${auth.name}`
        );
        const timestamp = (new Date().getTime() * 3).toString();
        try {
            let canvas = document.createElement('canvas');
             bwipjs.toCanvas('barCode', {
                bcid: 'code128', // Barcode type
                text:
                    timestamp.substring(0, 3) +
                    ' ' +
                    timestamp.substring(3, 9) +
                    ' ' +
                    timestamp.substring(9, 13), // Text to encode
                scale: 1, // 3x scaling factor
                height: 20, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: 'center', // Always good to set this
            });
        } catch (e) {
            // `e` may be a string or Error object
        }
    }, [auth]);

    const backToMain = () => {
        navigate('/');
    };

    return (
        <div className="">
            <PageHeader title="Back" path="/" childrenStyle="bg-primary-m">
                <div className="flex flex-col justify-center items-center p-4 h-full">
                    {isLoading && <div>Loading...</div>}
                    {isError && <div>Error: {error.message}</div>}
                    {isSuccess && (
                        <React.Fragment>
                            <div className="w-full p-4 mb-2 bg-light-xl rounded-lg shadow-md text-center text-2xl">
                                <p>{merchant.data.shopName}</p>
                            </div>
                            <div className="bg-light-xl flex flex-col justify-center items-center rounded-lg overflow-hidden w-full p-8 mb-[100px]">
                                {/* <canvas
                                    className="py-4 m-auto"
                                    id="barCode"
                                ></canvas> */}
                                {/* <QRCode className="" value={qrCodeValue} /> */}
                                <img
                                    className="max-w-[500px] max-h-[500px] w-full h-full rounded-lg"
                                    src={merchant.data.images.qrCode.url}
                                    alt=""
                                />
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </PageHeader>
        </div>
    );
};

QrPage.propTypes = {};

export default QrPage;
