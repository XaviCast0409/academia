import { api } from '../utils/api';

export const emailVerificationService = {
    sendVerificationCode: async (email: string) => {
        const response = await api.post(`email-verification/send-code`, { email });
        console.log(response)
        return response.data;
    },

    verifyCode: async (email: string, code: string) => {
        const response = await api.post(`email-verification/verify-code`, { email, code });
        return response.data;
    }
}; 