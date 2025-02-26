import { z } from "zod";

export const accountSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().optional()
  });
  
  export type AccountFormValues = z.infer<typeof accountSchema>;