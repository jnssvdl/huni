import Link from "next/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
  return (
    <>
      <LoginForm />

      <div className="mt-4 text-center">
        <span className="text-muted-foreground">
          Don&apos;t have an account?{" "}
        </span>
        <Link href="/register" className="font-bold hover:underline">
          Register
        </Link>
      </div>
    </>
  );
}
