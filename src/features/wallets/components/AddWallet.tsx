import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { walletSchema, type WalletFormValues } from "../schemas/walletSchema";
import { useWalletMutations } from "../hooks/useWallet";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useWalletDialogStore } from "@/stores/wallet.store";
import { useCallback, useEffect } from "react";

const AddWallet = () => {
  const { isDialogOpen, wallet, closeDialog } = useWalletDialogStore();
  const { createWallet, updateWallet } = useWalletMutations();
  const { user } = useAuth();
  const isEditing = !!wallet;

  const defaultValues: WalletFormValues = {
    title: "",
    balance: 0,
    description: "",
    setAsDefault: false,
  };

  const form = useForm<WalletFormValues>({
    resolver: zodResolver(walletSchema),
    defaultValues,
  });

  const resetFormWithWallet = useCallback(() => {
    if (!wallet) {
      form.reset(defaultValues);
      return;
    }

    form.reset({
      title: wallet.title,
      balance: wallet.balance,
      description: wallet.description,
      setAsDefault: wallet.setAsDefault,
    });
  }, [wallet, form]);

  useEffect(() => {
    if (isDialogOpen) {
      resetFormWithWallet();
    }
  }, [isDialogOpen, resetFormWithWallet]);

  const onSubmit = async (data: WalletFormValues) => {
    try {
      if (!user?._id) return;

      if (isEditing && wallet) {
        await updateWallet.mutateAsync({
          id: wallet._id,
          wallet: {
            ...data,
            userId: user._id,
          },
        });
      } else {
        await createWallet.mutateAsync({
          ...data,
          userId: user._id,
        });
      }

      form.reset();
      closeDialog();
    } catch (error) {
      console.error(
        `Error ${isEditing ? "updating" : "creating"} wallet:`,
        error
      );
    }
  };

  if (!isDialogOpen) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent className="sm:max-w-[425px] z-[60]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit" : "Add"} Wallet</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your wallet details"
              : "Create a new wallet for your transactions"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="balance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Balance</FormLabel>
                  <FormControl className="rounded-full">
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl className="rounded-full">
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="setAsDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-4">
                  <div className="space-y-0.5 ">
                    <FormLabel className="text-base">Default Wallet</FormLabel>
                    <FormDescription>
                      Use this wallet as your primary account
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
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
                  ? "Update wallet"
                  : "Create wallet"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWallet;
