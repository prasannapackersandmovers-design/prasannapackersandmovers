import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

const phoneNumbers = ["7780177012", "9030814393", "9866687441"];

const locations = ["Guntur", "Vizag", "Bengaluru", "Hyderabad"];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="bg-[#082f6b]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
            Contact Us
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Contact Prasanna
            <span className="block text-orange-500">
              Packers & Movers
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Have a moving requirement or need one of our home services?
            Contact our team and tell us what you need.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#082f6b]">
              Call Us
            </h2>

            <div className="mt-4 space-y-2">
              {phoneNumbers.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="block font-semibold text-slate-700 transition hover:text-orange-600"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <MapPin className="h-6 w-6 text-orange-600" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#082f6b]">
              Address
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Rajagarithota,
              <br />
              beside Liberty Hall,
              <br />
              Guntur, Andhra Pradesh
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Clock3 className="h-6 w-6 text-orange-600" />
            </div>

            <h2 className="mt-6 text-xl font-bold text-[#082f6b]">
              Availability
            </h2>

            <p className="mt-4 text-lg font-bold text-slate-800">
              24 / 7 Services
            </p>

            <p className="mt-2 leading-7 text-slate-600">
              Contact us for your moving or home service requirement.
            </p>
          </div>
        </div>
      </section>

      {/* Main contact area */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Get In Touch
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#082f6b] sm:text-5xl">
              Tell us what you need.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Instead of waiting on the phone, you can submit your
              requirement online. Our enquiry system collects the details
              needed by the team to understand your request.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                <Phone className="mt-1 h-6 w-6 shrink-0 text-orange-600" />
                <div>
                  <h3 className="font-bold text-[#082f6b]">
                    Phone Support
                  </h3>
                  <p className="mt-1 text-slate-600">
                    Call any of our listed numbers for assistance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-slate-50 p-5">
                <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-orange-600" />
                <div>
                  <h3 className="font-bold text-[#082f6b]">
                    Online Enquiry
                  </h3>
                  <p className="mt-1 text-slate-600">
                    Submit your requirement through our service form.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/enquiry"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
              >
                Request Service
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Service locations */}
          <div className="rounded-3xl bg-[#082f6b] p-8 shadow-xl sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">
              Service Locations
            </p>

            <h2 className="mt-4 text-3xl font-black text-white">
              Where we serve
            </h2>

            <div className="mt-8 space-y-3">
              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-4 rounded-xl bg-white/10 p-4"
                >
                  <MapPin className="h-5 w-5 text-orange-400" />

                  <span className="font-semibold text-white">
                    {location}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-7">
              <p className="text-sm text-blue-200">
                Address
              </p>

              <p className="mt-2 leading-7 text-white">
                Rajagarithota, beside Liberty Hall,
                <br />
                Guntur, Andhra Pradesh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-100 py-14">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-black text-[#082f6b] sm:text-4xl">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Choose your service and submit your requirement.
          </p>

          <Link
            href="/enquiry"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Start an Enquiry
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}