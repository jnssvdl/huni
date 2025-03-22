import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <form>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email:</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password:</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
    </form>
  );
}
