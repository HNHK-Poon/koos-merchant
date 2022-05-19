import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@home/HomePage';
import ActivityPage from '@activity/ActivityPage';
import ProtectedRoute from './ProtectedRoute';
import QrPage from '@home/QrPage';
import LoginPage from '@/views/auth/LoginPage';
import SignUpInfoPage from '@/views/auth/SignUpInfoPage';
import SignUpVerifyPage from '@/views/auth/SignUpVerifyPage';
// import Home from "@/views/home/Home";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                    path="/qrcode"
                    element={
                        <ProtectedRoute >
                           <QrPage />
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
