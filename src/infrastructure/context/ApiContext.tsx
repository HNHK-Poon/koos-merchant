import { createContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { authService } from '../service/authService';

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
        console.log('effect');
        instanceRef.current.interceptors.request.use((request: any) => {
            const token = Cookies.get('token'); 

            if (token) {
                request.headers.common.Authorization = `Bearer ${token}`;
            }

            return request;
        });
        // instanceRef.current.interceptors.response.use(interceptor);
    }, []);

    const _authService = authService(instanceRef.current);

    return (
        <AxiosContext.Provider
            value={{ rest: instanceRef.current, authService: _authService }}
        >
            {props.children}
        </AxiosContext.Provider>
    );
};

export default AxiosInstanceProvider;
