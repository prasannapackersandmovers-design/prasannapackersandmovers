"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { signOut } from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/firebase/client";

const navigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "▦",
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: "✉",
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: "♙",
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: "▣",
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: "⚙",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "☷",
  },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [adminEmail, setAdminEmail] =
    useState("");

  useEffect(() => {
    setAdminEmail(
      auth.currentUser?.email ?? "",
    );

    const unsubscribe =
      auth.onIdTokenChanged((user) => {
        setAdminEmail(
          user?.email ?? "",
        );
      });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);

      router.replace(
        "/admin/login",
      );
    } catch (error) {
      console.error(
        "Logout failed:",
        error,
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-800 bg-slate-950 text-white lg:block">
        <div className="flex h-20 items-center border-b border-slate-800 px-6">
          <div>
            <p className="text-lg font-black tracking-tight">
              PRASANNA
            </p>

            <p className="text-xs font-medium text-orange-400">
              PACKERS & MOVERS
            </p>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`,
              );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="w-5 text-center">
                  {item.icon}
                </span>

                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
          <div className="mb-3 rounded-xl bg-slate-900 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Administrator
            </p>

            <p className="mt-1 truncate text-xs font-semibold text-slate-300">
              {adminEmail ||
                "Authenticated admin"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
                Admin Portal
              </p>

              <h1 className="text-lg font-bold text-slate-900">
                Prasanna Packers & Movers
              </h1>
            </div>

            <div className="flex items-center">
              <div className="mr-3 hidden text-right sm:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Administrator
                </p>

                <p className="max-w-64 truncate text-sm font-semibold text-slate-700">
                  {adminEmail ||
                    "Authenticated admin"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}