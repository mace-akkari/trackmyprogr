"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export function LogoutButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className={`rounded-md border border-white/10 bg-transparent px-3 py-1 text-sm text-text hover:bg-white/10 transition-colors cursor-pointer ${className}`}
    >
      Log out
    </button>
  );
}
