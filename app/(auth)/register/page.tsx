import Link from "next/link";
import RegisterForm from "../_components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-4">
      <RegisterForm />

      <div className="text-center text-sm">
        <span>Already have an account? </span>
        <Link href="/login" className="font-bold hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}
