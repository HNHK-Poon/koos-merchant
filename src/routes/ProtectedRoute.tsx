import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { info } from 'console';
import { jwtDecrypt } from '@/infrastructure/seedworks/jwtVerify';
import { useSocket } from '@/infrastructure/context/SocketContext';

type Props = {
    children: JSX.Element;
};

const isTokenExpired = (token: string) => {
    if (token) {
        let expired = jwtDecrypt(token).exp;
        const now = new Date().getTime();
        return (now/1000) > expired;
    } else {
        return false;
    }
};

const ProtectedRoute = ({ children }: Props) => {
    const { t } = useTranslation();
    const socket:any = useSocket()
    const token = Cookies.get('token');
    if (!token || isTokenExpired(token)) {
        Swal.fire({
            title: t('auth.alert.redirectAlertTitle'),
            text: t('auth.alert.redirectAlertText'),
            icon: 'warning',
            timer: 2000,
            showConfirmButton: false,
        });
        return <Navigate to="/login" replace />;
    }
    else {
        socket.init(jwtDecrypt(token).userId)
        return children;
    }
};

export default ProtectedRoute;
