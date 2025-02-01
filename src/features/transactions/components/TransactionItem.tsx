import { Transaction } from '../types/transaction.types';
import { Separator } from '@/components/ui/separator';
import moment from 'moment';
import { categoryIcons } from '@/features/categories/schemas/categorySchema';
import { IconName } from '@/features/categories/schemas/categorySchema';
import { CreditCard } from 'lucide-react';
import { useCategories } from '@/features/categories/hooks/useCategories';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const { data: categories } = useCategories(transaction.userId);
  const category = categories?.find((c) => c._id === transaction.category) || null;
  
  // Fallback to CreditCard if no icon found
  const IconComponent = category?.icon ? categoryIcons[category.icon as IconName] : CreditCard;

  return (
    <div className="rounded-md px-2 py-2 text-sm">
      <div className="flex items-start gap-4 m-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {IconComponent && <IconComponent className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{category?.title || 'Uncategorized'}</p>
          <p className="text-sm text-gray-500">{moment(transaction.date).format("MMM DD, YYYY")}</p>
        </div>
        <div>
          <p className={`text-sm font-bold ${transaction.transactionType === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
            {transaction.transactionType === 'expense' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
          </p>
        </div>
      </div>
      <Separator />
    </div>
  );
};

export default TransactionItem;