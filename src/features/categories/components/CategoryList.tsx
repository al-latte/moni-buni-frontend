import { useCategories } from "../hooks/useCategories";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { CategoryItem } from "./CategoryItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCategoryDialogStore } from "@/stores/category.store";

export const CategoryList = () => {
  const { user } = useAuth();
  const { data: categories, isLoading } = useCategories(user?._id);
  const { openDialog } = useCategoryDialogStore();

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-xl" />
      ))}
    </div>;
  }

  return (
    <div className="space-y-4 mb-44">
    <div className="flex justify-between items-center my-6">
      <h2 className="text-2xl font-bold">Categories </h2>
      <Button 
        onClick={() => openDialog()}
        className="rounded-full"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New Category
      </Button>
      </div>
      
      
      {!categories?.length ? (
        <div className="text-center py-8 text-gray-500">
          No categories found. Create your first category to get started.
        </div>
      ) : (
        <div className="grid gap-4">
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};