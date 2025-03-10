export interface Transaction {
  _id: string;
  amount: number;
  category: string
  description?: string;
  transactionType: "income" | "expense";
  date: Date;
  wallet?: string;
  userId: string;
}

export type Period = 'week' | 'month' | 'year' | 'alltime';

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
  total: number;
}
