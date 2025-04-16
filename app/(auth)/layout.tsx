import { ModeToggle } from "@/components/mode-toggle";
import HeroSection from "./_components/hero-section";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <HeroSection />
      {children}
    </div>
  );
}
