import React from "react";
import { register } from "@/app/(auth)/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="E.g joe"
          required
        />
      </div>
      <Button formAction={register} className="w-full">
        Register
      </Button>
    </form>
  );
}
