import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRest } from '@hook/useRest';
import { useRestAsync } from '@/infrastructure/hook/useRestAsync';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import lottie from 'lottie-web';
import wave from '@assets/wave3.json';
import payWave from '@assets/payWave.json';
import QRCode from 'react-qr-code';
import { HiOutlineQrcode } from 'react-icons/hi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { AiOutlineScan } from 'react-icons/ai';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { getTransactions, selectTransactions } from '@/infrastructure/state/transaction';
import { useDispatch, useSelector } from 'react-redux';
import AssetWidget from './@components/widget/AssetWidget';
import MenuWidget from './@components/widget/MenuWidget';
import ProfileWidget from './@components/widget/ProfileWidget';
import BlockWidget from './@components/widget/BlockWidget';
import { getBlockProperties, getBlocks, getCurrentBlock } from '@/infrastructure/state/block';
import { useBlockService, useTransactionService } from '@/infrastructure/hook/useService';
import HistoryWidget from './@components/widget/HistoryWidget';

const HomePage = () => {
    const rest = useRest().authService;
    // const { data, error, loaded } = useRestAsync(() => rest.login(123));
    const { t } = useTranslation();
    const waveElement: any = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [socket, setSocket]: any = useState(null);
    const transactions = useSelector(selectTransactions);
    const blockService = useBlockService()
    const transacationService = useTransactionService();

    useEffect(() => {
        dispatch(getBlocks(blockService.getBlocks) as any);
        dispatch(getBlockProperties(blockService.getBlockProperties) as any);
        dispatch(getCurrentBlock(blockService.getCurrentBlock) as any);
        dispatch(getTransactions(transacationService.getTransactions) as any);
    }, []);

    const goToQRPage = () => {
        navigate('/qrreader');
        // console.log('token', Cookies.get('token'));
        // if (!Cookies.get('token')) {
        //     Swal.fire({
        //         title: 'Loading',
        //         text: 'Sign in before proceed.',
        //         timer: 3000,
        //         didOpen: () => {
        //             Swal.showLoading();
        //         },
        //     }).then((result) => {
        //         /* Read more about handling dismissals below */
        //         if (result.dismiss === Swal.DismissReason.timer) {
        //             console.log('I was closed by the timer');
        //         }
        //         navigate('/login');
        //     });
        // }else{
        //     navigate('/qrcode');
        // }
    };

    const signOut = () => {
        Cookies.remove('koos_merchant_token');
        navigate('/login');
    };

    return (
        <>
            <div className="relative h-screen bg-light-xl overflow-y">
                <div className="absolute top-4 right-4 z-10 p-3 rounded-full bg-light-xl shadow-md">
                    <ProfileWidget />
                </div>
                <div className="absolute bg-gradient-to-b from-primary-mg to-primary-m w-full h-20pc">
                    {/* <div
                        ref={waveElement}
                        id="wave"
                        className="w-screen absolute bottom-0 translate-y-2"
                    /> */}
                </div>
                <div className="absolute w-full top-5pc top-4 z-10">
                    <AssetWidget />
                </div>
                <div className="absolute top-15pc w-90pc mx-5pc z-20">
                    <MenuWidget />
                </div>
                <div className="absolute top-30pc w-90pc mx-5pc z-10">
                    <BlockWidget />
                </div>
                <div className="absolute top-50pc w-90pc mx-5pc z-10">
                    <HistoryWidget />
                </div>
            </div>
        </>
    );
};

function QrButton() {
    const navigate = useNavigate();
    const showQR = () => {
        navigate('qrcode');
    };
    return (
        <div className="absolute w-full top-60 flex justify-center items-center">
            <div className="relative w-80pc h-16 rounded-xl bg-gray-200/75 overflow-hidden flex justify-center items-center">
                <button onClick={showQR} className="font-bold text-2xl">
                    Pay
                </button>
                <div className="absolute top-90pc left-0 h-10pc w-55pc bg-yellow-500"></div>
                <div className="absolute top-90pc left-55pc h-10pc w-45pc bg-gray-300"></div>
            </div>
        </div>
    );
}

export default HomePage;
function useTransacationService() {
    throw new Error('Function not implemented.');
}

