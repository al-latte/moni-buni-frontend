import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { CategoryList } from "@/features/categories/components/CategoryList";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Grip, Repeat, Siren } from "lucide-react";

const AccountTabs = () => {
  return (
    <section className="relative">
      <Tabs defaultValue="categories" className="w-full md:p-6">
        <TabsList className="grid w-full grid-cols-3 rounded-full bg-white border-2 border-black h-10 p-0 lg:max-w-[1080px] md:mx-auto">
          <TabsTrigger
            value="categories"
            className="flex items-center justify-center gap-2 rounded-full h-full px-4 
                       data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Grip className="h-5 w-5" />
            <span className="hidden lg:inline-block">Categories</span>
          </TabsTrigger>
          <TabsTrigger
            value="recurring transactions"
            className="flex items-center justify-center gap-2 rounded-full h-full px-4 
                       data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Repeat className="h-5 w-5" />
            <span className="hidden lg:inline-block">
              Recurring Transactions
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="flex items-center justify-center gap-2 rounded-full h-full px-4 
                       data-[state=active]:bg-black data-[state=active]:text-white"
          >
            <Siren className="h-5 w-5" />
            <span className="hidden lg:inline-block">Insights</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <CategoryList />
        </TabsContent>
        <TabsContent value="recurring transactions">
          <div className="flex justify-center items-center h-96">
            <h1 className="text-5xl font-bold">
              Recurring Transactions Coming Soon!
            </h1>
          </div>
        </TabsContent>
        <TabsContent value="insights">
          <div className="flex justify-center items-center h-96">
            <h1 className="text-5xl font-bold">Insights Coming Soon!</h1>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AccountTabs;
