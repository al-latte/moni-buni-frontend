import { Suspense, lazy } from "react";
import { Layout } from "@/layouts/Layout";
import AccountHeader from "@/features/userAccount/components/AccountHeader";
import AccountTabs from "@/features/userAccount/components/AccountTabs";

const EditAccountDialog = lazy(
  () => import("@/features/userAccount/components/EditAccountDialog")
);

const AddCategory = lazy(
  () => import("@/features/categories/components/AddCategory")
);
const AddEditTransactionDialog = lazy(
  () => import("@/features/transactions/components/AddEditTransactionDialog")
);
const AddWallet = lazy(() => import("@/features/wallets/components/AddWallet"));

const AccountSettingsPage = () => {

  return (
    <Layout>
      <section className="container p-4 mx-auto">
      <AccountHeader />
        <main>
          <AccountTabs />
        </main>
      </section>

      <Suspense fallback={null}>
        <EditAccountDialog />
        <AddEditTransactionDialog />
        <AddCategory />
        <AddWallet />
      </Suspense>
    </Layout>
  );
};
export default AccountSettingsPage;
