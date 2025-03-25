import { ModeToggle } from "@/components/mode-toggle";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      {children}
    </div>
  );
}
