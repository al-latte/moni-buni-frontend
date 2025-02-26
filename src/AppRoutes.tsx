import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./services/ProtectedRoute";
import { WalletPage } from "./pages/WalletPage";
import { BudgetPage } from "./pages/BudgetPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";

export const AppRoutes = () => {
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
