"use client";
import { ReactNode, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

// routes that anyone can access.
const PUBLIC_ROUTES = new Set<string>(["/"]);

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // checks which page the user is on
  const pathname = usePathname() || "/";
  const isPublic = useMemo(() => PUBLIC_ROUTES.has(pathname), [pathname]);

  const router = useRouter();
  const { user } = useAuth();

  if (user === undefined) {
    return <p>Loading...</p>;
  }

  if (!user && !isPublic) {
    router.push("/");
    return null;
  }

  // show the page if allowed
  return <>{children}</>;
}
