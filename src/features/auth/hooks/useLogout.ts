import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../api/authService';
import { useAuth } from './useAuth';
import { useToast } from '../../../hooks/use-toast';
import { AxiosError } from 'axios';

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuth();
  const { toast } = useToast();

   return useMutation({
    mutationFn: authService.logoutUser,
    onSuccess: () => {
      clearAuth();
      navigate('/login', { replace: true });
      toast({
        variant: "success",
        description: "Logged out successfully",
      });
    },
    onError: (error: AxiosError) => {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to logout. Please try again.",
      });
    },
  });
};