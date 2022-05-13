import { useContext } from "react"
import { AxiosContext } from "@context/ApiContext";

export const useRest = () => {
    const context = useContext(AxiosContext);
    return context;
}