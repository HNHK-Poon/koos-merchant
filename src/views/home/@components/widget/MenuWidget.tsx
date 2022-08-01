import React from 'react';
import PropTypes from 'prop-types';
import {
    HiOutlineQrcode,
    HiOutlineTicket,
    HiOutlineCash,
} from 'react-icons/hi';
import { AiOutlineScan } from 'react-icons/ai';
import { RiMenuFoldLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import add from '@assets/icons/icon-8/icons8-add-new-96.png';
import scan from '@assets/icons/icon-8/icons8-rectangle-96.png';
import qrCode from '@assets/icons/icon-8/icons8-qr-code-96.png';

const MenuWidget = () => {
    const navigate = useNavigate();
    const goToTopup = () => {
        navigate('/topup');
    }
    const goToQRPage = () => {
        navigate('/qrcode', { state: { balance: 'RM20' } });
    };
    const goToScan = () => {
        navigate('/scan');
        // navigate('/transaction/create');
    };
    const goToTransaction = () => {};

    return (
        <div className="flex justify-between items-center rounded-lg bg-light-xl shadow-md">
            <div className="px-4 py-2" onClick={goToTopup}>
                <img className="w-12 h-12 m-auto" src={add} alt="" />
                <p className="text-center text-dark-xs text-xs font-semibold">
                    Top Up
                </p>
            </div>
            <div className="px-4 py-2" onClick={goToScan}>
                <img className="w-12 h-12 m-auto" src={scan} alt="" />
                <p className="text-center text-dark-xs text-xs font-semibold">
                    Scan
                </p>
            </div>
            <div className="px-4 py-2" onClick={goToQRPage}>
                <img className="w-12 h-12 m-auto" src={qrCode} alt="" />
                <p className="text-center text-dark-xs text-xs font-semibold">
                    QR Code
                </p>
            </div>
        </div>
        // <div>
        //     <div
        //         onClick={goToQRPage}
        //         className="w-fit shadow-lg rounded-2xl px-4 pt-2 bg-light-xl m-auto"
        //     >
        //         <div className="flex w-fit justify-center items-center">
        //             <div>
        //                 <div className="relative bg-[#FFCB1F] w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
        //                     <div className="bg-light-xl h-8"></div>
        //                     <div className="absolute top-0">
        //                         <HiOutlineQrcode className="z-10 w-16 h-16 text-gray-600/50" />
        //                         <p className="text-center">pay</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div>
        //                 <p className="text-dark-xs/75 text-xs pl-2">
        //                     You've spent
        //                 </p>
        //                 <p className="text-dark-xs/75 text-2xl font-extrabold pl-2">
        //                     RM15.75
        //                     <span className="text-dark-xs/75 text-xs font-normal">
        //                         / RM250
        //                     </span>
        //                 </p>
        //             </div>
        //         </div>
        //         <p className="text-center my-1 text-xs text-dark-xs">
        //             Click here to pay
        //         </p>
        //     </div>
        //     <p
        //         onClick={goToTransaction}
        //         className="mt-4 p-4 text-center my-1 text-base text-dark-xs font-semibold underline"
        //     >
        //         View Transactions History
        //     </p>
        // </div>
    );
};

MenuWidget.propTypes = {};

export default MenuWidget;
