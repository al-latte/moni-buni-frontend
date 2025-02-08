import { formatCurrency } from "@/utils/formatCurrency";
import { Skeleton } from "./ui/skeleton";

interface AmountDisplayProps {
    amount: number;
    isLoading: boolean;
    label: string;
}

const AmountDisplaySkeleton = () => (
    <Skeleton  className="h-8 w-24 rounded" />
  );

export const AmountDisplay = ({ amount, isLoading, label }: AmountDisplayProps) => (
    <p>
      <span className="font-bold text-3xl">
        {isLoading ? (
          <AmountDisplaySkeleton />
        ) : (
          `${formatCurrency(amount)}`
        )}
      </span>
      <br />
      <span className="text-gray-400">{label}</span>
    </p>
  );