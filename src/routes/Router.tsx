import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@home/HomePage';
import ActivityPage from '@activity/ActivityPage';
import ProtectedRoute from './ProtectedRoute';
import QrPage from '@home/QrPage';
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
import QrReaderPage from '@/views/home/QrReader';
import WalletTransactionModalPage from '@/views/transaction/WalletTransactionModalPage';
import HistoryPage from '@/views/history/HistoryPage';
import TransactionHistoryPage from '@/views/history/TransactionHistoryPage';
import WithdrawalHistoryPage from '@/views/history/WithdrawalHistoryPage';
// import Home from "@/views/home/Home";

const AppRouter = () => {
    const dispatch = useDispatch();
    const init = () => {
        const token = Cookies.get('kosto_merchant_token');
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
                path="/transaction/create"
                element={
                    <ProtectedRoute>
                        <TransactionFormPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transaction/:id"
                element={
                    <ProtectedRoute>
                        <TransactionModalPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/wallettransaction/:id"
                element={
                    <ProtectedRoute>
                        <WalletTransactionModalPage />
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
            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <HistoryPage />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="transaction"
                    element={
                        <ProtectedRoute>
                            <TransactionHistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="withdrawal"
                    element={
                        <ProtectedRoute>
                            <WithdrawalHistoryPage />
                        </ProtectedRoute>
                    }
                />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signupinfo" element={<SignUpInfoPage />} />
            <Route path="/signupverify" element={<SignUpVerifyPage />} />
        </Routes>
    );
};

export default AppRouter;
