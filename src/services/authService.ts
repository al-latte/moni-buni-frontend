import { request } from "@/utils/apiRequest";
import { AuthResponse, User } from "../features/auth/types/auth.types";
import {
  LoginFormValues,
  SignupFormValues,
} from "../features/auth/schemas/authSchema";
import { AccountFormValues } from "@/features/userAccount/schema/accountSchema";

export const authService = {
  loginUser: async (credentials: LoginFormValues): Promise<AuthResponse> => {
    const data = await request<AuthResponse>(
      "post",
      "/api/auth/login",
      credentials
    );
    return data;
  },

  signupUser: async (credentials: SignupFormValues): Promise<AuthResponse> => {
    const data = await request<AuthResponse>(
      "post",
      "/api/auth/signup",
      credentials
    );
    return data;
  },

  logoutUser: async (): Promise<void> => {
    await request<void>("post", "/api/auth/logout");
  },

  updateUser: async (id: string, userData: AccountFormValues): Promise<User> => {
    const data = await request<{ user: User }>(
      "put", 
      `/api/user/update/${id}`, 
      userData
    );
    return data.user;
  },
};
