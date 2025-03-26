import { ModeToggle } from "@/components/mode-toggle";
import HeroSection from "./_components/hero-section";

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
      <div className="max-w-md p-4">
        <HeroSection />
        {children}
      </div>
    </div>
  );
}
