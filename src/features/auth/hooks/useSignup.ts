import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { useAuth } from './useAuth';
import { useToast } from '../../../hooks/use-toast';
import { SignupFormValues } from '../schemas/authSchema';
import { AxiosError } from 'axios';

export const useSignup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SignupFormValues) => authService.signupUser(data),
    onSuccess: (data) => {
      if (data.user && data.token) {
        login(data);
        toast({
          variant: "success",
          description: "Account created successfully!",
        });
        navigate('/', { replace: true });
      } else {
        throw new Error('Invalid response format');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.message || "Signup failed",
      });
    },
  });
};