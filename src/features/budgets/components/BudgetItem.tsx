import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatCurrency";
import { format } from "date-fns";
import { Edit, MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Budget } from "../types/budget.types";
import { useBudgetDialogStore } from "@/stores/budget.store";
import { useBudgetMutations } from "../hooks/useBudget";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BudgetItem = ({ budget }: { budget: Budget }) => {
  const startDate = new Date(budget.startDate);
  const endDate = new Date(budget.endDate);

  const progress = Math.min(
    ((budget.totalAmount - budget.remainingAmount) / budget.totalAmount) * 100,
    100
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openDialog } = useBudgetDialogStore();
  const { deleteBudget } = useBudgetMutations();

  const handleEdit = () => {
    setIsDropdownOpen(false);
    openDialog(budget);
  };

  const handleDelete = async () => {
    try {
      await deleteBudget.mutateAsync(budget._id);
    } catch (error) {
      console.error("Failed to delete budget:", error);
    }
  };

  return (
    <Card className={cn(
        "transition-shadow",
        !budget.isActive ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
      )}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{budget.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-muted-foreground">
              {formatCurrency(budget.totalAmount)}
            </span>
            
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                {budget.isActive && (
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] flex flex-col justify-between">
        <div className="space-y-2">
            <div >
              <div className="text-sm text-muted-foreground">
                {format(startDate, "MMM d, yyyy")} -{" "}
                {format(endDate, "MMM d, yyyy")}
              </div>
              <Progress value={progress} />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Categories</div>
              <div className="space-y-1">
                {budget.categories.map((allocation) => (
                  <div
                    key={
                      typeof allocation.categoryId === "string"
                        ? allocation.categoryId
                        : allocation.categoryId._id
                    }
                    className="flex justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>
                        {typeof allocation.categoryId === "string"
                          ? "📊"
                          : allocation.categoryId.icon}
                      </span>
                      <span className="text-muted-foreground">
                        {typeof allocation.categoryId === "string"
                          ? "Unknown Category"
                          : allocation.categoryId.title}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>{formatCurrency(allocation.limit)}</span>
                      <span
                        className={cn(
                          "text-muted-foreground font-medium",
                          allocation.spent > allocation.limit
                            ? "text-red-600"
                            : allocation.spent > 0
                            ? "text-green-600"
                            : ""
                        )}
                      >
                        ({formatCurrency(allocation.spent)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

        <div className="flex justify-between text-sm font-medium">
          <span>Remaining:</span>
          <span className={cn(
                          "text-muted-foreground font-medium",
                          budget.remainingAmount < 0
                            ? "text-red-600"
                            : budget.remainingAmount > 0
                            ? "text-green-600"
                            : ""
                        )}>{formatCurrency(budget.remainingAmount)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
