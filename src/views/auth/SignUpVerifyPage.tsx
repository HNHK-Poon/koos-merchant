import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const SignUpVerifyPage = () => {
    const inputs = useRef(new Array());
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleKeyDown = (e: any) => {
        const id = parseInt(e.target.id);
        if (e.keyCode > 47 && e.keyCode < 58) {
            inputs.current[id].value = e.key;
            if (id < 5) {
                inputs.current[id + 1].focus();
            }
        }
        inputs.current.map((input, i) => {
            console.log(input.value);
        });
    };
    return (
        <>
            <div className="h-screen bg-light-l py-20 px-3 flex justify-center items-center relative">
                <div className="bg-light-l h-64 py-3 mb-40 rounded text-center text-dark-m">
                    <h1 className="text-2xl font-bold">
                        {t('auth.form.otpVerification')}
                    </h1>
                    <div className="flex flex-col mt-4">
                        <span>{t('auth.form.otpMessageText')}</span>
                        <span className="font-bold">+60 ******876</span>
                    </div>

                    <div
                        id="otp"
                        className="flex flex-row justify-center text-center px-2 mt-5"
                    >
                        {[...Array(6).keys()].map((i, index) => {
                            return (
                                <input
                                    className="m-1 bg-light-s h-10 w-10 text-center form-control rounded text-2xl font-bold text-primary-xl shadow-md"
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        e.target.value = '';
                                    }}
                                    type="text"
                                    id={index.toString()}
                                    key={index}
                                    ref={(el) => inputs.current.push(el)}
                                    maxLength={1}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center text-center mt-5">
                        <a className="flex items-center text-primary-xl cursor-pointer">
                            <span className="font-bold">
                                {t('auth.form.resendOtpButtonText')}
                            </span>
                            <i className="bx bx-caret-right ml-1"></i>
                        </a>
                    </div>
                </div>
                <div className="absolute bottom-40">
                    <button
                        onClick={() => {
                            navigate('/signupverify');
                        }}
                        type="submit"
                        className="h-12 w-60 bg-primary-m text-light-l text-xl font-bold rounded-full shadow-lg"
                    >
                        {t('auth.form.submitButtonText')}
                    </button>
                    <div className="flex justify-center text-center mt-5">
                        <a
                            onClick={() => {
                                navigate('/signupinfo');
                            }}
                            className="flex items-center text-primary-xl cursor-pointer"
                        >
                            <span className="font-bold">
                                {t('auth.form.backToSignUpInfoText')}
                            </span>
                            <i className="bx bx-caret-right ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

SignUpVerifyPage.propTypes = {};

export default SignUpVerifyPage;
