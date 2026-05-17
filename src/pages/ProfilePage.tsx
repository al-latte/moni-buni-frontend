import { Suspense, lazy } from "react";
import { Layout } from "@/layouts/Layout";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAccountDialog } from '@/features/userAccount/hooks/useAccountDialog'; 
import { User, Lock, Bell, Sun, HelpCircle, LogOut } from "lucide-react";

const EditAccountDialog = lazy(
  () => import("@/features/userAccount/components/EditAccountDialog")
);

const SettingsGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="mb-2">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2 px-1">
      {label}
    </p>
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {children}
    </div>
  </div>
);

const SettingsRow = ({
  icon,
  iconBg,
  iconColor,
  label,
  labelColor = "text-gray-900",
  onClick,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  labelColor?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-100 last:border-none active:bg-gray-50"
  >
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <span className={`text-sm font-medium ${labelColor}`}>{label}</span>
    </div>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
);

const ProfilePage = () => {
  const { user } = useAuth();

   const { mutate: logout } = useLogout();
    const { openDialog } = useAccountDialog();
  
    const handleLogout = () => {
      try {
        logout();
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
  
    const handleEdit = () => {
      if (user) {
        openDialog(user);
      }
    };

  return (
    <Layout>
      <section className="p-3 md:p-6 mb-28">

        {/* Avatar & identity */}
        <div className="flex items-center justify-between pb-5">

          <div>
            <p className="text-xl font-medium">{user?.fullname}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <button onClick={handleEdit} className="mt-1 px-6 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800">
            Edit profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {[
            { label: "Balance", value: "$4,280" },
            { label: "Transactions", value: "38" },
            { label: "Budgets", value: "5" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-gray-50 rounded-2xl p-3.5 text-center">
              <p className="text-lg font-medium text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Settings */}
        <SettingsGroup label="Account">
          <SettingsRow icon={<User size={16} />} iconBg="bg-blue-50" iconColor="text-blue-600" label="Personal info" />
          <SettingsRow icon={<Lock size={16} />} iconBg="bg-green-50" iconColor="text-green-600" label="Security" />
          
        </SettingsGroup>

        <SettingsGroup label="Preferences">
          <SettingsRow icon={<Bell size={16} />} iconBg="bg-purple-50" iconColor="text-purple-600" label="Notifications" />
          <SettingsRow icon={<Sun size={16} />} iconBg="bg-gray-100" iconColor="text-gray-600" label="Appearance" />
        </SettingsGroup>

        <SettingsGroup label="Support">
          <SettingsRow icon={<HelpCircle size={16} />} iconBg="bg-cyan-50" iconColor="text-cyan-600" label="Help & FAQ" />
          <SettingsRow icon={<LogOut size={16} />} iconBg="bg-red-50" iconColor="text-red-600" label="Sign out" labelColor="text-red-600" onClick={handleLogout} />
        </SettingsGroup>

      </section>

      <Suspense fallback={null}>
        <EditAccountDialog />
      </Suspense>
    </Layout>
  );
};

export default ProfilePage;