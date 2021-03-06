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
// import Home from "@/views/home/Home";

const AppRouter = () => {
    return (
        <BrowserRouter>
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
                <Route
                    path="/transactionform"
                    element={<TransactionFormPage />}
                />
                <Route
                    path="/transactionmodal"
                    element={
                        <ProtectedRoute>
                            <TransactionModalPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signupinfo" element={<SignUpInfoPage />} />
                <Route path="/signupverify" element={<SignUpVerifyPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
