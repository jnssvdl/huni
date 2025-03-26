import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <LoginForm />

      <div className="text-center text-sm">
        <span>Don&apos;t have an account? </span>
        <Link href="/register" className="font-bold hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
}
