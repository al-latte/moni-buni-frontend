import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.service';
import { useToast } from './use-toast';
import { LoginInput } from '../schemas/auth.schema';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: LoginInput) => loginUser(data),
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      toast({
        variant: "success",
        description: "Login Successful!",
      });
      navigate('/');
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.message || "Login failed",
      });
    },
  });
};