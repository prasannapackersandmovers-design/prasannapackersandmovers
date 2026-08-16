import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Tv,
  Droplets,
  Zap,
  Wrench,
  Fan,
  Snowflake,
  Phone,
} from "lucide-react";

import ServiceEnquiryForm from "@/components/public/service-enquiry-form";
import {
  getServiceBySlug,
  services,
} from "@/lib/services";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const iconMap = {
  "air-conditioner": Snowflake,
  tv: Tv,
  water: Droplets,
  geyser: Droplets,
  fan: Fan,
  electrical: Zap,
  plumbing: Wrench,
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-blue-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <Icon className="h-8 w-8" />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
                Service {service.number}
              </p>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {service.title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                {service.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {service.options.map((option) => (
                  <span
                    key={option.name}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm text-blue-50"
                  >
                    {option.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#service-enquiry"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
                >
                  Request Service
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="tel:+917780177012"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-7 backdrop-blur-sm">
              <p className="text-sm font-semibold text-orange-300">
                Available Service Options
              </p>

              <div className="mt-5 space-y-4">
                {service.options.map((option) => (
                  <div
                    key={option.name}
                    className="rounded-xl border border-white/10 bg-black/10 p-4"
                  >
                    <h2 className="font-bold">
                      {option.name}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-blue-100">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-600">
                Why Choose This Service
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Service support based on your requirement
              </h2>

              <div className="mt-7 space-y-4">
                {service.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                    <span className="text-slate-700">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-7">
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-600">
                Service Options
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Choose what you need
              </h2>

              <div className="mt-6 space-y-3">
                {service.options.map((option) => (
                  <div
                    key={option.name}
                    className="rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <p className="font-semibold text-slate-900">
                      {option.name}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {option.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Simple service process
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-slate-900">
                  {faq.question}
                </summary>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section
        id="service-enquiry"
        className="bg-slate-50 py-16"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-orange-600">
              Get Started
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Request {service.title}
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Submit your basic details and choose
              the service you require. Optional
              information can be left blank.
            </p>
          </div>

          <ServiceEnquiryForm service={service} />
        </div>
      </section>
    </main>
  );
}