import { ModeToggle } from "@/components/mode-toggle";
// import HeroSection from "./_components/hero-section";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-6xl font-bold">Huni</h1>
        <p className="text-muted-foreground">
          Your space to share thoughts on the songs you love.
        </p>
      </div>
      <div className="mb-32">{children}</div>
    </div>
  );
}
