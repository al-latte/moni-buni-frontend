import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./services/ProtectedRoute";
import { WalletPage } from "./pages/WalletPage";
import { BudgetPage } from "./pages/BudgetPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import { useUserStore } from "./stores/user.store";
import { useEffect } from "react";
import { api } from "./services/axios.config";
import { toast } from "./hooks/use-toast";
import { AxiosError } from "axios";

export const AppRoutes = () => {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  // Validate authentication on app load
  useEffect(() => {
    const validateAuth = async () => {
      if (user?.token) {
        try {
          // Make a request to validate the token
          await api.get('/wallets'); 
        } catch (error) {
          if (error instanceof AxiosError) {
          if (error.status === 401) {
            toast({
              title: 'Authentication validation failed',
              description: 'Please login again',
              variant: "destructive",
            })
            logout();
            navigate('/login');
          }
        }
      }
      }
    };

    validateAuth();
  }, []);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallets" element={<WalletPage />} />
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
};
