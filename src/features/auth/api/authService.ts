import { AxiosError } from 'axios';
import { api } from '../../../services/axios.config';
import { AuthResponse } from "../types/auth.types";
import { LoginFormValues, SignupFormValues } from "../schemas/authSchema";

export const authService = {
  loginUser: async (credentials: LoginFormValues): Promise<AuthResponse> => {
    try {
      console.log("Attempting login for:", credentials.email);
      const { data } = await api.post<AuthResponse>(
        "/api/auth/login",
        credentials
      );
      console.log("Login successful for:", data.user.email);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Login error details:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        const errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Login failed";
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  signupUser: async (credentials: SignupFormValues): Promise<AuthResponse> => {
    try {
        console.log('Attempting signup for:', credentials.email);
      const { data } = await api.post<AuthResponse>('/api/auth/signup', credentials);
      console.log('Signup successful for:', data.user.email);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Signup error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  logoutUser: async (): Promise<void> => {
    await api.post("/api/auth/logout");
  },
};
