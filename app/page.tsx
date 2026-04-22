"use client";

import Link from "next/link";
import SignInButton from "@/components/auth/LoginButton";
import { useAuth } from "@/hooks/useAuth";
import { useGoogleSignIn } from "@/components/auth/LoginButton";

export default function Home() {
  const { user } = useAuth();
  const handleGoogleSignIn = useGoogleSignIn();

  return (
    <main className="min-h-dvh bg-background text-text">
      <div className="mx-auto max-w-3xl px-4 py-28 text-center">
        <p className="mb-3 text-xs uppercase tracking-wider text-primary">
          Free • No setup
        </p>
        <h1 className="text-5xl font-bold leading-tight">
          Track your workouts. See your progress.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Build consistency, track your lifts, and actually see your progress
          over time.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-xl border border-white px-6 py-3 text-sm font-medium hover:bg-primary/10"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold">New here?</span> Click below to get
                started.
              </p>
              <SignInButton label="Sign up with Google" />
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="underline">Already have an account?</span>
                <button
                  onClick={handleGoogleSignIn}
                  className="text-primary underline text-xs"
                >
                  Just sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
