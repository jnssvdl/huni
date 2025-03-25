import React from "react";

import { login } from "@/app/(auth)/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4" action={login}>
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Log in
      </Button>
    </form>
  );
}
