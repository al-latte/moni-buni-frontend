import { Category } from "../types/category.types";
import { useCategoryDialogStore } from "@/stores/category.store";

import { useState } from "react";
import { useCategoryMutations } from "../hooks/useCategory";
import { motion,
  useMotionValue,
  useTransform,
  useDragControls } from "motion/react";;
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
interface CategoryItemProps {
  category: Category;
  custom: number;
}

export const CategoryItem = ({ category, custom }: CategoryItemProps) => {
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [ alertOpen, setAlertOpen ] = useState(false);
  const { openDialog } = useCategoryDialogStore();
  const { deleteCategory } = useCategoryMutations();

  const handleEdit = () => {
   // setIsDropdownOpen(false);
    openDialog(category);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory.mutateAsync(category._id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const x = useMotionValue(0);
  const dragControls = useDragControls();

  //useTransform(x(is motion value), input range, output range)
  const deleteProgress = useTransform(x, [-100, -20], [1, 0]);
  const deleteWidth = useTransform(
    x,
    value => value < 0 ? Math.abs(value) : 0
  );

  const editProgress = useTransform(x, [20, 100], [0, 1]);
  const editWidth = useTransform(
    x, 
    value => value > 0 ? value : 0
  );

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      handleEdit();
    } else if (info.offset.x < -100) {
      setAlertOpen(true);
    }
    x.set(0);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Edit action on the left side (appears when swiping left) */}
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{ delay: 2 }}
          style={{ width: editWidth }}
          className="bg-blue-500 flex items-center justify-center overflow-hidden rounded-s-xl"
        >
          <motion.div
            style={{ opacity: editProgress }}
            className="flex items-center text-white px-4"
          >
            <span className="font-medium">Edit</span>
          </motion.div>
        </motion.div>
        {/* Spacer to push delete action to the right */}
        <div className="flex-grow"></div>
        {/* Delete action on the right side (appears when swiping right) */}
        <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1}}
         transition={{ delay: 2 }}
          style={{ width: deleteWidth }}
          className="bg-red-500 flex items-center justify-center overflow-hidden rounded-e-xl"
        >
          <motion.div
            style={{ opacity: deleteProgress }}
            className="flex items-center text-white px-4"
          >
            <span className="font-medium">Delete</span>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          duration: 0.5,
          ease: "easeOut",
          delay: custom * 0.2,
        }}
        className="py-2 text-sm relative border-b border-gray-200 md:border md:shadow-sm md:rounded-xl"
        style={{ x }}
        drag="x"
        dragControls={dragControls}
        dragConstraints={{ left: 0, right: 0 }} // Allow some movement before snapping back
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
      >
        <div className="p-2   ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div>
                <h3 className="font-semibold">{category.title}</h3>
              </div>
            </div>

            {/* <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
          </DropdownMenu> */}
          </div>
        </div>
      </motion.div>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="border-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              transaction and remove it from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
