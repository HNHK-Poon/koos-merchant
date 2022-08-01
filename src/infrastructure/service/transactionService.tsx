export const transactionService = (rest: any) => {
    const API_PREFIX = 'api/transaction';
    return {
        // pay: (data: any) => {
        //     return rest.post(`${API_PREFIX}/transaction/pay`, data);
        // },
        // register: (data: any) => {
        //     return rest.post(`${API_PREFIX}/register`, data);
        // },
        createTransaction: (data: any) => {
            return new Promise((resolve, reject) => {
                rest.post(`${API_PREFIX}/`, data)
                    .then((res: any) => {
                        resolve([null, res]);
                    }).catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        getTransactions: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/own`, { params: { PageSize: 100, SortBy: "CreatedDateTime", SortOrder: 0} })
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
    };
};
