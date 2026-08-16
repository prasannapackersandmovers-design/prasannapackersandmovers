"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
} from "lucide-react";

const services = [
  "Home Relocation",
  "Office Relocation",
  "Vehicle Transportation",
  "Packing & Unpacking",
  "Loading & Unloading",
  "AC Services",
  "TV Installation & Service",
  "Water Purifier",
  "Geyser Services",
  "Fan Services",
  "Electrical Work",
  "Plumbing",
];

const phoneNumber = "7780177012";

export default function EnquiryPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      pickupLocation: String(
        formData.get("pickupLocation") || "",
      ),
      dropLocation: String(formData.get("dropLocation") || ""),
      movingDate: String(formData.get("movingDate") || ""),
      service: String(formData.get("service") || ""),
      additionalRequirements: String(
        formData.get("additionalRequirements") || "",
      ),
    };

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your enquiry.",
        );
      }

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your enquiry.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-green-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 size={34} />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-950">
              Enquiry Submitted
            </h1>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-gray-600">
              Thank you for contacting Prashanth Packers &amp; Movers.
              Our team will contact you soon to understand your
              requirements.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white hover:bg-blue-800"
              >
                Back to Home
              </Link>

              <a
                href={`tel:+91${phoneNumber}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                <Phone size={17} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          {/* Information */}
          <div>
            <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              Request a Call
            </span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
              Tell us what you need.
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Share your requirements and our team will contact you to
              understand the service and discuss the next steps.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Phone size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-950">
                    24/7 Service
                  </p>

                  <a
                    href={`tel:+91${phoneNumber}`}
                    className="text-sm text-gray-600 hover:text-blue-700"
                  >
                    +91 {phoneNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="font-semibold text-gray-950">
                    Service Areas
                  </p>

                  <p className="text-sm leading-6 text-gray-600">
                    Guntur · Vizag · Bengaluru · Hyderabad
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="pickupLocation"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Pickup Location *
                  </label>

                  <input
                    id="pickupLocation"
                    name="pickupLocation"
                    type="text"
                    required
                    placeholder="Guntur"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dropLocation"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Drop Location *
                  </label>

                  <input
                    id="dropLocation"
                    name="dropLocation"
                    type="text"
                    required
                    placeholder="Hyderabad"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="movingDate"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Moving / Service Date
                  </label>

                  <input
                    id="movingDate"
                    name="movingDate"
                    type="date"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Service *
                  </label>

                  <select
                    id="service"
                    name="service"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select a service
                    </option>

                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="additionalRequirements"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Additional Requirements
                </label>

                <textarea
                  id="additionalRequirements"
                  name="additionalRequirements"
                  rows={4}
                  placeholder="Tell us anything else we should know..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enquiry"
                )}
              </button>

              <p className="text-center text-xs leading-5 text-gray-500">
                Our team will contact you to understand your requirements.
                Pricing is discussed manually based on your requirements.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}