import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import { HiOutlineMail, HiUserCircle, HiDocumentText } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiLockOpenAlt } from 'react-icons/bi';
import { MdShoppingCart, MdPayment } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface IProps {}

const TransactionFormPage = (props: IProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const schema = yup
        .object({
            itemName: yup.string().required('Must enter product name.'),
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
        amount: '',
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

    const onSubmit = (data: any) => {
        Swal.fire({
            icon: 'success',
            title: t('auth.alert.signinSuccessText'),
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <>
            <div className="bg-light-xl h-screen w-screen">
                <PageHeader title="Create Transaction" />
                <div className="relative mt-[56px] h-48 w-full bg-light-xl">
                    <div className="absolute h-36 w-full bg-primary-s"></div>
                    <div className="absolute h-full w-full text-white">
                        <div className="text-white text-lg font-semibold h-16 pt-8 px-10">
                            Request From
                        </div>
                        <div className="h-32 mx-10 text-white bg-light-xl shadow-md text-lg font-semibold rounded-xl flex justify-start items-center">
                            <HiUserCircle className="px-2 w-16 h-16 text-dark-xs" />
                            <div className="text-xl text-dark-s font-semibold">
                                {'Poon Hoon Keng'}
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                            <div className="px-2 py-2 mt-4 w-full bg-light-m rounded-full shadow-lg">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 p-2 rounded-full bg-light-s">
                                        <MdShoppingCart className="w-8 h-8 text-primary-l" />
                                    </div>
                                    <div>
                                        <input
                                            {...register('itemName')}
                                            placeholder={t(
                                                'transaction.form.itemName'
                                            )}
                                            className="p-2 bg-light-m w-full rounded-md focus:outline-none text-xl text-dark-m"
                                        />
                                        <p className="px-2 text-red-600">
                                            {errors.itemName?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2 py-2 mt-4 w-full bg-light-m rounded-full shadow-lg">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 p-2 rounded-full bg-light-s">
                                        <HiDocumentText className="w-8 h-8 text-primary-l" />
                                    </div>
                                    <div>
                                        <input
                                            {...register('description')}
                                            type="text"
                                            placeholder={t(
                                                'transaction.form.description'
                                            )}
                                            className="p-2 bg-light-m w-full rounded-md focus:outline-none text-xl text-dark-m"
                                        />
                                        <p className="px-2 text-red-600">
                                            {errors.description?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-2 py-2 mt-4 w-full bg-light-m rounded-full shadow-lg">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 p-2 rounded-full bg-light-s">
                                        <MdPayment className="w-8 h-8 text-primary-l" />
                                    </div>
                                    <div>
                                        <input
                                            {...register('amount')}
                                            type="text"
                                            placeholder={t(
                                                'transaction.form.amount'
                                            )}
                                            className="p-2 bg-light-m w-full rounded-md focus:outline-none text-xl text-dark-m"
                                        />
                                        <p className="px-2 text-red-600">
                                            {errors.amount?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="h-16 mt-4 w-full bg-primary-m text-light-l text-xl font-bold rounded-full shadow-lg"
                            >
                                {t('transaction.form.submitButtonText')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

TransactionFormPage.propTypes = {};

export default TransactionFormPage;
