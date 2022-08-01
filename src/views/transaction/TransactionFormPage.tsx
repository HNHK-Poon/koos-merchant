import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import { HiOutlineMail, HiUserCircle, HiDocumentText } from 'react-icons/hi';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BiLockOpenAlt } from 'react-icons/bi';
import { MdShoppingCart, MdPayment } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
    useAccountService,
    useTransactionService,
} from '@/infrastructure/hook/useService';
import { transactionAdded } from '@/infrastructure/state/transaction';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Box, ListItemButton, ListItemText, TextField } from '@mui/material';
import { accountService } from '@/infrastructure/service/accountService';

interface IProps {}

interface ILocationState {
    id: string;
}

interface IMerchant {
    ShopName: string;
}

interface IPaymentMethod {
    label: 'Cash' | 'Voucher' | 'Ewallet';
}

interface ILocationState {
    userId: string;
    name: string;
}

const TransactionFormPage = (props: IProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const transactionService = useTransactionService();
    const auth = useSelector((state: { auth: any }) => state.auth);
    console.log('transactionService', transactionService);
    const accountService = useAccountService();
    const [merchant, setMerchant] = useState<IMerchant>();
    const [open, setOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] =
        useState<IPaymentMethod['label']>('Cash');
    const data: IPaymentMethod[] = [{ label: 'Cash' }, { label: 'Ewallet' }];

    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    // const id = '93a5bb5ab88442a0a0badf71b3bf60d5';
    // const { id } = location.state as ILocationState;

    // useEffect(() => {
    //     if (location.state === undefined || location.state === null) {
    //         Swal.fire({
    //             icon: 'error',
    //             text: 'Invalid QR Code',
    //             timer: 2000,
    //             showConfirmButton: false,
    //         }).then(() => {
    //             // navigate('/');
    //         });
    //         return;
    //     } else {
    //         const { userId, name } = location.state as ILocationState;
    //         alert(`${userId} ${name}`);
    //         if (userId) {
    //             setUserId(userId);
    //         }
    //         if (name) {
    //             setUsername(name);
    //         }
    //     }
    // }, [location]);

    const schema = yup
        .object({
            amount: yup
                .number()
                .positive()
                .required('Must enter a positive amount.'),
        })
        .required();

    const defaultValues = {
        amount: '',
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (value: any) => {
        console.log('submit', value, merchant?.ShopName);
        navigate('/scan', {state: {
            ProductName: merchant?.ShopName, 
            Amount: value.amount,
            PaymentType: 'Cash',
        }});    
    };

    const AmountTextField = styled(TextField)({
        '& label': {
            fontSize: '1.5rem',
        },

        '& label.Mui-focused': {
            fontSize: '1rem',
        },

        '& #filled-textarea': {
            fontSize: '2rem',
        },
    });

    useEffect(() => {
        const getAccount = async () => {
            const [err, res] = await accountService.getAccount(auth.userId);
            if (res) {
                setMerchant(res.data);
            }
            console.log('merchant', res);
        };

        getAccount();
    }, []);

    return (
        <>
            <div className="bg-light-xl fixed h-screen w-screen flex flex-col">
                <PageHeader title="Create Transaction" />
                <div className="relative grow w-full bg-light-xl">
                    <div className="absolute h-24 w-full bg-primary-m"></div>
                    <div className="absolute h-full w-full text-white mt-4">
                        <div className="text-white text-lg font-semibold px-10">
                            Request from
                        </div>
                        <div className="h-24 mx-8 mb-4 text-white bg-light-xl shadow-md text-lg font-semibold rounded-xl flex justify-start items-center">
                            <HiUserCircle className="px-2 w-16 h-16 text-dark-xs" />
                            <div className="text-xl text-dark-s font-semibold">
                                {username}
                            </div>
                        </div>
                        <form className="px-8 py-2">
                            <Controller
                                name="amount"
                                control={control}
                                render={({ field }) => (
                                    <AmountTextField
                                        {...field}
                                        color="primary"
                                        className="w-full"
                                        id="filled-textarea"
                                        label="Enter Amount (RM)"
                                        placeholder="Amount"
                                        variant="filled"
                                        type={'number'}
                                        size="medium"
                                        error={!!errors.amount}
                                        helperText={
                                            !!errors.amount ? (
                                                <span className="absolute">
                                                    {'Enter a positive amount.'}
                                                </span>
                                            ) : (
                                                <span></span>
                                            )
                                        }
                                    />
                                )}
                            />
                        </form>
                        <div className="w-full px-8 py-2">
                            <Box className="rounded-xl bg-[#f0f0f0] pb-2">
                                <ListItemButton
                                    alignItems="flex-start"
                                    onClick={() => setOpen(!open)}
                                >
                                    <ListItemText
                                        primary="Select Receiving Method"
                                        primaryTypographyProps={{
                                            fontSize: 18,
                                            color: 'black',
                                            fontWeight: 'semibold',
                                            mb: '2px',
                                        }}
                                        secondary={open ? '' : selectedMethod}
                                        secondaryTypographyProps={{
                                            noWrap: true,
                                            fontSize: 14,
                                            lineHeight: '16px',
                                            color: open
                                                ? 'rgba(0,0,0,0)'
                                                : 'black',
                                        }}
                                        sx={{ my: 0 }}
                                    />
                                </ListItemButton>
                                {open &&
                                    data.map((item) => (
                                        <ListItemButton
                                            onClick={() => {
                                                setSelectedMethod(item.label);
                                                setOpen(false);
                                            }}
                                            key={item.label}
                                            className=""
                                        >
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{
                                                    color: 'black',
                                                    fontSize: 14,
                                                    fontWeight: 'medium',
                                                }}
                                            />
                                        </ListItemButton>
                                    ))}
                            </Box>
                        </div>
                    </div>
                </div>
                <div className="w-full p-8 mb-2">
                    <button
                        onClick={handleSubmit(onSubmit)}
                        type="submit"
                        className="w-full p-4 bg-primary-m text-light-xl text-md font-bold rounded-md shadow-lg"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </>
    );
};

TransactionFormPage.propTypes = {};

export default TransactionFormPage;
