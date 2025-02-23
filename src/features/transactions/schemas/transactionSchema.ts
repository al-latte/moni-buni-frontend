import {z} from 'zod';

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1),
  description: z.string().optional(),
  transactionType: z.enum(["expense", "income"]),
  date: z.date(),
  wallet: z.string().min(1).optional()
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;