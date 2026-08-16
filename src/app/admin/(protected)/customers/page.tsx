"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Phone,
} from "lucide-react";

import {
  auth,
} from "@/lib/firebase/client";

export default function CustomersPage() {
  const [customers, setCustomers] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

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
          "/api/admin/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

      const data =
        await response.json();

      setCustomers(
        data.customers ?? [],
      );

      setLoading(false);
    }

    load();
  }, []);

  const filtered =
    customers.filter((customer) => {
      const q =
        search.toLowerCase();

      return (
        customer.fullName
          ?.toLowerCase()
          .includes(q) ||
        customer.phone
          ?.toLowerCase()
          .includes(q) ||
        customer.email
          ?.toLowerCase()
          .includes(q)
      );
    });

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading customers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-700">
          Customer Management
        </p>

        <h2 className="text-3xl font-bold text-slate-900 mt-1">
          Customers
        </h2>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search customers..."
            className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="text-left px-5 py-4">
                  Name
                </th>

                <th className="text-left px-5 py-4">
                  Phone
                </th>

                <th className="text-left px-5 py-4">
                  Email
                </th>

                <th className="text-right px-5 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.map(
                (customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="font-semibold text-slate-900 hover:text-blue-700"
                      >
                        {customer.fullName}
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <a
                        href={`tel:+91${customer.phone}`}
                        className="inline-flex items-center gap-2 text-slate-600"
                      >
                        <Phone size={15} />
                        {customer.phone}
                      </a>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {customer.email ||
                        "-"}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/customers/${customer.id}`}
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

        {filtered.length ===
          0 && (
          <div className="p-12 text-center text-slate-500">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
}