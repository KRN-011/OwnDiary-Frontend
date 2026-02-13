import { API_ROUTES } from '@/constants/apiRoutes';
import { api } from '@/lib/axios';

// POST - Login
export const Login = async ({
    payload,
}: {
    payload: { email: string; password: string };
}) => {
    try {
        const response = await api.post(API_ROUTES.AUTH.login, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};
