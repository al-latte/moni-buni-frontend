import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  categorySchema,
  type CategoryFormValues,
} from "../schemas/categorySchema";
import { useCategoryMutations } from "../hooks/useCategory";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useCategoryDialogStore } from "@/stores/category.store";
import { useState, useCallback, useEffect } from "react";

const AddCategory = () => {
  const { isDialogOpen, category, closeDialog } = useCategoryDialogStore();
  const { createCategory, updateCategory } = useCategoryMutations();
  const { user } = useAuth();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const isEditing = !!category;

  const defaultValues: CategoryFormValues = {
    title: "",
    icon: "🛒",
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  const resetFormWithCategory = useCallback(() => {
    if (!category) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      title: category.title,
      icon: category.icon,
    });
  }, [category, form]);

  useEffect(() => {
    if (isDialogOpen) {
      resetFormWithCategory();
    }
  }, [isDialogOpen, resetFormWithCategory]);

  const onEmojiClick = (
    emojiData: EmojiClickData,
    field: ControllerRenderProps<CategoryFormValues, "icon">
  ) => {
    field.onChange(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (!user?._id) {
        console.error("No user ID available");
        return;
      }

      if (isEditing && category) {
        await updateCategory.mutateAsync({
          id: category._id,
          category: {
            ...data,
            userId: user._id,
          },
        });
      } else {
        await createCategory.mutateAsync({
          ...data,
          userId: user._id,
        });
      }

      closeDialog();
      form.reset();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} category:`,
        error
      );
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] z-[60]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit" : "Add"} Category</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your category details"
              : "Create a new category for your transactions"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl className="rounded-full">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-full flex items-center gap-2"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <span className="text-xl">{field.value}</span>
                      <span>Select Icon</span>
                    </Button>
                    <div className="absolute z-[70] left-1/2 transform -translate-x-1/2 -bottom-32">
                        <EmojiPicker
                        open={showEmojiPicker}
                          onEmojiClick={(emoji) => onEmojiClick(emoji, field)}
                          width={300}
                          height={400}
                        />
                      </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className="rounded-full flex-1 md:py-6 py-4 font-bold"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update category"
                  : "Create category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
