import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/components/PageHeader';
import {
    Box,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
} from '@mui/material';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useWalletService } from '@/infrastructure/hook/useService';

interface IPaymentMethod {
    label: 'E-wallet' | 'IPay88' | 'Cash';
}

const TopUpPage = (props: any) => {
    const walletService = useWalletService();
    const [open, setOpen] = useState(false);
    const [selectedMethod, setSelectedMethod] =
        useState<IPaymentMethod['label']>('IPay88');
    const data: IPaymentMethod[] = [{ label: 'IPay88' }, { label: 'E-wallet' }];

    const schema = yup
        .object({
            amount: yup
                .number()
                .positive()
                .required('Must enter a positive amount.'),
        })
        .required();

    const { register, handleSubmit, setValue, control, formState } = useForm({
        resolver: yupResolver(schema),
    });

    const { errors } = formState;

    const onSubmit = async (data: any) => {
        const payload = {
            Amount: data.amount,
            TransactionType: 0,
            AttachmentId: 'string',
            ToWalletId: 'string',
            FromType: 0,
            ToType: 0,
            ActionBankInfo: selectedMethod,
        };
        const [walletTransactionErr, walletTransactionRes] =
            await walletService.topup(payload);
        if (walletTransactionRes) {
            console.log(
                walletTransactionErr,
                walletTransactionRes,
                walletTransactionRes.data.WalletTransactionId
            );
            const [err, res] = await walletService.verifyTopup({
                WalletTransactionId:
                    walletTransactionRes.data.WalletTransactionId,
            });
            console.log(res);
        }
    };
    const defaultAmounts = [
        {
            label: 'RM50',
            amount: 50,
        },
        {
            label: 'RM100',
            amount: 100,
        },
        {
            label: 'RM250',
            amount: 250,
        },
        {
            label: 'RM500',
            amount: 500,
        },
        {
            label: 'RM1000',
            amount: 1000,
        },
        {
            label: 'Other',
            amount: 0,
        },
    ];

    const DefaultAmountWidget = (props: { label: string; amount: number }) => {
        const fillAmount = () => {
            if (document.getElementById('filled-textarea')) {
                if (props.amount <= 0) {
                    document.getElementById('filled-textarea')?.focus();
                }
            }
            setValue('amount', props.amount);
            document.getElementById('filled-textarea')?.focus();
            console.log('fillAmount', props.amount);
        };
        return (
            <button
                onClick={fillAmount}
                className="p-2 w-full border-2 border-primary-m rounded-md text-base text-primary-m"
            >
                {props.label}
            </button>
        );
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

    return (
        <div className="">
            <PageHeader title="Top Up">
                <div className="flex flex-col">
                    <div className="w-full p-8">
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
                        {/* <AmountTextField
                        color="primary"
                        className="w-full"
                        id="filled-textarea"
                        label="Enter Amount (RM)"
                        placeholder="Amount"
                        variant="filled"
                        type={'number'}
                        size="medium"
                        {...register('amount')}
                    /> */}
                        {/* <p className="px-2 text-red-600">
                        {errors.amount?.message}
                    </p> */}
                    </div>
                    <div className="w-full px-8 grid grid-cols-3 md:grid-cols-6 gap-2">
                        {defaultAmounts.map((amount: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex justify-center items-center"
                                >
                                    <DefaultAmountWidget {...amount} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full p-8">
                        <Box className="rounded-xl bg-[#f0f0f0] pb-2">
                            <ListItemButton
                                alignItems="flex-start"
                                onClick={() => setOpen(!open)}
                            >
                                <ListItemText
                                    primary="Select Payment Method"
                                    primaryTypographyProps={{
                                        fontSize: 18,
                                        fontWeight: 'semibold',
                                        mb: '2px',
                                    }}
                                    secondary={open ? '' : selectedMethod}
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 14,
                                        lineHeight: '16px',
                                        color: open
                                            ? 'rgba(0,0,0)'
                                            : 'rgba(0,0,0)',
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
                                                fontSize: 14,
                                                fontWeight: 'medium',
                                            }}
                                        />
                                    </ListItemButton>
                                ))}
                        </Box>
                        <button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            className="w-full text-center my-4 p-4 text-lg bg-primary-m text-white font-semibold uppercase rounded-lg"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </PageHeader>
        </div>
    );
};

TopUpPage.propTypes = {};

export default TopUpPage;
