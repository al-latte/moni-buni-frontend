import { Layout } from "@/layouts/Layout";
import  WalletList from "@/features/wallets/components/WalletList";
import { PeriodFilterTabs } from "@/components/PeriodFilterTabs";

export const WalletPage = () => {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8 px-3">
        <div className="lg:w-1/2 lg:pr-32 order-2 lg:order-1">
          <WalletList />
        </div>
        <div className="lg:w-1/2 order-1 lg:order-2">
          <div className="hidden lg:block">
            <PeriodFilterTabs variant="wallet" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
