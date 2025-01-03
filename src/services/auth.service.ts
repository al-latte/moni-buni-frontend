import { AxiosError } from 'axios';
import { api } from './axios.config';
import { LoginInput } from '../schemas/auth.schema';

interface LoginResponse {
  user: {
    _id: string;
    email: string;
  };
  token: string;
}

export const loginUser = async (credentials: LoginInput): Promise<LoginResponse> => {
  try {
    console.log('Login request payload:', credentials);
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    console.log('Login response:', data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Login failed';
      throw new Error(errorMessage);
    }
    throw error;
  }
};