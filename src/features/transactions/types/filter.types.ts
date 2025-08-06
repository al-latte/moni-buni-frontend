export interface TransactionFilters {
  dateRange?: {
    from: Date;
    to: Date;
  };
  category?: string;
  type?: 'income' | 'expense';
}