export const authService = (rest: any) => {
    const API_PREFIX = 'api/auth/merchant';
    return {
        login: (data: any) => {
            return rest.post(`${API_PREFIX}/login`, data);
        },
        register: (data: any) => {
            return rest.post(`${API_PREFIX}/register`, data);
        },
    };
};
