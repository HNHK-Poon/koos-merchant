import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@home/HomePage';
import ActivityPage from '@activity/ActivityPage';
import ProtectedRoute from './ProtectedRoute';
import QrPage from '@home/QrPage';
import QrReaderPage from '@/views/transaction/QrReader';
import LoginPage from '@/views/auth/LoginPage';
import SignUpInfoPage from '@/views/auth/SignUpInfoPage';
import SignUpVerifyPage from '@/views/auth/SignUpVerifyPage';
import { QrReader } from 'react-qr-reader';
import TransactionFormPage from '@/views/transaction/TransactionFormPage';
import TransactionModalPage from '@/views/transaction/TransactionModalPage';
import Cookies from 'js-cookie';
import { jwtDecrypt } from '@/infrastructure/seedworks/jwtVerify';
import { editAuth } from '@/infrastructure/state/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TopUpPage from '@/views/transaction/topup/TopUpPage';
// import Home from "@/views/home/Home";

const AppRouter = () => {
    const dispatch = useDispatch();
    const init = () => {
        const token = Cookies.get('koos_merchant_token');
        if (token) {
            const jwtInfo = jwtDecrypt(token);
            console.log('jwtInfo', jwtInfo);
            dispatch(editAuth({ key: 'userId', value: jwtInfo.userId }));
            dispatch(editAuth({ key: 'name', value: jwtInfo.name }));
        }
    };

    useEffect(() => {
        init();
    }, []);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            ></Route>
            <Route
                path="/qrcode"
                element={
                    <ProtectedRoute>
                        <QrPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/qrreader"
                element={
                    <ProtectedRoute>
                        <QrReaderPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/transactionform" element={<TransactionFormPage />} />
            <Route
                path="/transactionmodal"
                element={
                    <ProtectedRoute>
                        <TransactionModalPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/topup"
                element={
                    <ProtectedRoute>
                        <TopUpPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/scan"
                element={
                    <ProtectedRoute>
                        <QrReaderPage />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signupinfo" element={<SignUpInfoPage />} />
            <Route path="/signupverify" element={<SignUpVerifyPage />} />
        </Routes>
    );
};

export default AppRouter;
