import React, { useEffect, useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import lottie from 'lottie-web';
import scan from '@assets/scan.json';

const QrReaderPage = (props: any) => {
    const [data, setData] = useState('No result');
    const scanElement: any = useRef();

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

    const onResult = (result: any, error: any) => {
        if (!!result) {
            setData(result?.text);
        }

        if (!!error) {
            console.info(error);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center">
                <QrReader
                    onResult={onResult}
                    className="h-screen w-screen bg-gray-500 flex justify-center items-center"
                />
                <div className="absolute h-35pc w-full top-0 bg-gray-500/50"></div>
                <div className="absolute h-35pc w-full bottom-0 bg-gray-500/50"></div>
                <div className="absolute h-30pc w-20pc top-35pc left-0 bg-gray-500/50"></div>
                <div className="absolute h-30pc w-20pc top-35pc right-0 bg-gray-500/50"></div>
                <div className=" h-30pc w-60pc ">
                    <div
                        ref={scanElement}
                        id="scan"
                    />
                </div>
                <div className="absolute bottom-10pc">
                    <p>{data}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register('itemName')} />
                        <p>{errors.itemName?.message}</p>

                        <input {...register('amount')} />
                        <p>{errors.amount?.message}</p>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

QrReaderPage.propTypes = {};

export default QrReaderPage;
