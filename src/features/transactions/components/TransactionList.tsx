import { useTransactions } from "../hooks/useTransactions";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ userId }: { userId: string }) => {
  const { data: transactions, isLoading, error } = useTransactions(userId);
  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error loading transactions</div>;
  }

  if (!transactions?.length) {
    return <div className="text-gray-500 font-medium text-center p-6" >No transactions</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h2>Transactions</h2>
      </div>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default TransactionList;
