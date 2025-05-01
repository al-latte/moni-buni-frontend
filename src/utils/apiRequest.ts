import  { AxiosError, AxiosRequestConfig } from "axios";
import { api } from "../services/axios.config";

// A helper to centralize API calls with error handling
export async function request<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    payload?: unknown
  ): Promise<T> {
    try {
      const response = await api[method](url, payload as AxiosRequestConfig);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Optionally, handle specific error status codes here
        if (error.status === 404 && method === "get") {
          // Return a default value for GET requests
          return {} as T;
        }
        throw new Error(
          error.response?.data?.error || "Something went wrong, please try again."
        );
      }
      throw error;
    }
  }