import moment from "moment";
import {
  Transaction,
  Period,
  TransactionGroup,
  TransactionFilters,
} from "../features/transactions/types/transaction.types";

export const getPeriodDateRange = (period: Period): { startDate?: string; endDate?: string } => {
  if (period === "alltime") return {};
  const now = moment();
  return {
    startDate: now.clone().startOf(period).toISOString(),
    endDate: now.clone().endOf(period).toISOString(),
  };
};

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

export const getSubPeriodLabel = (period: Period): string => {
  const labels: Record<Period, string> = {
    week: "Day",
    month: "Week",
    year: "Month",
    alltime: "Year",
  };
  return labels[period];
};

export const getSubPeriodOptions = (period: Period, availableYears?: string[]): string[] => {
  switch (period) {
    case "week":
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    case "month":
      return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    case "year":
      return ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];
    case "alltime":
      return availableYears ?? [];
  }
};

const getWeekOfMonth = (date: Date | string): string => {
  const weekNum = Math.ceil(moment(date).date() / 7);
  return `Week ${weekNum}`;
};

export const getTransactionSubPeriodKey = (date: Date | string, period: Period): string => {
  switch (period) {
    case "week": return moment(date).format("dddd");
    case "month": return getWeekOfMonth(date);
    case "year": return moment(date).format("MMMM");
    case "alltime": return moment(date).format("YYYY");
  }
};

export const applyTransactionFilters = (
  transactions: Transaction[],
  period: Period,
  filters: TransactionFilters
): Transaction[] => {
  let result = [...transactions];

  if (filters.subPeriodValues.length > 0) {
    result = result.filter((t) =>
      filters.subPeriodValues.includes(getTransactionSubPeriodKey(t.date, period))
    );
  }

  if (filters.categoryIds.length > 0) {
    result = result.filter((t) => filters.categoryIds.includes(t.category));
  }

  if (filters.transactionTypes.length > 0) {
    result = result.filter((t) => filters.transactionTypes.includes(t.transactionType));
  }

  return result;
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
