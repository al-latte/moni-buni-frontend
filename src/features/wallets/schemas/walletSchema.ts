import { z } from 'zod';

export const walletSchema = z.object({
  title: z.string().min(1, { message: "Wallet title is required" }),
  balance: z.coerce.number().min(0, { message: "Balance must be a positive number" }),
  description: z.string().optional(),
  setAsDefault: z.boolean().default(false),
});

export type WalletFormValues = z.infer<typeof walletSchema>;