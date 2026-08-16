"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { adminJson } from "@/lib/admin-api";

type Enquiry = {
  id: string;
  customerId?: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  pickupLocation: string;
  dropLocation: string;
  movingDate: string;
  additionalRequirements?: string;
  status: string;
  source?: string;
  assignedTo?: string;
  adminNotes?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type EnquiryResponse = {
  success: boolean;
  enquiries: Enquiry[];
};

const statuses = [
  "ALL",
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "CONVERTED",
  "CLOSED",
] as const;

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] =
    useState<Enquiry[]>([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadEnquiries() {
    try {
      setLoading(true);
      setError("");

      const result =
        await adminJson<EnquiryResponse>(
          "/api/admin/enquiries",
        );

      setEnquiries(result.enquiries);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load enquiries.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const filtered = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return enquiries.filter(
      (enquiry) => {
        const matchesStatus =
          status === "ALL" ||
          enquiry.status === status;

        const matchesSearch =
          !query ||
          enquiry.fullName
            .toLowerCase()
            .includes(query) ||
          enquiry.phone
            .toLowerCase()
            .includes(query) ||
          enquiry.serviceType
            .toLowerCase()
            .includes(query) ||
          enquiry.pickupLocation
            .toLowerCase()
            .includes(query);

        return (
          matchesStatus &&
          matchesSearch
        );
      },
    );
  }, [
    enquiries,
    search,
    status,
  ]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Customer Requests
        </p>

        <h1 className="mt-1 text-3xl font-black text-slate-900">
          Enquiries
        </h1>

        <p className="mt-2 text-slate-500">
          Manage service requests submitted by customers.
        </p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_220px_auto]">
        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search name, phone, service or location..."
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value)
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-orange-500"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item === "ALL"
                ? "All statuses"
                : item}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={loadEnquiries}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Loading enquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-semibold text-slate-700">
              No enquiries found.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              New website enquiries will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className=" min-w-250 w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Moving Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered.map(
                  (enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-900">
                          {enquiry.fullName}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {enquiry.phone}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-semibold text-slate-700">
                          {enquiry.serviceType}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="max-w-xs text-sm text-slate-600">
                          {enquiry.pickupLocation}
                        </p>
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {enquiry.movingDate}
                      </td>

                      <td className="px-5 py-5">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                          {enquiry.status}
                        </span>
                      </td>

                      <td className="px-5 py-5 text-right">
                        <Link
                          href={`/admin/enquiries/${enquiry.id}`}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
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
        )}
      </div>
    </div>
  );
}