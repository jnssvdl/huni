import Link from "next/link";
import RegisterForm from "../_components/register-form";

export default function RegisterPage() {
  return (
    <>
      <RegisterForm />

      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="font-bold hover:underline">
          Log in
        </Link>
      </div>
    </>
  );
}
