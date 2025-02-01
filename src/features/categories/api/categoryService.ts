import { AxiosError } from "axios";
import { api } from "@/services/axios.config";
import { Category } from "../types/category.types";

export const categoryService = {
  getAll: async (userId: string): Promise<Category[]> => {
    try {
      const { data } = await api.get(`/api/categories/${userId}`);
      return data.categories;
    } catch (error) {
      console.error("Error in getAll categories:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to fetch categories");
      }
      throw error;
    }
  },

  create: async (category: Omit<Category, "_id">): Promise<Category> => {
    try {
      const { data } = await api.post("/api/categories/add", category);
      console.log("category data", data.category);
      return data.category;
    } catch (error) {
      console.error("Error in create category:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to create category");
      }
      throw error;
    }
  },

  update: async (id: string, category: Partial<Category>): Promise<Category> => {
    try {
      const { data } = await api.put(`/api/categories/${id}`, category);
      return data.category;
    } catch (error) {
      console.error("Error in update category:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to update category");
      }
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/api/categories/delete/${id}`);
    } catch (error) {
      console.error("Error in delete category:", error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || "Failed to delete category");
      }
      throw error;
    }
  }
};
