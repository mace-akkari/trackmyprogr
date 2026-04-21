"use client";

import Link from "next/link";
import SignInButton from "@/components/auth/LoginButton";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();

  const greetingName = user?.displayName
    ? user.displayName.split(" ")[0]
    : "there";

  return (
    <nav className="sticky top-0 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between items-center flex-col sm:flex-row">
        <Link href={user ? "/dashboard" : "/"} className="text-xl font-bold">
          Track My Progress
        </Link>
        <div className="flex items-center gap-3">
          {user === undefined ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : user ? (
            <>
              <p className="text-sm font-medium capitalize">
                Hey {greetingName}
              </p>
              <LogoutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
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
