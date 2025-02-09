import { Layout } from "@/layouts/Layout";
import { CategoryList } from "@/features/categories/components/CategoryList";
import { Suspense, lazy } from "react";

const AddCategory = lazy(() => import("@/features/categories/components/AddCategory"));

export const CategorySettingsPage = () => {
  return (
    <Layout>
      <div className="px-3 md:px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <CategoryList />
        </div>
      </div>
      <Suspense fallback={null}>
        <AddCategory />
      </Suspense>
    </Layout>
  );
};
