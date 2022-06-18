export const transactionService = (rest: any) => {
    const API_PREFIX = 'transmit';
    return {
        create: (data: any) => {
            return rest.post(`${API_PREFIX}/transaction/created`, data);
        },
        complete: (data: any) => {
            return rest.post(`${API_PREFIX}/transaction/confirmed`, data);
        },
    };
};
