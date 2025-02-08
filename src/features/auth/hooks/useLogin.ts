import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useAuth } from './useAuth';
import { useToast } from '../../../hooks/use-toast';
import { AxiosError } from 'axios';
import { LoginFormValues } from '../schemas/authSchema';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: LoginFormValues) => authService.loginUser(data),
    onSuccess: (data) => {
      login(data);
      toast({
        variant: "success",
        description: "Login Successful!",
      });
      navigate('/');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.message || "Login failed",
      });
    },
  });
};