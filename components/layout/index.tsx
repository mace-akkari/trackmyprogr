import Link from "next/link";
import SignInButton from "@/components/auth/LoginButton";

export function Navbar() {
  return (
    <nav className="sticky top-0 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center flex-col sm:flex-row">
        <Link href="/" className="text-xl font-bold">
          Track My Progress
        </Link>
        <SignInButton />
      </div>
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-center text-white/70 text-sm">
          © <time dateTime={String(year)}>{year}</time> Track My Progress
        </p>
      </div>
    </footer>
  );
}
