import { ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
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
import { useState } from "react";

const AddCategory = () => {
  const { isDialogOpen, closeDialog } = useCategoryDialogStore();
  const { createCategory } = useCategoryMutations();
  const { user } = useAuth();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      icon: "🛒",
    },
  });

  const onEmojiClick = (
    emojiData: EmojiClickData, 
    field: ControllerRenderProps<CategoryFormValues, 'icon'>
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
      await createCategory.mutateAsync({
        ...data,
        userId: user?._id,
      });
      closeDialog();
      form.reset();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] z-[60]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a new category for your transactions
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
                    
                    {showEmojiPicker && (
                      <div className="absolute z-[70] mt-1">
                        <EmojiPicker
                          onEmojiClick={(emoji) => onEmojiClick(emoji, field)}
                          width={300}
                          height={400}
                        />
                      </div>
                    )}
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
                  ? "Creating..."
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
