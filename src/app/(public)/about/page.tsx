import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

const services = [
  "AC Services",
  "TV Installation & Service",
  "Water Purifier",
  "Geyser Services",
  "Fan Services",
  "Electrical Work",
  "Plumbing",
];

const locations = ["Guntur", "Vizag", "Bengaluru", "Hyderabad"];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#082f6b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,102,0,0.22),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-500/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">
              About Prasanna
            </span>

            <h1 className="mt-7 text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Prasanna
              <span className="block text-orange-500">
                Packers &amp; Movers
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
              Move Smart. Move Safe. Move with Us.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100/90 sm:text-lg">
              Prasanna Packers &amp; Movers provides reliable moving,
              transportation and household service support for customers
              across Guntur, Vizag, Bengaluru and Hyderabad.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-[#082f6b] sm:text-5xl">
              Moving and home services under one roof.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Prasanna Packers &amp; Movers is focused on making household,
              office and service requirements easier for customers.
              Whether you are moving your belongings or need professional
              assistance at home, our team is available to help.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our services are designed around convenience, clear
              communication and careful handling of customer requirements.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Customer-focused service",
                "Professional assistance",
                "Multiple service locations",
                "24/7 service availability",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />

                  <span className="font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#082f6b] p-8 shadow-xl sm:p-10">
            <div className="grid gap-7">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500 p-3">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Reliable Service
                  </h3>

                  <p className="mt-2 leading-7 text-blue-100">
                    We focus on dependable service and careful handling of
                    customer requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500 p-3">
                  <Clock3 className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Available 24/7
                  </h3>

                  <p className="mt-2 leading-7 text-blue-100">
                    Customers can contact us whenever they need assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500 p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    Customer First
                  </h3>

                  <p className="mt-2 leading-7 text-blue-100">
                    Our goal is to make every service request simple and
                    convenient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
              Our Services
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#082f6b] sm:text-5xl">
              Services we provide
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={service}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-orange-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <CheckCircle2 className="h-5 w-5 text-orange-500" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-[#082f6b]">
                  {service}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Professional assistance for residential and general
                  service requirements.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Explore All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="bg-slate-100 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">
                Service Areas
              </p>

              <h2 className="mt-3 text-4xl font-black text-[#082f6b]">
                We serve multiple cities.
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Contact Prasanna Packers &amp; Movers to discuss your
                requirement and service location.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <div className="rounded-xl bg-orange-100 p-3">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>

                  <div>
                    <p className="text-lg font-bold text-[#082f6b]">
                      {location}
                    </p>

                    <p className="text-sm text-slate-500">
                      Service available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#082f6b] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-white sm:text-4xl">
              Need our service?
            </h2>

            <p className="mt-3 text-blue-100">
              Send your requirement and our team can get back to you.
            </p>
          </div>

          <Link
            href="/enquiry"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-orange-600"
          >
            Request Service
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}