import { Category } from "../types/category.types";
import { Card } from "@/components/ui/card";
import { Edit, Ellipsis, Trash } from "lucide-react";
import { useCategoryDialogStore } from "@/stores/category.store";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCategoryMutations } from "../hooks/useCategory";
import { motion } from "motion/react";

interface CategoryItemProps {
  category: Category;
  custom: number;
}

export const CategoryItem = ({ category, custom }: CategoryItemProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openDialog } = useCategoryDialogStore();
  const { deleteCategory } = useCategoryMutations();

  const handleEdit = () => {
    setIsDropdownOpen(false);
    openDialog(category);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory.mutateAsync(category._id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", duration: 0.5, ease: "easeOut", delay: custom * 0.2 }}
    className="py-2 text-sm">

    <Card className="p-4 rounded-xl hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">{category.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold">{category.title}</h3>
          </div>
        </div>
        
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
              <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-3 mx-2 bg-white shadow-md border rounded">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleEdit}>
                <Button className="rounded-full w-full">
                <Edit className="h-4 w-4" />
                Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
              onClick={handleDelete}
              className="rounded-full w-full bg-red-600"
            >
              <Trash className="h-4 w-4" />
              Delete
            </Button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
    </motion.div>
  );
};