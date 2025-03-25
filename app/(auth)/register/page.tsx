import Link from "next/link";
import RegisterForm from "../_components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-sm text-center">
        <h1 className="text-6xl font-bold">Huni</h1>
        <p>
          Your space to share thoughts on the songs you love and connect with a
          community.
        </p>
      </div>
      <RegisterForm />

      <div className="text-center text-sm">
        <span>Already have an account? </span>
        <Link href="/login" className="font-medium underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
