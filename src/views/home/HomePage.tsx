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
import TransactionRecord from './@components/TransactionRecord';
import { selectTransactions } from '@/infrastructure/state/transaction';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const rest = useRest().authService;
    // const { data, error, loaded } = useRestAsync(() => rest.login(123));
    const { t } = useTranslation();
    const waveElement: any = useRef();
    const navigate = useNavigate();
    const [socket, setSocket]: any = useState(null);
    const transactions = useSelector(selectTransactions);

    // const transactions = [
    //     {
    //         user: 'Peter',
    //         product: 'Item A',
    //         amount: 'RM50.00',
    //         status: 'Pending',
    //         time: '7 minutes ago',
    //     },
    // ];

    // console.log('home', data, error, loaded);

    useEffect(() => {
        // setSocket(io('ws://localhost:3030'));

        lottie.loadAnimation({
            container: document.querySelector('#wave')
                ? document.querySelector('#wave')
                : waveElement,
            animationData: wave,
        });
        lottie.loadAnimation({
            container: document.querySelector('#wave2')
                ? document.querySelector('#wave2')
                : waveElement,
            animationData: payWave,
        });
        // Swal.fire({
        //     title: 'Loading',
        //     didOpen: () => {
        //         Swal.showLoading();
        //     },
        // }).then((result) => {
        //     /* Read more about handling dismissals below */
        //     if (result.dismiss === Swal.DismissReason.timer) {
        //         console.log('I was closed by the timer');
        //     }
        // });
    }, []);

    // useEffect(() => {
    //     if (socket) {
    //         socket.on('connect', () => {
    //             console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
    //             socket.emit('join', {room:"notification"})
    //             socket.emit('join', {room:sessionStorage.getItem('uid')})
    //         });

    //         socket.on('notification', (msg: any) => {
    //             Swal.fire({
    //                 text: msg.text,
    //                 timer: 2000,
    //                 showConfirmButton: false
    //             })
    //         })
    //     }
    // }, [socket]);

    // if (error) {
    //     Swal.fire({
    //         title: 'Error',
    //         timer: 1000,
    //         didOpen: () => {
    //             Swal.showLoading();
    //         },
    //     }).then((result) => {
    //         /* Read more about handling dismissals below */
    //         if (result.dismiss === Swal.DismissReason.timer) {
    //             console.log('I was closed by the timer');
    //         }
    //     });
    // }

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
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <>
            <div className="relative h-screen bg-light-l">
                <div
                    onClick={signOut}
                    className="absolute top-4 right-4 z-10 p-3 rounded-full bg-light-s shadow-md"
                >
                    <RiUserSettingsLine className="w-6 h-6 text-dark-l" />
                </div>
                <div className="relative bg-primary-m h-60">
                    <div
                        ref={waveElement}
                        id="wave"
                        className="w-screen absolute bottom-0 translate-y-2"
                    />
                </div>

                <div
                    onClick={goToQRPage}
                    className="absolute w-full top-40 flex justify-center"
                >
                    <div className="w-fit shadow-lg rounded-2xl px-4 pt-2 bg-light-xl">
                        <div className="flex w-fit justify-center items-center m-auto">
                            <div>
                                <div className="relative bg-light-m w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="absolute top-0">
                                        <AiOutlineScan className="z-10 w-16 h-16 text-gray-600/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center my-1 text-xs text-dark-xs">
                            Click here to scan
                        </p>
                    </div>
                </div>

                {/* <QrButton /> */}
                {/* <QRCode value="123" /> */}
                <div className="absolute p-8 top-30pc w-full h-60pc">
                    <p className="text-bold text-xl py-2 font-bold text-dark-xs">
                        Transactions
                    </p>
                    <div className="w-full h-full bg-light-l rounded-xl p-4">
                        {transactions.map((transaction, i) => {
                            return (
                                <TransactionRecord
                                    key={i}
                                    id={transaction.id}
                                    user={transaction.user}
                                    merchant={transaction.merchant}
                                    name={transaction.name}
                                    time={transaction.time.toString()}
                                    amount={transaction.amount.toString()}
                                    status={transaction.status}
                                />
                            );
                        })}
                    </div>
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
