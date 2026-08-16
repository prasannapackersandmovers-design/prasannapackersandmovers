"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  auth,
} from "@/lib/firebase/client";

const statuses = [
  "CONFIRMED",
  "SCHEDULED",
  "PACKING",
  "READY_FOR_LOADING",
  "LOADING",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
];

export default function BookingDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [booking, setBooking] =
    useState<any>(null);

  const [status, setStatus] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

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
          `/api/admin/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      const data =
        await response.json();

      setBooking(
        data.booking ?? null,
      );

      setStatus(
        data.booking
          ?.bookingStatus ?? "",
      );
    }

    load();
  }, [id]);

  async function updateStatus() {
    try {
      setSaving(true);
      setMessage("");

      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const token =
        await user.getIdToken();

      const response =
        await fetch(
          `/api/admin/bookings/${id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              bookingStatus:
                status,
            }),
          },
        );

      const data =
        await response.json();

      if (!data.success) {
        throw new Error(
          data.message ??
            "Update failed.",
        );
      }

      setMessage(
        "Booking status updated.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Update failed.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!booking) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading booking...
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-700">
          Booking
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          {booking.bookingReference}
        </h2>
      </div>

      {message && (
        <div className="rounded-lg bg-blue-50 text-blue-700 p-4 text-sm">
          {message}
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-slate-400">
            Service
          </p>

          <p className="font-semibold mt-1">
            {booking.serviceType}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Moving Date
          </p>

          <p className="font-semibold mt-1">
            {booking.movingDate}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Pickup
          </p>

          <p className="font-semibold mt-1">
            {booking.pickupAddress}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Drop
          </p>

          <p className="font-semibold mt-1">
            {booking.dropAddress}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Final Price
          </p>

          <p className="font-semibold mt-1">
            {booking.finalPrice
              ? `₹${booking.finalPrice}`
              : "Not set"}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Payment
          </p>

          <p className="font-semibold mt-1">
            {booking.paymentStatus}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          Update Booking Status
        </h3>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value,
              )
            }
            className="flex-1 border border-slate-300 rounded-lg px-4 py-3"
          >
            {statuses.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>

          <button
            onClick={updateStatus}
            disabled={saving}
            className="rounded-lg bg-blue-700 text-white px-6 py-3 font-semibold disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}