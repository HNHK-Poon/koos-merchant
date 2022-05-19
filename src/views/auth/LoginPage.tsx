import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineMail } from 'react-icons/hi';
import { BiLockOpenAlt } from 'react-icons/bi';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuthService } from '@/infrastructure/hook/useService';

const LoginPage = () => {
    const { t } = useTranslation();
    const authService = useAuthService();

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const res = await authService
            .login({ Email: email, Password: password })
            .then(async(success: any) => {
                await Swal.fire({
                    icon: 'success',
                    title: t('auth.alert.signinSuccessText'),
                    timer: 2000,
                    showConfirmButton: false,
                });
                navigate('/');
                Cookies.set('token', success.data.Token);
            })
            .catch((err: any) => {
                Swal.fire({
                    icon: 'error',
                    text: 'Sign in failed, please try again',
                    timer: 2000,
                    showConfirmButton: false,
                });
            });
    };

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-light-l">
                <div className="block w-80">
                    <div className="text-center text-2xl font-extrabold text-dark-l">
                        KOOS BONUS
                    </div>
                    <form>
                        <div className="px-2 py-2 mt-4 w-full bg-light-m rounded-full shadow-lg">
                            <input type="hidden" name="remember" value="True" />
                            <div className="flex items-center">
                                <div className="w-12 h-12 p-2 rounded-full bg-light-s">
                                    <HiOutlineMail className="w-8 h-8" />
                                </div>
                                <input
                                    type="email"
                                    name="email_address"
                                    id="email_address"
                                    autoComplete="email"
                                    placeholder={t(
                                        'auth.form.emailPlaceholder'
                                    )}
                                    onChange={handleEmailChange}
                                    className="p-2 bg-light-m w-full rounded-md focus:outline-none text-dark-m"
                                />
                            </div>
                        </div>
                        <div className="px-2 py-2 mt-4 w-full bg-light-m rounded-full shadow-lg">
                            <input type="hidden" name="remember" value="True" />
                            <div className="flex items-center">
                                <div className="w-12 h-12 p-2 rounded-full bg-light-s">
                                    <BiLockOpenAlt className="w-8 h-8" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="password"
                                    placeholder={t(
                                        'auth.form.passwordPlaceholder'
                                    )}
                                    onChange={handlePasswordChange}
                                    className="p-2 bg-light-m w-full rounded-md focus:outline-none text-dark-m"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="h-16 mt-4 w-full bg-primary-m text-light-l text-xl font-bold rounded-full shadow-lg"
                        >
                            {t('auth.form.signinButtonText')}
                        </button>
                        <div className="mt-4 text-sm text-center">
                            <a
                                href="/forgotpassword"
                                className="font-medium text-dark-m"
                            >
                                {t('auth.form.forgotPasswordText')}
                            </a>
                        </div>
                    </form>
                </div>
                <div className="absolute bottom-5pc w-full mt-2 text-sm text-center">
                    <a
                        onClick={() => {
                            navigate('/signupinfo');
                        }}
                        className="font-medium text-dark-m"
                    >
                        {t('auth.form.dontHaveAccountText')}
                        <span className="text-primary-xl font-bold">
                            {t('auth.form.signUpNowText')}
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
