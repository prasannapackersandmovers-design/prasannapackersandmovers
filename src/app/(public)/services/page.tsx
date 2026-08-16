import Link from "next/link";
import {
  ArrowRight,
  Tv,
  Droplets,
  Zap,
  Wrench,
  Fan,
  Snowflake,
} from "lucide-react";

import { services } from "@/lib/services";

const iconMap = {
  "air-conditioner": Snowflake,
  tv: Tv,
  water: Droplets,
  geyser: Droplets,
  fan: Fan,
  electrical: Zap,
  plumbing: Wrench,
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
            Our Services
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Professional Home & Office Services
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">
            Prasanna Packers & Movers provides
            convenient service assistance for homes
            and offices. Choose a service below to
            view complete information and submit a
            request.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon];

              return (
                <article
                  key={service.slug}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-orange-600">
                      {service.number}
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    {service.title}
                  </h2>

                  <p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">
                    {service.shortDescription}
                  </p>

                  <div className="mt-6 space-y-2">
                    {service.options.map((option) => (
                      <div
                        key={option.name}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {option.name}
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Need a service?
          </h2>

          <p className="mt-3 text-slate-600">
            Choose the service you need and submit
            your requirements. Our team will contact
            you.
          </p>

          <Link
            href="/enquiry"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
          >
            General Enquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}