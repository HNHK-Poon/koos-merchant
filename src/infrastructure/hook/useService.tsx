import { useContext } from "react"
import { AxiosContext } from "@context/ApiContext";

export const useAuthService = () => {
    const context = useContext(AxiosContext);
    return context.authService;
}

export const useTransactionService = () => {
    const context = useContext(AxiosContext);
    return context.transactionService;
}