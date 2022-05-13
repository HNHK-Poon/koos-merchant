import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { info } from 'console';

type Props = {
    children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
    const { t } = useTranslation();
    if (!Cookies.get('token')) {
        Swal.fire({
            title: t('auth.alert.redirectAlertTitle'),
            text: t('auth.alert.redirectAlertText'),
            icon: "warning",
            timer: 2000,
            showConfirmButton: false
        });
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
