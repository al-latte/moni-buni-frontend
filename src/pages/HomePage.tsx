import { Suspense, lazy } from "react";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";
import { Layout } from "@/layouts/Layout";

// Lazy load dialogs and complex components
const AddCategory = lazy(
  () => import("@/features/categories/components/AddCategory")
);
const AddEditTransactionDialog = lazy(
  () => import("@/features/transactions/components/AddEditTransactionDialog")
);
const AddWallet = lazy(() => import("@/features/wallets/components/AddWallet"));

export const HomePage = () => {
  return (
    <Layout>
      <PeriodFilterTabs />
      <Suspense fallback={null}>
        <AddEditTransactionDialog />
        <AddCategory />
        <AddWallet />
      </Suspense>
    </Layout>
  );
};
