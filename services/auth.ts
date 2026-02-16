import { API_ROUTES } from "@/constants/apiRoutes";
import { api } from "@/lib/axios";

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

// POST - Signup
export const Signup = async ({
  payload,
}: {
  payload: { username: string; email: string; password: string };
}) => {
  try {
    const reponse = await api.post(API_ROUTES.AUTH.register, payload);
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

// GET - Get Current User
export const GetCurrentUser = async () => {
  try {
    const response = await api.get(API_ROUTES.AUTH.currentUser)
    return response.data
  } catch (error) {
    throw error
  }
}

// POST - Logout
export const Logout = async () => {
  try {
    const response = await api.post(API_ROUTES.AUTH.logout)
    return response.data
  } catch (error) {
    throw error
  }
}