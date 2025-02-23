import { Suspense, lazy } from "react";
import { BudgetList } from "@/features/budgets/components/BudgetList";
import { Layout } from "@/layouts/Layout";

const AddEditBudgetDialog = lazy(
  () => import("@/features/budgets/components/AddEditBudgetDialog") )

export const BudgetPage = () => {
  return (
    <Layout>
      <BudgetList />
      <Suspense fallback={null}>
      <AddEditBudgetDialog />
      </Suspense>
    </Layout>
  );
};

