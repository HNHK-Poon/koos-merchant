import { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { authService } from '../service/authService';
import { transactionService } from '../service/transactionService';
import { walletSerice } from '../service/walletService';
import { blockService } from '../service/blockService';
import { accountService } from '../service/accountService';
import Swal from 'sweetalert2';

export const AxiosContext = createContext<any>({} as any);

interface Props {
    children: JSX.Element;
}

const AxiosInstanceProvider = (props: Props) => {
    const instanceRef = useRef(
        axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 1000,
        })
    );

    useEffect(() => {
        console.log("init interceptor")
        instanceRef.current.interceptors.request.use((request: any) => {
            const token = Cookies.get('kosto_merchant_token');
            console.log("request", request, token)
            if (token) {
                request.headers.common.Authorization = `Bearer ${token}`;
            }

            return request;
        });
        instanceRef.current.interceptors.response.use(
            function (response) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                console.log('response intercept', response);
                return response;
            },
            function (error) {
                console.log('error intercept', error);
                if (error.response.status === 401) {
                    Cookies.remove('kosto_merchant_token');
                    Swal.fire({
                        text: 'Session expired. Please login again',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000,
                    }).then((result) => {
                        window.location.href = '/login';
                    });
                }
                return Promise.reject(error);
            }
        );
    }, []);

    const _authService = authService(instanceRef.current);
    const _transactionService = transactionService(instanceRef.current);
    const _walletService = walletSerice(instanceRef.current);
    const _blockService = blockService(instanceRef.current);
    const _accountService = accountService(instanceRef.current);

    return (
        <AxiosContext.Provider
            value={{
                rest: instanceRef.current,
                authService: _authService,
                transactionService: _transactionService,
                walletService: _walletService,
                blockService: _blockService,
                accountService: _accountService,
            }}
        >
            {props.children}
        </AxiosContext.Provider>
    );
};

export default AxiosInstanceProvider;
