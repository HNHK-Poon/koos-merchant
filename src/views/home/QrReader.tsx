import React, { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import lottie from "lottie-web";
import scan from "@assets/scan.json";
import PageHeader from "@/components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useTransactionService } from "@/infrastructure/hook/useService";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

interface ILocationState {
  ProductName: string;
  Amount: number;
  PaymentType: string;
}

const QrReaderPage = (props: any) => {
  const [data, setData] = useState("No result");
  const location = useLocation();
  const navigate = useNavigate();
  const scanElement: any = useRef();
  const auth = useSelector((state: { auth: any }) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState("");
  const transactionService = useTransactionService();
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    if (location.state === undefined || location.state === null) {
      navigate("/");
      return;
    } else {
      const { Amount, PaymentType, ProductName } =
        location.state as ILocationState;
      console.log(Amount, PaymentType, ProductName);
      if (Amount) {
        setAmount(Amount);
      }
      if (PaymentType) {
        setPaymentType(PaymentType);
      }
      setIsLoading(false);
    }
  }, []);

  const onResult = async (result: any, error: any) => {
    if (!!result && !isScanned) {
      const resultJson = JSON.parse(result?.text);
      console.log(amount, paymentType, resultJson);
      setIsScanned(true);

      transactionService
        .createTransaction({
          ProductName: productName,
          MerchantId: auth.userId, //e43f28b5a412414e8c9056bf961394a8
          UserId: resultJson.userId,
          Amount: amount,
          PaymentType: paymentType,
          UserWalletVerificationToken: resultJson.token,
        })
        .then((res: any) => {
          Swal.fire({
            title: "Success",
            text: "Transaction Success",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((err: any) => {
          Swal.fire({
            title: "Error",
            text: `${err.response.data.message}.${err.message}.${JSON.stringify(err.response)}`,
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
          });
        });
    }

    if (!!error) {
      console.info(error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <PageHeader
          title="Back"
          path="/"
          childrenStyle="bg-black flex items-center justify-center overflow-hidden"
        >
          <div className="flex justify-center items-center bg-dark">
            {!isLoading && (
              <div className="w-full h-full relative" ref={scanElement}>
                <QrReader
                //   constraints={{
                //     facingMode: { exact: "user" },
                //   }}
                  constraints={{
                      facingMode: { exact: 'environment' },
                  }}
                  onResult={onResult}
                  className="w-full h-full bg-dark flex justify-center"
                  containerStyle={{
                    width: "200vw",
                    backgroundColor: "black",
                  }}
                />
              </div>
            )}
          </div>
        </PageHeader>
      </div>
    </>
  );
};

QrReaderPage.propTypes = {};

export default QrReaderPage;
