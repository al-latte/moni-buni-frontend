import { z } from 'zod';

export const categorySchema = z.object({
  title: z.string().min(1, { message: "Category title is required" }),
  icon: z.string().min(1, "Icon is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;