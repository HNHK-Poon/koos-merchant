export const authService = (rest: any) => {
    const API_PREFIX = "auth"
    return {
        login: (data: any) => rest.post(`${API_PREFIX}/login`, { data }),
        register: (data: any) => rest.post(`${API_PREFIX}/register`, { data }),
    };
};
