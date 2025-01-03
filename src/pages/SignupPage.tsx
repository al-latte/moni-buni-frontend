import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupSchema, type SignupInput } from '@/schemas/auth.schema';
import { useSignup } from '@/hooks/useSignup';
import fullLogo from "@/assets/logo/full-ver.svg";
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  const { mutate: signup, isPending } = useSignup();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data: SignupInput) => {
    signup(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[24rem] w-full flex flex-col gap-4 p-6 md:border md:border-gray-300 rounded-lg">
        <div className="flex flex-col gap-4 items-center">
          <img src={fullLogo} alt="Logo" className="w-40 mb-8" />
          <div className="w-full space-y-1">
            <Input
              {...register('fullname')}
              placeholder="Name"
              size="login"
              className="rounded-full border-2 border-black"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm px-3">{errors.fullname.message}</p>
            )}
          </div>
          <div className="w-full space-y-1">
            <Input
              {...register('email')}
              placeholder="Email"
              type="email"
              size="login"
              className="rounded-full border-2 border-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm px-3">{errors.email.message}</p>
            )}
          </div>
          <div className="w-full space-y-1">
            <Input
              {...register('password')}
              placeholder="Password"
              type="password"
              size="login"
              className="rounded-full border-2 border-black"
            />
            {errors.password && (
              <p className="text-red-500 text-sm px-3">{errors.password.message}</p>
            )}
          </div>
          <div className="w-full space-y-1">
            <Input
              {...register('confirmPassword')}
              placeholder="Confirm Password"
              type="password"
              size="login"
              className="rounded-full border-2 border-black"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm px-3">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-6">
          <Button
            type="submit"
            size="login"
            className="rounded-full flex-1 font-bold"
            disabled={isPending}
          >
            {isPending ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              <Button variant="link" className="font-bold">
                Login
              </Button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};