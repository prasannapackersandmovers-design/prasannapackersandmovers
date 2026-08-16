"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import {
  adminJson,
} from "@/lib/admin-api";

type DashboardData = {
  success: boolean;

  stats: {
    totalEnquiries: number;
    newEnquiries: number;
    totalCustomers: number;
    totalBookings: number;
    pendingBookings: number;
    completedBookings: number;
  };

  recentEnquiries: Array<{
    id: string;
    fullName?: string;
    serviceType?: string;
    phone?: string;
    status?: string;
    movingDate?: string;
  }>;
};

const cards = [
  {
    key: "totalEnquiries",
    label: "Total Enquiries",
  },
  {
    key: "newEnquiries",
    label: "New Enquiries",
  },
  {
    key: "totalCustomers",
    label: "Customers",
  },
  {
    key: "totalBookings",
    label: "Bookings",
  },
  {
    key: "pendingBookings",
    label: "Pending Bookings",
  },
  {
    key: "completedBookings",
    label: "Completed Bookings",
  },
] as const;

export default function AdminDashboardPage() {
  const [data, setData] =
    useState<DashboardData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const result =
          await adminJson<DashboardData>(
            "/api/admin/dashboard",
          );

        setData(result);
      } catch (err) {
        console.error(
          "Dashboard loading error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load dashboard.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-black text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage Prasanna Packers & Movers.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-6 text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(
          (card) => (
            <div
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {card.label}
              </p>

              <p className="mt-3 text-3xl font-black text-slate-900">
                {loading
                  ? "—"
                  : data?.stats[
                      card.key
                    ] ?? 0}
              </p>
            </div>
          ),
        )}
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Enquiries
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest customer requests.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-sm font-bold text-orange-500 hover:text-orange-600"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading enquiries...
          </div>
        ) : data?.recentEnquiries
            ?.length ? (
          <div className="divide-y divide-slate-100">
            {data.recentEnquiries.map(
              (enquiry) => (
                <Link
                  key={enquiry.id}
                  href={`/admin/enquiries/${enquiry.id}`}
                  className="block p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row">
                    <div>
                      <p className="font-bold text-slate-900">
                        {enquiry.fullName ||
                          "Unnamed customer"}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {enquiry.serviceType ||
                          "Service enquiry"}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm text-slate-600">
                        {enquiry.phone ||
                          "No phone"}
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                        {enquiry.status ||
                          "NEW"}
                      </span>
                    </div>
                  </div>
                </Link>
              ),
            )}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-slate-500">
            No enquiries yet.
          </div>
        )}
      </section>
    </div>
  );
}