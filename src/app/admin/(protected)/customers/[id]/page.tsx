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

export default function CustomerDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const [customer, setCustomer] =
    useState<any>(null);

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
          `/api/admin/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      const data =
        await response.json();

      setCustomer(
        data.customer ?? null,
      );

      setLoading(false);
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="py-20 text-center text-red-600">
        Customer not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <p className="text-sm text-blue-700 font-medium">
          Customer
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          {customer.fullName}
        </h2>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase text-slate-400">
            Phone
          </p>

          <a
            href={`tel:+91${customer.phone}`}
            className="font-semibold text-blue-700 mt-1 block"
          >
            {customer.phone}
          </a>
        </div>

        <div>
          <p className="text-xs uppercase text-slate-400">
            Email
          </p>

          <p className="font-semibold mt-1">
            {customer.email ||
              "-"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs uppercase text-slate-400">
            Address
          </p>

          <p className="font-semibold mt-1">
            {customer.address ||
              "-"}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-xs uppercase text-slate-400">
            Notes
          </p>

          <p className="text-slate-600 mt-1 whitespace-pre-wrap">
            {customer.notes ||
              "No notes."}
          </p>
        </div>
      </div>
    </div>
  );
}