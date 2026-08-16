"use client";

import {
  useEffect,
  useState,
} from "react";

import { adminJson } from "@/lib/admin-api";

type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
};

const defaultServices: Service[] = [
  {
    id: "ac-services",
    name: "AC Services",
    slug: "ac-services",
    description:
      "AC installation, servicing and maintenance.",
    active: true,
  },
  {
    id: "tv-installation-service",
    name: "TV Installation & Service",
    slug: "tv-installation-service",
    description:
      "TV installation, wall mounting and service.",
    active: true,
  },
  {
    id: "water-purifier",
    name: "Water Purifier",
    slug: "water-purifier",
    description:
      "Water purifier installation, service and maintenance.",
    active: true,
  },
  {
    id: "geyser-services",
    name: "Geyser Services",
    slug: "geyser-services",
    description:
      "Geyser installation, service and maintenance.",
    active: true,
  },
  {
    id: "fan-services",
    name: "Fan Services",
    slug: "fan-services",
    description:
      "Fan installation, repair and replacement.",
    active: true,
  },
  {
    id: "electrical-work",
    name: "Electrical Work",
    slug: "electrical-work",
    description:
      "General electrical installation and repair.",
    active: true,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    description:
      "Household and office plumbing services.",
    active: true,
  },
];

export default function ServicesAdminPage() {
  const [services, setServices] =
    useState<Service[]>(
      defaultServices,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setError("");

        const data =
          await adminJson<{
            success: boolean;
            services: Service[];
          }>(
            "/api/admin/services",
          );

        if (
          data.services &&
          data.services.length > 0
        ) {
          setServices(data.services);
        }
      } catch (error) {
        console.error(error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load services.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          Management
        </p>

        <h1 className="mt-1 text-3xl font-black text-slate-900">
          Services
        </h1>

        <p className="mt-2 text-slate-500">
          Manage the services offered by
          Prasanna Packers & Movers.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
          Loading services...
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-bold text-slate-900">
                  {service.name}
                </h2>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    service.active
                      ? "bg-green-50 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {service.active
                    ? "Active"
                    : "Inactive"}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {service.description}
              </p>

              <p className="mt-4 text-xs font-semibold text-slate-400">
                /services/{service.slug}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}