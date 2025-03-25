import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-sm text-center">
        <h1 className="text-6xl font-bold">Huni</h1>
        <p>
          Your space to share thoughts on the songs you love and connect with a
          community.
        </p>
      </div>

      <LoginForm />

      <div className="text-center text-sm">
        <span>Don&apos;t have an account? </span>
        <Link href="/register" className="font-medium underline">
          Register
        </Link>
      </div>
    </div>
  );
}
