import { request } from "@/utils/apiRequest";
import { AuthResponse } from "../features/auth/types/auth.types";
import {
  LoginFormValues,
  SignupFormValues,
} from "../features/auth/schemas/authSchema";

export const authService = {
  loginUser: async (credentials: LoginFormValues): Promise<AuthResponse> => {
    console.log("Attempting login for:", credentials.email);
    const data = await request<AuthResponse>(
      "post",
      "/api/auth/login",
      credentials
    );
    console.log("Login successful for:", data.user.email);
    return data;
  },

  signupUser: async (credentials: SignupFormValues): Promise<AuthResponse> => {
    console.log("Attempting signup for:", credentials.email);
    const data = await request<AuthResponse>(
      "post",
      "/api/auth/signup",
      credentials
    );
    console.log("Signup successful for:", data.user.email);
    return data;
  },

  logoutUser: async (): Promise<void> => {
    await request<void>("post", "/api/auth/logout");
  },
};
