import { Layout } from "@/layouts/Layout";
import { WalletList } from "@/features/wallets/components/WalletList";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";

export const WalletPage = () => {
  return (
    <Layout>
      <div className="grid lg:grid-cols-2 gap-8 px-3">
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl font-bold my-6">My Wallets</h2>
          <WalletList />
        </div>
        <div className="hidden lg:block order-1 lg:order-2">
        <PeriodFilterTabs variant="wallet" />
        </div>
      </div>
    </Layout>
  );
};
