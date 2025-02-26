import { useUserStore } from '@/stores/user.store';

export const useAccountDialog = () => {
  const { 
    user, 
    isDialogOpen, 
    openDialog, 
    closeDialog 
  } = useUserStore();
  
  return {
    user,
    isDialogOpen,
    openDialog,
    closeDialog
  };
};