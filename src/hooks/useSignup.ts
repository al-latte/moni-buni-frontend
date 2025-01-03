import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const toast = useToast();
    const navigate = useNavigate();

    return {
        signup: () => {
            toast.toast({
                variant: "success",
                description: "Login Successful!",
            });
            
            // Navigate to home page
            navigate('/');
            
            console.log('login');
        }
    }
}
