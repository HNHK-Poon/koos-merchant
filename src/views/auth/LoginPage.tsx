import React, { useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineMail } from "react-icons/hi";
import { BiLockOpenAlt } from "react-icons/bi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/infrastructure/hook/useService";
import { jwtDecrypt } from "@/infrastructure/seedworks/jwtVerify";
import { useDispatch } from "react-redux";
import { editAuth } from "@/infrastructure/state/auth";
import { BsTelephone } from "react-icons/bs";
import InputMask from "react-input-mask";

const LoginPage = () => {
	const { t } = useTranslation();
	const authService = useAuthService();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (event: any) => {
		setEmail(event.target.value);
	};

	const handleContactChange = (event: any) => {
		setPhoneNumber(event.target.value);
	};

	const handlePasswordChange = (event: any) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		const res = await authService
			.login({
				countryCode: "+60",
				phoneNumber: phoneNumber.replace("-", "").replace(" ", ""),
				Password: password,
			})
			.then(async (success: any) => {
				await Swal.fire({
					icon: "success",
					text: t("auth.alert.signinSuccessText"),
					timer: 2000,
					showConfirmButton: false,
				});
				navigate("/");
				const token = success.data.token ? success.data.token : "";
				if (token) {
					Cookies.set("kosto_merchant_token", success.data.token);
					const jwtInfo = jwtDecrypt(token);
					dispatch(editAuth({ key: "userId", value: jwtInfo.userId }));
				}
			})
			.catch((err: any) => {
				Swal.fire({
					icon: "error",
					text: err.response.data.message,
					timer: 2000,
					showConfirmButton: false,
				});
			});
	};

	return (
		<>
			<div className="w-screen h-screen flex justify-center items-center bg-light-xl">
				<div className="block w-80">
					<img
						className=""
						src="https://sin1.contabostorage.com/886afe3fdb01483eb57380db79eb6fb4:kosto-asset/kosto-logo.png"
						alt=""
					/>
					<div className="text-center text-xl text-dark-l my-2">
						Merchant Application
					</div>
					<form>
						{/* <div className="px-2 py-2 mt-4 w-full bg-light-xl rounded-full shadow-lg">
                            <input type="hidden" name="remember" value="True" />
                            <div className="flex items-center">
                                <div className="w-12 h-12 p-2 rounded-full bg-light-xl">
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
                                    className="p-2 bg-light-xl w-full rounded-md focus:outline-none text-dark-m"
                                />
                            </div>
                        </div> */}
						<div className="px-2 py-2 mt-4 w-full bg-light-xl rounded-full shadow-lg">
							<div className="flex items-center">
								<div className="w-12 h-12 p-2 rounded-full bg-light-xl">
									<BsTelephone className="w-8 h-8" />
								</div>
								<span className="px-2 select-none">+60</span>
								<InputMask
									mask="99-999 99999"
									className="p-2 bg-light-xl w-full rounded-md focus:outline-none text-dark-m"
									maskChar={null}
									onChange={handleContactChange}
								/>
							</div>
						</div>
						<div className="px-2 py-2 mt-4 w-full bg-light-xl rounded-full shadow-lg">
							<input type="hidden" name="remember" value="True" />
							<div className="flex items-center">
								<div className="w-12 h-12 p-2 rounded-full bg-light-xl">
									<BiLockOpenAlt className="w-8 h-8" />
								</div>
								<input
									type="password"
									name="password"
									id="password"
									autoComplete="password"
									placeholder={t("auth.form.passwordPlaceholder")}
									onChange={handlePasswordChange}
									className="p-2 bg-light-xl w-full rounded-md focus:outline-none text-dark-m"
								/>
							</div>
						</div>
						<button
							onClick={handleSubmit}
							type="submit"
							className="h-16 mt-4 w-full bg-primary-m text-light-xl text-xl font-bold rounded-full shadow-lg"
						>
							{t("auth.form.signinButtonText")}
						</button>
						{/* <div className="mt-4 text-sm text-center">
                            <a
                                href="/forgotpassword"
                                className="font-medium text-dark-m"
                            >
                                {t('auth.form.forgotPasswordText')}
                            </a>
                        </div> */}
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
