import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginFormValues } from '../schemas/authSchema';
import { useLogin } from '../hooks/useLogin';
import fullLogo from "@/assets/logo/full-ver.svg";
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormValues>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[24rem] w-full flex flex-col gap-4 p-6 md:border md:border-gray-300 rounded-lg">
        <div className="flex flex-col gap-4 items-center">
          <img src={fullLogo} alt="Logo" className="w-40 mb-8" />
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
        </div>
        <div className="flex gap-4 justify-center items-center mt-6">
          <Button
            type="submit"
            size="login"
            className="rounded-full flex-1 font-bold"
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <Button variant="link" className="font-bold underline">
                Sign Up Now!
              </Button>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;