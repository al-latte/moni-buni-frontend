import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Period } from "../types/transaction.types";
import { useTransactionFilterStore } from "@/stores/transactionFilter.store";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { getSubPeriodLabel, getSubPeriodOptions } from "@/utils/dateFilters";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface TransactionFilterBarProps {
  period: Period;
  userId: string;
  availableYears: string[];
}

const FilterChip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
      active
        ? "bg-black text-white border-black"
        : "bg-white text-gray-700 border-gray-200 hover:border-black"
    }`}
  >
    {label}
  </button>
);

const TransactionFilterBar = ({
  period,
  userId,
  availableYears,
}: TransactionFilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    subPeriodValues,
    categoryIds,
    transactionTypes,
    setSubPeriodValues,
    setCategoryIds,
    setTransactionTypes,
    clearFilters,
  } = useTransactionFilterStore();

  const { data: categories = [] } = useCategories(userId);

  useEffect(() => {
    setSubPeriodValues([]);
  }, [period, setSubPeriodValues]);

  const activeFilterCount =
    subPeriodValues.length + categoryIds.length + transactionTypes.length;

  const toggleSubPeriod = (value: string) => {
    setSubPeriodValues(
      subPeriodValues.includes(value)
        ? subPeriodValues.filter((v) => v !== value)
        : [...subPeriodValues, value]
    );
  };

  const toggleCategory = (id: string) => {
    setCategoryIds(
      categoryIds.includes(id)
        ? categoryIds.filter((c) => c !== id)
        : [...categoryIds, id]
    );
  };

  const toggleType = (type: "income" | "expense") => {
    setTransactionTypes(
      transactionTypes.includes(type)
        ? transactionTypes.filter((t) => t !== type)
        : [...transactionTypes, type]
    );
  };

  const subPeriodOptions = getSubPeriodOptions(period, availableYears);
  const subPeriodLabel = getSubPeriodLabel(period);

  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-sm font-semibold transition-colors ${
              isOpen || activeFilterCount > 0
                ? "bg-black text-white"
                : " text-black hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold bg-white text-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </DrawerTrigger>

        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <SlidersHorizontal className="h-7 w-7 text-gray-500" />
            </div>
            <DrawerTitle className="text-center text-base font-semibold">
              Refine transactions
            </DrawerTitle>
            <DrawerDescription>
              Applies to the total, chart, and list.
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 mt-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-black">Filters</p>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-black"
                >
                  <X size={13} />
                  Clear
                </button>
              )}
            </div>

            {subPeriodOptions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  By {subPeriodLabel}
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {subPeriodOptions.map((option) => (
                    <FilterChip
                      key={option}
                      label={option}
                      active={subPeriodValues.includes(option)}
                      onClick={() => toggleSubPeriod(option)}
                    />
                  ))}
                </div>
              </div>
            )}

            {categories.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  By Category
                </p>
                <div className="max-h-40 overflow-y-auto pr-1">
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <FilterChip
                        key={category._id}
                        label={`${category.icon} ${category.title}`}
                        active={categoryIds.includes(category._id)}
                        onClick={() => toggleCategory(category._id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                By Type
              </p>
              <div className="flex gap-2">
                <FilterChip
                  label="Income"
                  active={transactionTypes.includes("income")}
                  onClick={() => toggleType("income")}
                />
                <FilterChip
                  label="Expense"
                  active={transactionTypes.includes("expense")}
                  onClick={() => toggleType("expense")}
                />
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TransactionFilterBar;
