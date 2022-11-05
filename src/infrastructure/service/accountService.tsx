export const accountService = (rest: any) => {
    const API_PREFIX = 'api';
    return {
        // pay: (data: any) => {
        //     return rest.post(`${API_PREFIX}/transaction/pay`, data);
        // },
        // register: (data: any) => {
        //     return rest.post(`${API_PREFIX}/register`, data);
        // },
        getAccount: (id:string) => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/user/merchant/all/${id}`, {})
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        getMerchantOwn: () => {
            return rest.get(`${API_PREFIX}/profile/merchant/own`);
        }
    };
};
