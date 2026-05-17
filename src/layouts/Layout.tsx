import { Suspense, lazy } from "react";
import { MainNav } from "@/components/MainNav";
import { MobileNav } from "@/components/MobileNav";
import { ProfileLink } from "@/components/ProfileLink";
import fullHorizontalLogo from "./../assets/logo/full-hor.svg";

const AddCategory = lazy(() => import("@/features/categories/components/AddCategory"));
const AddEditTransactionDialog = lazy(() => import("@/features/transactions/components/AddEditTransactionDialog"));
const AddWallet = lazy(() => import("@/features/wallets/components/AddWallet"));

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col md:flex-row max-w-[1920px] mx-auto">
      <div className="md:hidden flex items-center justify-between p-4 h-16">
        <img src={fullHorizontalLogo} alt="logo" className="w-auto h-full" />
        <ProfileLink />
      </div>
      <div className="block lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <MainNav />
      </div>
      <div className="flex-1 md:py-4 md:px-20">
        {children}
      </div>
      <Suspense fallback={null}>
        <AddEditTransactionDialog />
        <AddCategory />
        <AddWallet />
      </Suspense>
    </div>
  );
};
