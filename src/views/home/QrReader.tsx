import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import lottie from 'lottie-web';
import scan from '@assets/scan.json';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';

const QrReaderPage = (props: any) => {
    const [data, setData] = useState('No result');
    const navigate = useNavigate();
    const scanElement: any = useRef();

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector('#scan')
                ? document.querySelector('#scan')
                : scanElement,
            animationData: scan,
        });
    }, []);

    const onResult = (result: any, error: any) => {
        if (!!result) {
            const resultJson = JSON.parse(result?.text);
            navigate('/transaction/create', {
                state: {
                    merchantId: resultJson.merchantId,
                    name: resultJson.name,
                },
            });
        }

        if (!!error) {
            console.info(error);
        }
    };

    return (
        <>
            <div className="w-screen h-screen flex flex-col">
                <PageHeader title="Back" />
                <div className="flex justify-center items-center w-full grow">
                    <QrReader
                        constraints={{
                            facingMode: { exact: 'environment' },
                        }}
                        onResult={onResult}
                        className="w-full h-full bg-gray-500 flex justify-center items-center"
                    />
                    <div className="absolute h-35pc w-full top-0 bg-gray-500/50"></div>
                    <div className="absolute h-35pc w-full bottom-0 bg-gray-500/50"></div>
                    <div className="absolute h-30pc w-20pc top-35pc left-0 bg-gray-500/50"></div>
                    <div className="absolute h-30pc w-20pc top-35pc right-0 bg-gray-500/50"></div>
                    <div className="absolute h-30pc w-60pc ">
                        <div ref={scanElement} id="scan" />
                    </div>
                </div>
            </div>
        </>
    );
};

QrReaderPage.propTypes = {};

export default QrReaderPage;
