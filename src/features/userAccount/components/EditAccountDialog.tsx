import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
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
import {
  accountSchema,
  AccountFormValues,
} from "@/features/userAccount/schema/accountSchema";
import { useAccountMutaions } from "../hooks/useAccount";
import { useCallback, useEffect } from "react";
import { useAccountDialog } from "../hooks/useAccountDialog";

const EditAccountDialog = () => {
  const { isDialogOpen, closeDialog, user } = useAccountDialog();
  const { updateAccount } = useAccountMutaions();

  const defaultValues: AccountFormValues = {
    fullname: user?.fullname || "",
    password: "",
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues,
  });

  const resetFormWithUser = useCallback(() => {
    if (!user) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      fullname: user?.fullname,
      password: "",
    });
  }, [user, form]);

  useEffect(() => {
    if (isDialogOpen) {
      resetFormWithUser();
    }
  }, [isDialogOpen, resetFormWithUser]);

  const onSubmit = (data: AccountFormValues) => {
    const updateData = {
      id: user?._id || "",
      data: {
        fullname: data.fullname,
        ...(data.password ? { password: data.password } : {}),
      },
    };
    
    updateAccount.mutateAsync(updateData);
    closeDialog();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] z-[60] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
          <DialogDescription>
            Update your account details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullname"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full rounded-full">
              {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountDialog;
