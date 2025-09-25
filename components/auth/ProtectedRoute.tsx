"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

// routes that anyone can access.
const PUBLIC_ROUTES = new Set<string>(["/"]);

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // checks which page the user is on
  const pathname = usePathname() || "/";
  const isPublic = useMemo(() => PUBLIC_ROUTES.has(pathname), [pathname]);

  const router = useRouter();

  // check if a user is signed in
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) =>
      setUser(firebaseUser)
    );
    return () => unsub();
  }, []);

  // redirect if not logged in
  useEffect(() => {
    if (user === null && !isPublic) {
      router.replace("/");
    }
  }, [user, isPublic, router]);

  // show the page if allowed
  return <>{children}</>;
}
