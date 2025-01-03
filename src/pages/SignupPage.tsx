import { Input } from "@/components/ui/input";
import fullLogo from "./../assets/logo/full-ver.svg";
import { Button } from "@/components/ui/button";
import { useSignup } from "../hooks/useSignup";

export const SignupPage = () => {
  const { signup }  = useSignup();
  
  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto">
      <div className="md:w-[24rem] w-full flex flex-col p-6 md:border md:border-gray-300 rounded-lg">
        <div className="flex flex-col gap-4 items-center">
          <img src={fullLogo} alt="Logo" className="w-40 mb-8" />
          <Input
            placeholder="Name"
            size="login"
            className="rounded-full border-2 border-black"
          />
          <Input
            placeholder="Email"
            type="email"
            size="login"
            className="rounded-full border-2 border-black"
          />
          <Input
            placeholder="Password"
            type="password"
            size="login"
            className="rounded-full border-2 border-black"
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            size="login"
            className="rounded-full border-2 border-black"
          />
        </div>
        <div className="flex gap-4 justify-center items-center mt-6">
          <Button
            onClick={() => signup()}
            size="login"
            className="rounded-full flex-1 font-bold"
          >
            Create Account
          </Button>
          
        </div>
        <div className="flex flex-col gap-4 items-center">
          <p>
            Already have an account?{" "}
            <span>
              <Button variant="link" className="font-bold">
                Login
              </Button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
