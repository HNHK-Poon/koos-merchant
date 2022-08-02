import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import lottie from 'lottie-web';
import scan from '@assets/scan.json';
import PageHeader from '@/components/PageHeader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTransactionService } from '@/infrastructure/hook/useService';
import { useSelector } from 'react-redux';

interface ILocationState {
    ProductName: string;
    Amount: number;
    PaymentType: string;
}

const QrReaderPage = (props: any) => {
    const [data, setData] = useState('No result');
    const location = useLocation();
    const navigate = useNavigate();
    const scanElement: any = useRef();
    const auth = useSelector((state: { auth: any }) => state.auth);
    const [isLoading, setIsLoading] = useState(true);
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState(0);
    const [paymentType, setPaymentType] = useState('');
    const transactionService = useTransactionService();

    useEffect(() => {
        if (location.state === undefined || location.state === null) {
            navigate('/');
            return;
        } else {
            const { Amount, PaymentType, ProductName } =
                location.state as ILocationState;
            if (
                Amount !== undefined &&
                PaymentType !== undefined &&
                ProductName !== undefined
            ) {
                setAmount(Amount);
                setPaymentType(PaymentType);
                setProductName(ProductName);
            }
            lottie.loadAnimation({
                container: document.querySelector('#scan')
                    ? document.querySelector('#scan')
                    : scanElement,
                animationData: scan,
            });
            setIsLoading(false);
        }
    }, [location]);

    const onResult = async (result: any, error: any) => {
        if (!!result) {
            const resultJson = JSON.parse(result?.text);
            // navigate('/transaction/create', {
            //     state: {
            //         userId: resultJson.userId,
            //         name: resultJson.name,
            //     },
            // });
            alert(
                JSON.stringify({
                    ProductName: productName, //e43f28b5a412414e8c9056bf961394a8
                    UserId: resultJson.userId,
                    Amount: amount,
                    PaymentType: paymentType,
                })
            );
            const [err, res] = await transactionService.createTransaction({
                ProductName: productName, //e43f28b5a412414e8c9056bf961394a8
                UserId: resultJson.userId,
                Amount: amount,
                PaymentType: paymentType,
            });
            if (res) {
                alert(`success ${resultJson.userId} ${amount}`);
            }
            if (err) {
                alert(err);
            }
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
                    {amount && paymentType && productName && (
                        <>
                            <QrReader
                                constraints={{
                                    facingMode: { exact: 'environment' },
                                }}
                                onResult={onResult}
                                className="w-full h-full bg-gray-500 flex justify-center items-center"
                            />
                        </>
                    )}
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
