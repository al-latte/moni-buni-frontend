import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/auth.service';
import { useToast } from './use-toast';
import { SignupInput } from '../schemas/auth.schema';
import { AxiosError } from 'axios';

export const useSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: SignupInput) => signupUser(data),
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data));
      toast({
        variant: "success",
        description: "Account created successfully!",
      });
      navigate('/');
    },
    onError: (error: AxiosError) => {
      toast({
        variant: "destructive",
        description: error?.response?.data?.message || "Signup failed",
      });
    },
  });
};