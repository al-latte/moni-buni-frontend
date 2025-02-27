import { formatCurrency } from "@/utils/formatCurrency";
import { Skeleton } from "./ui/skeleton";

interface AmountDisplayProps {
  amount: number;
  isLoading: boolean;
  label: string;
}

const AmountDisplaySkeleton = () => <Skeleton className="h-8 w-24 rounded" />;

export const AmountDisplay = ({
  amount,
  isLoading,
  label,
}: AmountDisplayProps) => (
  <div className="flex flex-col">
    <div className="font-bold text-lg">
      {isLoading ? <AmountDisplaySkeleton /> : `${formatCurrency(amount)}`}
    </div>
    <span className="text-gray-400">{label}</span>
  </div>
);
