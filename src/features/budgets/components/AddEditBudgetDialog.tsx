import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../auth/hooks/useAuth";
import { budgetSchema, type BudgetFormValues } from "../schemas/budgetSchema";
import { useBudgetMutations, useBudgets } from "../hooks/useBudget";
import { useCategories } from "../../categories/hooks/useCategories";
import { useBudgetDialogStore } from "@/stores/budget.store";
import { useCallback, useEffect, useState } from "react";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Portal } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SelectedCategory {
  categoryId: string;
  title: string;
  limit: number;
}

interface Category {
  _id: string;
  title: string;
  icon: string;
}

interface CategoryBudget {
  categoryId: string | Category;
  limit: number;
}

const redistributeLimits = (
  categories: SelectedCategory[],
  totalAmount: number
): SelectedCategory[] => {
  if (categories.length === 0) return [];
  const evenShare = Math.floor(totalAmount / categories.length);
  const remainder = totalAmount - evenShare * categories.length;
  return categories.map((cat, index) => ({
    ...cat,
    limit: evenShare + (index === 0 ? remainder : 0),
  }));
};

const AddEditBudgetDialog = () => {
  const { createBudget, updateBudget } = useBudgetMutations();
  const { user } = useAuth();
  const { data: userBudgets } = useBudgets(user?._id);

  const { isDialogOpen, budget, closeDialog } = useBudgetDialogStore();

  const { data: categories } = useCategories(user?._id);

  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategory[]
  >([]);

  const isEditing = !!budget;

  const defaultValues: BudgetFormValues = {
    name: "",
    totalAmount: 0,
    dateRange: {
      from: new Date(),
      to: new Date(),
    },
    selectedCategories: [],
    isActive: true,
  };

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues,
  });

  const resetFormWithBudget = useCallback(() => {
    if (!budget) {
      form.reset(defaultValues);
      setSelectedCategories([]);
      return;
    }

    form.reset({
      name: budget.name,
      totalAmount: budget.totalAmount,
      dateRange: {
        from: new Date(budget.startDate),
        to: new Date(budget.endDate),
      },
      selectedCategories: budget.categories.map((cat) =>
        typeof cat.categoryId === "string" ? cat.categoryId : cat.categoryId._id
      ),
    });

    const selectedCats = budget.categories.map((cat: CategoryBudget) => {
      // Handle both string ID and populated category object
      const category =
        typeof cat.categoryId === "string"
          ? categories?.find((c) => c._id === cat.categoryId)
          : cat.categoryId;

      if (!category) {
        // Handle the case where category is undefined
        console.warn(`Category not found for ID: ${cat.categoryId}`);
        return {
          categoryId:
            typeof cat.categoryId === "string"
              ? cat.categoryId
              : cat.categoryId._id,
          title: "",
          limit: cat.limit,
        };
      }

      return {
        categoryId: category._id,
        title: category.title,
        limit: cat.limit,
      };
    });

    setSelectedCategories(selectedCats as SelectedCategory[]);
  }, [budget, form, categories]);

  useEffect(() => {
    if (isDialogOpen) {
      resetFormWithBudget();
    }
  }, [isDialogOpen, resetFormWithBudget]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "totalAmount" && selectedCategories.length > 0) {
        const totalAmount = value.totalAmount as number;
        setSelectedCategories((current) =>
          redistributeLimits([...current], totalAmount)
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form, selectedCategories.length]);

  const onSubmit = async (data: BudgetFormValues) => {
    try {
      if (!user?._id) {
        throw new Error("No user ID available");
      }

      // Ensure dates are properly formatted
      const startDate = new Date(data.dateRange.from);
      const endDate = new Date(data.dateRange.to);

      // Validate dates on the client side
      if (startDate > endDate) {
        throw new Error("Start date must be before or equal to end date");
      }

      if (data.selectedCategories.length === 0) {
        throw new Error("Please select at least one category");
      }

      const totalAllocated = selectedCategories.reduce(
        (sum, cat) => sum + cat.limit,
        0
      );

      if (totalAllocated > data.totalAmount) {
        throw new Error(
          "Total allocated amount cannot exceed budget total amount"
        );
      }

      const formattedData = {
        ...data,
        userId: user._id,
        categories: selectedCategories.map((category) => ({
          categoryId: category.categoryId,
          limit: category.limit,
          spent: 0,
        })),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      

      console.log("Submitting budget:", formattedData);

      if (isEditing && budget) {
        await updateBudget.mutateAsync({
          id: budget._id,
          budget: formattedData,
        });
      } else {
        if (!user?._id) return;
        await createBudget.mutateAsync(formattedData);
      }

      form.reset(defaultValues);
      closeDialog();
    } catch (error) {
      console.error("Error submitting budget:", error);
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] md:h-auto max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit" : "Create"} Budget</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your budget details"
              : "Create a new budget to track your spending"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="rounded-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount</FormLabel>
                  <FormControl className="rounded-full">
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Range</FormLabel>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl className="rounded-full">
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value.from, "PP") +
                            " - " +
                            format(field.value.to, "PP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent
                        className="z-[9999] bg-background p-0 w-full"
                        align="start"
                      >
                        <Calendar
                          mode="range"
                          selected={{
                            from: field.value.from,
                            to: field.value.to,
                          }}
                          onSelect={(range) => {
                            if (!range) {
                              // Reset to current date if range is cleared
                              field.onChange({
                                from: new Date(),
                                to: new Date(),
                              });
                              return;
                            }

                            // Ensure we always have both from and to dates
                            field.onChange({
                              from: range.from || field.value.from,
                              to: range.to || range.from || field.value.to,
                            });
                          }}
                          defaultMonth={field.value.from}
                          initialFocus
                        />
                      </PopoverContent>
                    </Portal>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selectedCategories"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel>Categories</FormLabel>
                  <div className="space-y-4">
                    <Select
                      onValueChange={(value) => {
                        const category = categories?.find(
                          (c) => c._id === value
                        );
                        if (category) {
                          // Check if the category is already selected in the current budget
                          if (selectedCategories.some((sc) => sc.categoryId === value)) {
                            toast({
                              title: "Category already selected",
                              description: "This category has already been added to the budget.",
                              variant: "destructive",
                            });
                            return;
                          }
                          // Check if the category exists in any of the user's existing budgets
                          if (
                            userBudgets &&
                            userBudgets.some((budget) =>
                              budget.categories.some(
                                (cat: CategoryBudget) =>
                                  (typeof cat.categoryId === "string"
                                    ? cat.categoryId
                                    : cat.categoryId._id) === value
                              )
                            )
                          ) {
                            toast({
                              title: "Category already exists in a budget",
                              description:
                                "This category is already being tracked in one of your budgets.",
                              variant: "destructive",
                            });
                            return;
                          }

                          const newCategories = [
                            ...selectedCategories,
                            { categoryId: value, title: category.title, limit: 0 },
                          ];

                          const updatedCategories = redistributeLimits(
                            newCategories,
                            form.getValues("totalAmount")
                          );

                          setSelectedCategories(updatedCategories);
                          field.onChange([...field.value, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-full">
                          <SelectValue placeholder="Select categories" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          ?.filter(
                            (category) =>
                              !selectedCategories.some(
                                (sc) => sc.categoryId === category._id
                              )
                          )
                          .map((category) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>

                    <div className="space-y-2">
                      {selectedCategories.map((category) => (
                        <div
                          key={category.categoryId}
                          className="flex items-center justify-between gap-2 px-2"
                        >
                          
                            <p className="text-sm">{category.title}</p>
                         
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={category.limit}
                              className={cn(
                                "w-24 bg-gray-100 rounded-full text-right",
                                category.limit >
                                  form.getValues("totalAmount") &&
                                  "border-red-500"
                              )}
                              onChange={(e) => {
                                const newLimit = Number(e.target.value);
                                const otherCategoriesTotal = selectedCategories
                                  .filter(
                                    (cat) =>
                                      cat.categoryId !== category.categoryId
                                  )
                                  .reduce((sum, cat) => sum + cat.limit, 0);

                                if (
                                  newLimit + otherCategoriesTotal >
                                  form.getValues("totalAmount")
                                ) {
                                  toast({
                                    title: "Invalid limit",
                                    description:
                                      "Total allocated amount cannot exceed budget total amount",
                                    variant: "destructive",
                                  });
                                  return;
                                }

                                setSelectedCategories(
                                  selectedCategories.map((cat) =>
                                    cat.categoryId === category.categoryId
                                      ? { ...cat, limit: newLimit }
                                      : cat
                                  )
                                );
                              }}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-destructive/10"
                              onClick={() => {
                                const newSelected = selectedCategories.filter(
                                  (cat) => cat.categoryId !== category.categoryId
                                );
                                const updatedCategories = redistributeLimits(
                                  newSelected,
                                  form.getValues("totalAmount")
                                );
                                setSelectedCategories(updatedCategories);
                                field.onChange(
                                  field.value.filter((id) => id !== category.categoryId)
                                );
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full rounded-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Budget"
                  : "Create Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditBudgetDialog;
