"use client";

import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/client";

type AdminGuardProps = {
  children: ReactNode;
};

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          if (!currentUser) {
            setUser(null);
            setChecking(false);

            router.replace(
              "/admin/login",
            );

            return;
          }

          const adminEmail =
            process.env.NEXT_PUBLIC_ADMIN_EMAIL
              ?.trim()
              .toLowerCase();

          const currentEmail =
            currentUser.email
              ?.trim()
              .toLowerCase();

          if (
            !adminEmail ||
            !currentEmail ||
            currentEmail !== adminEmail
          ) {
            console.warn(
              "Unauthorized admin account:",
              currentEmail,
            );

            try {
              await signOut(auth);
            } catch (error) {
              console.error(
                "Admin sign-out failed:",
                error,
              );
            }

            setUser(null);
            setChecking(false);

            router.replace(
              "/admin/login",
            );

            return;
          }

          setUser(currentUser);
          setChecking(false);
        },
      );

    return () => {
      unsubscribe();
    };
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-orange-500" />

          <p className="mt-5 text-sm font-medium text-slate-400">
            Checking administrator access...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}