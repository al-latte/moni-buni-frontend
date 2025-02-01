import {z} from 'zod';

export const transactionSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1),
  description: z.string().optional(),
  transactionType: z.enum(['income', 'expense']),
  date: z.date(),
  wallet: z.string().min(1)
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;