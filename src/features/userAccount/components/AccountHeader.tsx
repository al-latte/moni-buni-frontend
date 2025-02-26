import { useAuth } from "@/features/auth/hooks/useAuth";
import SettingsMenu from "@/components/SettingsMenu";

const AccountHeader = () => {
  const { user } = useAuth();
  const spiltName = user?.fullname.split(" ");
  const firstName = spiltName?.[0];
  const lastName = spiltName?.[1];
  return (
    <header className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`}
                  alt="avatar"
                  width={60}
                />
                <div className="flex flex-col">
                  <p className="font-bold text-2xl">{user?.fullname}</p>
                  <p className="text-base text-gray-400"> {user?.email}</p>
                </div>
              </div>
              <SettingsMenu />
            </header>
  )
}
export default AccountHeader