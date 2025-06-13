import { AuthFormHeader, LoginForm } from "@/components/forms/auth";

export default function LoginPage() {
  return (
    <div>
        <AuthFormHeader
        title="Login to you account"
        staticText="Don't have an account?"
        linkText="Register Here"
        linkHref="/register"
        />
        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-slate-300 dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
            <LoginForm />
          </div>
        </div>
    </div>
  );
}