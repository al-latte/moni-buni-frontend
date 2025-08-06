import { useState, useEffect } from "react";
import { ListFilter, X, Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { useFilters } from "@/hooks/useFilters";
import { Category } from "@/features/categories/types/category.types";

interface FilterProps {
  categories: Category[]; // Pass available categories
}

const Filter = ({ categories }: FilterProps) => {
  const { filters, updateFilter, clearFilter, clearAllFilters, hasActiveFilters } = useFilters();
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: filters?.dateRange?.from,
    to: filters?.dateRange?.to,
  });

  // Sync dateRange state with filters when filters change
  useEffect(() => {
    setDateRange({
      from: filters?.dateRange?.from,
      to: filters?.dateRange?.to,
    });
  }, [filters?.dateRange]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      // Starting new selection
      setDateRange({ from: date, to: undefined });
    } else if (dateRange.from && !dateRange.to) {
      // Completing selection
      const newRange = {
        from: dateRange.from,
        to: date >= dateRange.from ? date : dateRange.from,
      };
      if (date < dateRange.from) {
        newRange.from = date;
        newRange.to = dateRange.from;
      }
      setDateRange(newRange);
    }
  };

  const applyDateRange = () => {
    if (dateRange.from && dateRange.to) {
      updateFilter("dateRange", {
        from: dateRange.from,
        to: dateRange.to,
      });
    }
  };

  const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
    clearFilter("dateRange");
  };

  const getActiveFilterCount = () => {
    return Object.keys(filters).length;
  };

  return (
    <div className="space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="rounded-full relative">
            <span>Filter</span>
            <ListFilter size={16} />
            {hasActiveFilters && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-destructive hover:text-destructive"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Calendar
                mode="single"
                selected={dateRange?.from}
                onSelect={handleDateSelect}
                className="rounded-lg border"
              />
              {dateRange?.from && (
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon size={14} />
                  <span>
                    {dateRange.from.toLocaleDateString()}
                    {dateRange.to && ` - ${dateRange.to.toLocaleDateString()}`}
                  </span>
                  {dateRange.to && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={applyDateRange}
                      className="h-6 px-2"
                    >
                      Apply
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearDateRange}
                    className="h-6 w-6 p-0"
                  >
                    <X size={12} />
                  </Button>
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select
                value={filters?.category || "all"}
                onValueChange={(value) =>
                  value === "all"
                    ? clearFilter("category")
                    : updateFilter("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
              <Select
                value={filters?.type || "all"}
                onValueChange={(value) =>
                  value === "all"
                    ? clearFilter("type")
                    : updateFilter("type", value as "income" | "expense")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-full"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
    </div>
  );
};

export default Filter;
