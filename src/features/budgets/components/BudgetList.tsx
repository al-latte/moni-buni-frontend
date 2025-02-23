import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useBudgets } from "../hooks/useBudget";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useBudgetDialogStore } from "@/stores/budget.store";
import { Card, CardContent } from "@/components/ui/card";
import BudgetGroup from "./BudgetGroup";
import { Progress } from "@/components/ui/progress";
import { groupBudgetsByIsActive } from "@/utils/budgetFilter";

export const BudgetList = () => {
  const { user } = useAuth();
  const { data: budgets, isLoading } = useBudgets(user?._id);
  const { openDialog } = useBudgetDialogStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 95 ? prev + 5 : prev));
      }, 100);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center space-y-4">
        <p>Loading budgets...</p>
        <Progress value={progress} className="w-[60%]" />
      </div>
    );
  }

  const groupedBudgets = groupBudgetsByIsActive(budgets ?? []);

  return (
    <div className="mb-44 w-full p-3 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Budgets</h2>
        <Button
          onClick={() => openDialog()}
          className="rounded-full"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Budget
        </Button>
      </div>

      {!budgets?.length ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-[200px] space-y-4">
            <p className="text-muted-foreground">No budgets found</p>
            <Button
              onClick={() => openDialog()}
              className="rounded-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first budget
            </Button>
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedBudgets).map(([groupLabel, groupBudgets]) => (
          <BudgetGroup key={groupLabel} label={groupLabel} budgets={groupBudgets} />
        ))
      )}
    </div>
  );
};
