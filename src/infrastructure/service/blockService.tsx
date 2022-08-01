export const blockService = (rest: any) => {
    const API_PREFIX = 'api/block';
    return {
        getBlocks: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/merchant`, { params: { PageSize: 100 } })
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        getCurrentBlock: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/merchant/current`, {})
                    .then((res: any) => {
                        resolve([null, res]);
                    })
                    .catch((err: any) => {
                        resolve([err, null]);
                    });
            });
        },
        getBlockProperties: () => {
            return new Promise((resolve, reject) => {
                rest.get(`${API_PREFIX}/properties`, {})
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
