import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { HiOutlineMail } from 'react-icons/hi';
import { BiLockOpenAlt } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { editAuth } from '@/infrastructure/state/auth';
import { useDispatch } from 'react-redux';

const SignUpInfoPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    };

    const handleContactChange = (event: any) => {
        setContact(event.target.value);
    };

    const handleBackToSignin = () => {
        navigate('/login');
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        dispatch(editAuth({key: "email", value: email}))
        dispatch(editAuth({key: "password", value: password}))
        dispatch(editAuth({key: "contact", value: contact}))

        navigate('/signupverify')
    };
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center bg-light-l">
                <div className="block w-80">
                    <div className="text-center text-2xl font-extrabold text-dark-l">
                        Register
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
                                    <BsTelephone className="w-8 h-8" />
                                </div>
                                <span className='px-2'>+60</span>
                                <input
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    placeholder={t(
                                        'auth.form.phonePlaceholder'
                                    )}
                                    onChange={handleContactChange}
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
                                        'auth.form.confirmPasswordPlaceholder'
                                    )}
                                    onChange={handlePasswordChange}
                                    className="p-2 bg-light-m w-full rounded-md focus:outline-none text-dark-m"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="h-16 mt-4 w-full bg-primary-m text-light-l text-xl font-bold rounded-full shadow-lg"
                        >
                            {t('auth.form.nextButtonText')}
                        </button>
                        <div className="mt-4 text-sm text-center">
                            <a onClick={() => {navigate('/login')}} className="font-medium text-dark-m">
                                {t('auth.form.backSignInButton')}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

SignUpInfoPage.propTypes = {};

export default SignUpInfoPage;
