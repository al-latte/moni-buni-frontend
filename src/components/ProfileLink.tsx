import { NavLink } from "react-router-dom";
import { CircleUserRound } from "lucide-react";


export const ProfileLink = () => {

  return (
    <NavLink
      to="/profile"
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-full transition-opacity ${
          isActive ? "opacity-100" : "opacity-75 hover:opacity-100"
        }`
      }
      aria-label="Profile"
    > <CircleUserRound size={32} />
    
    </NavLink>
  );
};
