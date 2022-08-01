export const walletSerice = (rest: any) => {
    const API_PREFIX = 'api/wallet';
    return {
        getBalance: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/user/balance`, {})
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
        }
    };
};
