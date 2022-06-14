import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import lottie from 'lottie-web';
import scan from '@assets/scan2.json';
import { useNavigate } from 'react-router-dom';

const QrReaderPage = (props: any) => {
    const [data, setData] = useState('No result');
    const scanElement: any = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector('#scan')
                ? document.querySelector('#scan')
                : scanElement,
            animationData: scan,
        });
    }, []);

    const schema = yup
        .object({
            itemName: yup.string().required(),
            description: yup.string(),
            amount: yup
                .number()
                .positive()
                .required('Must enter a positive amount.'),
        })
        .required();

    const defaultValues = {
        itemName: '',
        description: '',
        amount: 0,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {};

    const back = () => {
        navigate(-1)
        // navigate('/transactionform', { state: { id: '123'} });
    };

    const onResult = (result: any, error: any) => {
        if (!!result) {
            setData(result?.text);
            navigate('/transactionform', { state: { id: result?.text } });
        }

        if (!!error) {
            console.info(error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="absolute h-35pc w-full top-0 bg-black/50 z-20"></div>
                <div className="absolute h-35pc w-full bottom-0 bg-black/50 z-20"></div>
                <div className="absolute h-30pc w-20pc md:w-40pc top-35pc left-0 bg-black/50 z-20"></div>
                <div className="absolute h-30pc w-20pc md:w-40pc top-35pc right-0 bg-black/50 z-20"></div>
                <div className="absolute top-30pc text-white font-semibold z-30">
                    Scan QR Code
                </div>
                <div className="relative">
                    <QrReader
                        onResult={onResult}
                        constraints={{ facingMode: 'environment' }}
                        className="h-screen w-screen bg-black flex justify-center items-center"
                    />
                    <div className="absolute left-50pc top-50pc -translate-x-1/2 -translate-y-1/2 h-64 w-64 md:h-128 md:w-128 max-w-128 max-h-128 overflow-hidden">
                        <div ref={scanElement} id="scan" />
                    </div>
                </div>
                <div onClick={back} className="absolute bottom-5pc z-30">
                    <button className="w-full md:w-40pc text-center font-semibold rounded-full bg-primary-s py-2 px-8 text-white">
                        Back
                    </button>
                </div>
                {/* <div className="absolute bottom-10pc">
                    <p>{data}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register('itemName')} />
                        <p>{errors.itemName?.message}</p>

                        <input {...register('amount')} />
                        <p>{errors.amount?.message}</p>

                        <button type="submit">Submit</button>
                    </form>
                </div> */}
            </div>
        </>
    );
};

QrReaderPage.propTypes = {};

export default QrReaderPage;
