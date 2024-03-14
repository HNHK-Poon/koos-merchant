import queryString from 'query-string';

export const transactionService = (rest: any) => {
  const API_PREFIX = 'api/transaction';
  const TRANSMIT_PREfiX = 'transmit/transaction';
  return {
    // pay: (data: any) => {
    //     return rest.post(`${API_PREFIX}/transaction/pay`, data);
    // },
    // register: (data: any) => {
    //     return rest.post(`${API_PREFIX}/register`, data);
    // },
    createTransaction: (data: any) => {
      return rest.post(`${TRANSMIT_PREfiX}/queue/merchantCreate`, data);
    },
    getTransactions: (payload: any) => {
      return rest.get(`${API_PREFIX}/merchant?${queryString.stringify(payload)}`);
    }
  };
};
