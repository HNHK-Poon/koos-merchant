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
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const HomePage = () => {
    const rest = useRest().authService;
    // const { data, error, loaded } = useRestAsync(() => rest.login(123));
    const { t } = useTranslation();
    const waveElement: any = useRef();
    const navigate = useNavigate();
    const [socket, setSocket]: any = useState(null);

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
        console.log('token', Cookies.get('token'));
        if (!Cookies.get('token')) {
            Swal.fire({
                title: 'Loading',
                text: 'Sign in before proceed.',
                timer: 3000,
                didOpen: () => {
                    Swal.showLoading();
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer');
                }
                navigate('/login');
            });
        }else{
            navigate('/qrcode');
        }
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
                        <div className="flex w-fit justify-center items-center">
                            <div>
                                <div className="relative bg-[#FFCB1F] w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                                    <div className="bg-light-xl h-8"></div>
                                    <div
                                        ref={waveElement}
                                        id="wave2"
                                        className="w-16 bg-light-l"
                                    />
                                    <div className="absolute top-0">
                                        <HiOutlineQrcode className="z-10 w-16 h-16 text-gray-600/50" />
                                        <p className="text-center">pay</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-dark-xs/75 text-xs pl-2">
                                    You've spent
                                </p>
                                <p className="text-dark-xs/75 text-2xl font-extrabold pl-2">
                                    RM15.75
                                    <span className="text-dark-xs/75 text-xs font-normal">
                                        / RM250
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="text-center my-1 text-xs text-dark-xs">
                            Click here to pay
                        </p>
                    </div>
                </div>

                {/* <QrButton /> */}
                {/* <QRCode value="123" /> */}
                <div className="absolute p-8 top-30pc w-full h-30pc">
                    <p className='text-bold text-xl py-2 font-bold text-dark-xs'>Categories</p>
                    <div className='w-full h-full bg-light-m rounded-xl'></div>
                </div>

                <div className="absolute p-8 top-60pc w-full h-30pc">
                <p className='text-bold text-xl py-2 font-bold text-dark-xs'>Promotions</p>
                    <div className='w-full h-full bg-light-m rounded-xl'></div>
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
