import { Category } from "../features/categories/types/category.types";
import { request } from "@/utils/apiRequest";

export const categoryService = {
  getAll: async (userId: string): Promise<Category[]> => {
    const data = await request<{ categories: Category[] }>(
      "get",
      `/api/categories/${userId}`
    );
    return data.categories || [];
  },

  create: async (category: Omit<Category, "_id">): Promise<Category> => {
    const data = await request<{ category: Category }>(
      "post",
      "/api/categories/add",
      category
    );
    return data.category;
  },

  update: async (
    id: string,
    category: Partial<Category>
  ): Promise<Category> => {
    const data = await request<{ category: Category }>(
      "put",
      `/api/categories/update/${id}`,
      category
    );
    return data.category;
  },

  delete: async (id: string): Promise<void> => {
    await request<void>("delete", `/api/categories/delete/${id}`);
  },
};
