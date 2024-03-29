export const walletSerice = (rest: any) => {
    const API_PREFIX = 'api/wallet';
    return {
        getBalance: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/merchant/balance`, {})
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        topup: (data: any) => {
            return new Promise((resolve, reject) => {
                rest.post(`${API_PREFIX}/user/topup`, data)
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        verifyTopup: (data: any) => {
            return new Promise((resolve, reject) => {
                rest.post(`${API_PREFIX}/topup/callback`, data)
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        getWalletTransactions: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/user/transaction`, {
                    params: {
                        PageSize: 100,
                        SortBy: 'CreatedDateTime',
                        SortOrder: 0,
                    },
                })
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
