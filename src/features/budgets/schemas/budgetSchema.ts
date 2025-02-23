import { z } from "zod";

export const budgetSchema = z.object({
  name: z.string().min(1, "A name is required").max(100),
  totalAmount: z.coerce.number().positive(),
  dateRange: z.object({
    from: z.date({ required_error: "Start date is required" }),
    to: z.date({ required_error: "End date is required" })
  }),
  selectedCategories: z.array(z.string()).min(1, "At least one category must be selected"),
  isActive: z.boolean().default(true)
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;