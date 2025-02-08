import moment from "moment";
import {
  Transaction,
  Period,
  TransactionGroup,
} from "../features/transactions/types/transaction.types";

export const filterTransactionsByPeriod = (
  transactions: Transaction[],
  period: Period
): Transaction[] => {
  const now = moment();

  const periodFilters = {
    week: (t: Transaction) => moment(t.date).isSame(now, 'week'),
    month: (t: Transaction) => moment(t.date).isSame(now, 'month'),
    year: (t: Transaction) => moment(t.date).isSame(now, 'year'),
  };

  const filtered = period in periodFilters
    ? transactions.filter(periodFilters[period as keyof typeof periodFilters])
    : transactions;

  // Sort transactions by date descending (newest first)
  return filtered.sort((a, b) => 
    moment(b.date).valueOf() - moment(a.date).valueOf()
  );
};

export const groupTransactionsByPeriod = (
  transactions: Transaction[],
  period: Period
): TransactionGroup[] => {
  const groups: { [key: string]: Transaction[] } = {};

  transactions.forEach((transaction) => {
    let groupKey = "";
    switch (period) {
      case "week":
        groupKey = moment(transaction.date).format("dddd"); 
        break;
        case "month":
          { const startOfWeek = moment(transaction.date).startOf('week');
          const endOfWeek = moment(transaction.date).endOf('week');
          groupKey = `${startOfWeek.format('MMMM DD, YYYY')} - ${endOfWeek.format('MMMM DD, YYYY')}`;
          break; }
      case "year":
        groupKey = moment(transaction.date).format("MMMM YYYY"); 
        break;
      case "alltime":
        groupKey = moment(transaction.date).format("YYYY"); 
        break;
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(transaction);
  });

  return Object.entries(groups).map(([date, transactions]) => ({
    date,
    transactions,
    total: transactions.reduce(
      (sum, t) =>
        sum + (t.transactionType === "expense" ? -t.amount : t.amount),
      0
    ),
  }))
};
