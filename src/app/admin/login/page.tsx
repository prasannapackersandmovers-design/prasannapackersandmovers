"use client";

import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/firebase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const adminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL
          ?.trim()
          .toLowerCase();

      const currentEmail =
        currentUser.email
          ?.trim()
          .toLowerCase();

      if (
        adminEmail &&
        currentEmail === adminEmail
      ) {
        router.replace("/admin/dashboard");
      }
    }
  }, [router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError(
        "Please enter your email and password.",
      );
      return;
    }

    setLoading(true);

    try {
      const result =
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password,
        );

      const configuredAdminEmail =
        process.env.NEXT_PUBLIC_ADMIN_EMAIL
          ?.trim()
          .toLowerCase();

      const signedInEmail =
        result.user.email
          ?.trim()
          .toLowerCase();

      if (
        !configuredAdminEmail ||
        !signedInEmail ||
        signedInEmail !== configuredAdminEmail
      ) {
        await auth.signOut();

        setError(
          "This account is not authorized as an administrator.",
        );

        return;
      }

      router.replace("/admin/dashboard");
    } catch (error) {
      console.error(
        "Admin login error:",
        error,
      );

      const firebaseError =
        error as {
          code?: string;
        };

      if (
        firebaseError.code ===
        "auth/invalid-credential"
      ) {
        setError(
          "Invalid email or password.",
        );
      } else if (
        firebaseError.code ===
        "auth/user-not-found"
      ) {
        setError(
          "No administrator account exists with this email.",
        );
      } else if (
        firebaseError.code ===
        "auth/wrong-password"
      ) {
        setError(
          "Incorrect password.",
        );
      } else if (
        firebaseError.code ===
        "auth/too-many-requests"
      ) {
        setError(
          "Too many login attempts. Please try again later.",
        );
      } else {
        setError(
          "Unable to sign in. Please check your Firebase configuration.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#031b3d] via-[#062b61] to-[#073575] px-4 py-10">
      <div className="w-full max-w-md">

        {/* BRAND */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-2xl font-black text-white shadow-xl">
            P
          </div>

          <h1 className="mt-5 text-2xl font-black tracking-wide text-white">
            PRASANNA
          </h1>

          <p className="mt-1 text-sm font-bold tracking-[0.2em] text-orange-400">
            PACKERS & MOVERS
          </p>

          <p className="mt-5 text-sm text-white/60">
            Administrator Portal
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            Admin Login
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Sign in to manage enquiries, customers,
            bookings and services.
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Admin Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="email"
                placeholder="admin@example.com"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 disabled:bg-slate-100"
              />
            </div>

            {/* SIGN IN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 px-4 py-3.5 font-black text-white shadow-lg shadow-orange-600/20 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign in to Admin Panel"}
            </button>
          </form>

          {/* BACK TO WEBSITE */}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-500 transition hover:text-orange-600"
            >
              ← Back to website
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          Authorized administrators only
        </p>
      </div>
    </main>
  );
}