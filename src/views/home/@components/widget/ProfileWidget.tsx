import React from 'react';
import PropTypes from 'prop-types';
import { RiUserSettingsLine } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ProfileWidget = () => {
    const navigate = useNavigate()
    const signOut = () => {
        Cookies.remove('koos_user_token');
        navigate('/login');
    };
    return (
        <div onClick={signOut}>
            <RiUserSettingsLine className="w-6 h-6 text-primary-xl" />
        </div>
    );
};

ProfileWidget.propTypes = {};

export default ProfileWidget;
