import { Layout } from "@/layouts/Layout";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { CategoryList } from "@/features/categories/components/CategoryList";
import WalletList from "@/features/wallets/components/WalletList";
import { Grid3X3, WalletCards } from "lucide-react";

const SettingsPage = () => {
  return (
    <Layout>
      <section className="p-3 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm font-medium text-gray-500">
            Manage the app data you use across transactions.
          </p>
        </div>

        <Tabs defaultValue="wallets" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-white border-2 border-black h-10 p-0 lg:max-w-[520px]">
            <TabsTrigger
              value="wallets"
              className="flex items-center justify-center gap-2 rounded-full h-full px-4 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <WalletCards className="h-5 w-5" />
              <span>Wallets</span>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="flex items-center justify-center gap-2 rounded-full h-full px-4 data-[state=active]:bg-black data-[state=active]:text-white"
            >
              <Grid3X3 className="h-5 w-5" />
              <span>Categories</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallets">
            <WalletList />
          </TabsContent>
          <TabsContent value="categories">
            <CategoryList />
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default SettingsPage;
