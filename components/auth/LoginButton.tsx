"use client";

import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FcGoogle } from "react-icons/fc";

type SignInButtonProps = {
  label?: string;
  className?: string;
};

export default function SignInButton({
  label = "Sign in with Google",
  className,
}: SignInButtonProps) {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className={
        "rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 cursor-pointer flex items-center justify-center gap-2 " +
        (className ? className : "")
      }
      type="button"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
        <FcGoogle className="h-4 w-4" />
      </span>
      {label}
    </button>
  );
}
