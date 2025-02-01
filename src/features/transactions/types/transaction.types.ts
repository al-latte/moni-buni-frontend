export interface Transaction {
  _id: string;
  amount: number;
  category: string
  description?: string;
  transactionType: "income" | "expense";
  date: Date;
  wallet: string;
  userId: string;
}
