import { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { authService } from '../service/authService';
import { transactionService } from '../service/transactionService';

export const AxiosContext = createContext<any>({} as any);

interface Props {
    children: JSX.Element;
}

const AxiosInstanceProvider = (props: Props) => {
    const instanceRef = useRef(
        axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 10000,
        })
    );

    useEffect(() => {
        instanceRef.current.interceptors.request.use((request: any) => {
            const token = Cookies.get('koos_merchant_token');

            if (token) {
                request.headers.common.Authorization = `Bearer ${token}`;
            }

            return request;
        });
        instanceRef.current.interceptors.response.use((response: any) => {
            console.log('response:', response);

            return response;
        });
    }, []);

    const _authService = authService(instanceRef.current);
    const _transactionService = transactionService(instanceRef.current);

    return (
        <AxiosContext.Provider
            value={{
                rest: instanceRef.current,
                authService: _authService,
                transactionService: _transactionService,
            }}
        >
            {props.children}
        </AxiosContext.Provider>
    );
};

export default AxiosInstanceProvider;
