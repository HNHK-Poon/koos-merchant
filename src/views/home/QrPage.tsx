import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'react-qr-code';
import bwipjs from 'bwip-js';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const QrPage = () => {
    const barCode: any = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // The return value is the canvas element
            const canvas = bwipjs.toCanvas('barCode', {
                bcid: 'code128', // Barcode type
                text: 'xya812a0-8axa8-shax8a', // Text to encode
                scale: 1, // 3x scaling factor
                height: 15, // Bar height, in millimeters
                includetext: true, // Show human-readable text
                textxalign: 'center', // Always good to set this
            });
        } catch (e) {
            // `e` may be a string or Error object
        }
    });

    const backToMain =() => {
      navigate('/')
    }

    return (
        <div className="relative bg-primary-s w-screen h-screen flex justify-center items-center">
            <div onClick={backToMain} className="absolute top-4 left-4 flex items-center">
                <HiOutlineChevronLeft className='w-8 h-8 text-dark-m'/>
                <p className='px-2 text-xl font-bold text-dark-m'>Back</p>
            </div>
            <div className="bg-light-xl rounded-lg overflow-hidden">
                <canvas className="py-4 m-auto" id="barCode"></canvas>
                <QRCode className="m-8" value="123" />
                <p className="text-center p-4 bg-light-s">
                    Your Balance Point: 0
                </p>
            </div>
        </div>
    );
};

QrPage.propTypes = {};

export default QrPage;
