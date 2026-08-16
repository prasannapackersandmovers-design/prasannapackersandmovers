"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

import type {
  Service,
} from "@/lib/services";

type Props = {
  service: Service;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  serviceOption: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  equipmentType: string;
  brand: string;
  model: string;
  quantity: string;
  problem: string;
  description: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  email: "",
  serviceOption: "",
  location: "",
  preferredDate: "",
  preferredTime: "",
  equipmentType: "",
  brand: "",
  model: "",
  quantity: "",
  problem: "",
  description: "",
};

export default function ServiceEnquiryForm({
  service,
}: Props) {
  const [form, setForm] =
    useState<FormState>({
      ...initialForm,
    });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  function update(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "/api/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            service: service.title,
            serviceSlug: service.slug,
          }),
        },
      );

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit your enquiry.",
        );
      }

      setSuccess(true);
      setForm({
        ...initialForm,
      });

      window.scrollTo({
        top: document
          .getElementById("service-enquiry")
          ?.getBoundingClientRect().top
          ? window.scrollY +
            document
              .getElementById(
                "service-enquiry",
              )!
              .getBoundingClientRect().top -
            120
          : 0,
        behavior: "smooth",
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit your enquiry.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />

        <h3 className="mt-4 text-2xl font-bold text-green-900">
          Enquiry Submitted Successfully
        </h3>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-green-800">
          Thank you for contacting Prasanna
          Packers & Movers. Your {service.title}{" "}
          request has been received. Our team
          will contact you using the phone
          number provided.
        </p>

        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8"
    >
      <div className="mb-7">
        <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
          Request Service
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          Book {service.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fill in the required details. Fields
          such as location, problem and
          description are optional.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* REQUIRED */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Name *
          </label>

          <input
            required
            value={form.name}
            onChange={(event) =>
              update("name", event.target.value)
            }
            placeholder="Your full name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number *
          </label>

          <input
            required
            type="tel"
            value={form.phone}
            onChange={(event) =>
              update(
                "phone",
                event.target.value,
              )
            }
            placeholder="Your phone number"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* OPTIONAL */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email{" "}
            <span className="font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              update(
                "email",
                event.target.value,
              )
            }
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Service Type *
          </label>

          <select
            required
            value={form.serviceOption}
            onChange={(event) =>
              update(
                "serviceOption",
                event.target.value,
              )
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              Select service type
            </option>

            {service.options.map(
              (option) => (
                <option
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </option>
              ),
            )}
          </select>
        </div>

        {service.formFields.includes(
          "equipmentType",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Equipment Type{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              value={form.equipmentType}
              onChange={(event) =>
                update(
                  "equipmentType",
                  event.target.value,
                )
              }
              placeholder="Example: Split AC"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "brand",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Brand{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              value={form.brand}
              onChange={(event) =>
                update(
                  "brand",
                  event.target.value,
                )
              }
              placeholder="Brand name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "model",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Model{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              value={form.model}
              onChange={(event) =>
                update(
                  "model",
                  event.target.value,
                )
              }
              placeholder="Model number"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "quantity",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quantity{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              type="number"
              min="1"
              value={form.quantity}
              onChange={(event) =>
                update(
                  "quantity",
                  event.target.value,
                )
              }
              placeholder="Number of items"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "location",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              value={form.location}
              onChange={(event) =>
                update(
                  "location",
                  event.target.value,
                )
              }
              placeholder="Area / City"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "preferredDate",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred Date{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              type="date"
              value={form.preferredDate}
              onChange={(event) =>
                update(
                  "preferredDate",
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "preferredTime",
        ) && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Preferred Time{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              type="time"
              value={form.preferredTime}
              onChange={(event) =>
                update(
                  "preferredTime",
                  event.target.value,
                )
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "problem",
        ) && (
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Problem{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <input
              value={form.problem}
              onChange={(event) =>
                update(
                  "problem",
                  event.target.value,
                )
              }
              placeholder="Briefly describe the problem, if known"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}

        {service.formFields.includes(
          "description",
        ) && (
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description{" "}
              <span className="font-normal text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(event) =>
                update(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Any additional information"
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Request Service
          </>
        )}
      </button>

      <p className="mt-3 text-center text-xs text-slate-400">
        Fields marked Optional do not need to be
        filled to submit your request.
      </p>
    </form>
  );
}