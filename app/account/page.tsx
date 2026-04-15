"use client";

import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <main className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl capitalize">Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your profile details and account access.
          </p>
        </div>

        <div className="rounded-2xl border border-white bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white bg-background">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || "Profile image"}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-8 w-8 text-primary" />
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold capitalize">
                {user?.displayName || "No display name available"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Email: {user?.email || "No email available"}
              </p>
              <p className="text-sm text-muted-foreground">
                Member since: {user?.metadata.creationTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
