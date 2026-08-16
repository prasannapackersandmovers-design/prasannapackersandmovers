"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  auth,
} from "@/lib/firebase/client";

export default function BookingsPage() {
  const [bookings, setBookings] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const token =
        await user.getIdToken();

      const response =
        await fetch(
          "/api/admin/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      const data =
        await response.json();

      setBookings(
        data.bookings ?? [],
      );

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-700">
          Operations
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          Bookings
        </h2>

        <p className="text-slate-500 mt-2">
          Manage confirmed customer moves.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-5 py-4">
                  Reference
                </th>

                <th className="text-left px-5 py-4">
                  Service
                </th>

                <th className="text-left px-5 py-4">
                  Route
                </th>

                <th className="text-left px-5 py-4">
                  Moving Date
                </th>

                <th className="text-left px-5 py-4">
                  Status
                </th>

                <th className="text-right px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {bookings.map(
                (booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {booking.bookingReference}
                    </td>

                    <td className="px-5 py-4">
                      {booking.serviceType}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {booking.pickupAddress}
                      <div className="text-xs text-slate-400">
                        ↓{" "}
                        {booking.dropAddress}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      {booking.movingDate}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-semibold">
                        {
                          booking.bookingStatus
                        }
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="text-blue-700 font-semibold"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {bookings.length ===
          0 && (
          <div className="p-12 text-center text-slate-500">
            No bookings yet.
          </div>
        )}
      </div>
    </div>
  );
}