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

export const useWalletService = () => {
    const context = useContext(AxiosContext);
    return context.walletService;
}

export const useBlockService = () => {
    const context = useContext(AxiosContext);
    return context.blockService;
}

export const useAccountService = () => {
    const context = useContext(AxiosContext);
    return context.accountService;
}