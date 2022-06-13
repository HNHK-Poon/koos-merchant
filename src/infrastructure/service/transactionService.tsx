export const transactionService = (rest: any) => {
    const API_PREFIX = 'transmit';
    return {
        create: (data: any) => {
            return rest.post(`${API_PREFIX}/transaction/create`, data);
        },
        complete: (data: any) => {
            return rest.post(`${API_PREFIX}/transaction/confirm`, data);
        },
    };
};
