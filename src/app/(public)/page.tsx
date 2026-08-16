import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Droplets,
  Fan,
  Headphones,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Tv,
  UserCheck,
  Wrench,
  Zap,
} from "lucide-react";

const HERO_IMAGE = "/images/hero/prasanna-moving-team.jpg";

const services = [
  {
    title: "AC Services",
    description:
      "Professional AC installation, servicing and maintenance.",
    image: "/images/services/ac-services.jpg",
    icon: Sparkles,
    iconClass: "bg-sky-500",
    href: "/services/ac-services",
  },
  {
    title: "TV Installation & Service",
    description:
      "TV installation, wall mounting and service support.",
    image: "/images/services/tv-installation.jpg",
    icon: Tv,
    iconClass: "bg-blue-600",
    href: "/services/tv-installation-service",
  },
  {
    title: "Water Purifier",
    description:
      "Water purifier installation, servicing and maintenance.",
    image: "/images/services/water-purifier.jpg",
    icon: Droplets,
    iconClass: "bg-blue-500",
    href: "/services/water-purifier",
  },
  {
    title: "Geyser Services",
    description:
      "Professional geyser installation, service and maintenance.",
    image: "/images/services/geyser-services.jpg",
    icon: Sparkles,
    iconClass: "bg-orange-500",
    href: "/services/geyser-services",
  },
  {
    title: "Fan Services",
    description:
      "Fan installation, repair and replacement support.",
    image: "/images/services/fan-services.jpg",
    icon: Fan,
    iconClass: "bg-[#123d78]",
    href: "/services/fan-services",
  },
  {
    title: "Electrical Work",
    description:
      "Reliable electrical repairs, installation and assistance.",
    image: "/images/services/electrical-work.jpg",
    icon: Zap,
    iconClass: "bg-orange-500",
    href: "/services/electrical-services",
  },
  {
    title: "Plumbing",
    description:
      "Professional plumbing repairs, installation and services.",
    image: "/images/services/plumbing.jpg",
    icon: Wrench,
    iconClass: "bg-orange-500",
    href: "/services/plumbing",
  },
];

const benefits = [
  {
    title: "Safe & Secure",
    description: "Your belongings are safe with us.",
    icon: ShieldCheck,
  },
  {
    title: "On-Time Delivery",
    description: "We value your time.",
    icon: Truck,
  },
  {
    title: "Expert Professionals",
    description: "Trained & experienced team.",
    icon: UserCheck,
  },
  {
    title: "Affordable Pricing",
    description: "Best service at best price.",
    icon: Sparkles,
  },
];

const whyChooseUs = [
  "Experienced & Verified Professionals",
  "Quality Service at Affordable Prices",
  "Customer Satisfaction Guaranteed",
  "Quick Response & Reliable Support",
];

const locations = [
  "Guntur",
  "Vijayawada",
  "Tenali",
  "Mangalagiri",
  "Bapatla",
  "Narasaraopet",
  "Piduguralla",
  "Repalle",
  "Vemuru",
];

const steps = [
  {
    number: "1",
    title: "Contact Us",
    description:
      "Reach out to us by call or fill the enquiry form.",
    icon: Phone,
    className: "bg-orange-100 text-orange-600",
  },
  {
    number: "2",
    title: "Share Requirements",
    description:
      "Tell us what service you need.",
    icon: ClipboardList,
    className: "bg-blue-100 text-blue-700",
  },
  {
    number: "3",
    title: "We Assign Expert",
    description:
      "Our expert will contact you and confirm.",
    icon: UserCheck,
    className: "bg-orange-100 text-orange-600",
  },
  {
    number: "4",
    title: "Service Completion",
    description:
      "We complete the service with satisfaction.",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-600",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid items-center gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 lg:py-10">

            {/* HERO CONTENT */}
            <div className="relative z-10">

              <div className="inline-flex items-center rounded-full border border-orange-300 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
                #1 Trusted Local Service
              </div>

              <h1 className="mt-5 text-5xl font-black leading-[0.98] tracking-tight text-[#0b2f67] sm:text-6xl lg:text-7xl">
                Move Smart.
                <br />
                <span className="text-[#ff5a00]">
                  Move Safe.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl">
                Professional relocation and home service
                assistance you can trust.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-7 flex flex-wrap gap-4">

                <a
                  href="tel:7780177012"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff5a00] px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#e94f00]"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0b3d82] bg-white px-7 py-3.5 font-bold text-[#0b3d82] transition hover:bg-[#0b3d82] hover:text-white"
                >
                  Our Services
                  <ArrowRight className="h-5 w-5" />
                </Link>

              </div>

              {/* HERO MINI FEATURES */}
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm font-semibold text-slate-700 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">

                <div className="flex items-center gap-2">
                  <Clock3 className="h-5 w-5 shrink-0 text-orange-500" />
                  <span>24/7 Support</span>
                </div>

                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 shrink-0 text-orange-500" />
                  <span>Professional Team</span>
                </div>

                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 shrink-0 text-orange-500" />
                  <span>Affordable Pricing</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
                  <span>4+ Cities</span>
                </div>

              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative min-h-97.5 overflow-hidden rounded-3xl lg:min-h-127.5">

              <Image
                src={HERO_IMAGE}
                alt="Prasanna Packers and Movers service"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* IMAGE GRADIENT */}
              <div className="absolute inset-0 bg-linear-to-r from-white/20 via-transparent to-transparent" />

              {/* 24/7 BADGE */}
              <div className="absolute right-5 top-5 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-white bg-[#0b2f67] text-center text-white shadow-2xl sm:h-32 sm:w-32">

                <span className="text-3xl font-black">
                  24/7
                </span>

                <span className="mt-1 text-xs font-bold uppercase tracking-wider">
                  Service
                </span>

                <span className="text-xs font-bold uppercase tracking-wider">
                  Support
                </span>

              </div>

            </div>
          </div>

          {/* =====================================================
              TRUST BENEFITS
          ====================================================== */}
          <div className="relative z-20 -mt-2 mb-8 rounded-2xl border border-slate-100 bg-white shadow-xl">

            <div className="grid md:grid-cols-2 lg:grid-cols-4">

              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className={`flex items-center gap-4 px-6 py-5 ${
                      index !== benefits.length - 1
                        ? "border-b border-slate-200 lg:border-b-0 lg:border-r"
                        : ""
                    }`}
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50">
                      <Icon className="h-6 w-6 text-orange-500" />
                    </div>

                    <div>
                      <p className="font-black text-[#0b2f67]">
                        {benefit.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {benefit.description}
                      </p>
                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SERVICES
      ========================================================= */}
      <section className="bg-white py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="text-center">

            <div className="flex items-center justify-center gap-3">
              <span className="h-0.5 w-8 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Our Services
              </span>

              <span className="h-0.5 w-8 bg-orange-500" />
            </div>

            <h2 className="mt-3 text-3xl font-black text-[#0b2f67] sm:text-4xl">
              All Services in One Place
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              From moving homes to fixing appliances — we&apos;ve got
              you covered.
            </p>

          </div>

          {/* SERVICE CARDS */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* IMAGE */}
                  <div className="relative h-36 overflow-hidden">

                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 14vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent" />

                  </div>

                  {/* CONTENT */}
                  <div className="relative px-4 pb-5 pt-8 text-center">

                    {/* ICON BADGE */}
                    <div
                      className={`absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white ${service.iconClass} text-white shadow-md`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="min-h-12 text-sm font-black leading-5 text-[#0b2f67]">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {service.description}
                    </p>

                  </div>
                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US + HOW IT WORKS
      ========================================================= */}
      <section className="bg-[#f7faff] py-12 sm:py-16">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.6fr]">

            {/* WHY CHOOSE US */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                Why Choose Us?
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#0b2f67]">
                We Make Every Move
                <br />
                Simple and Safe
              </h2>

              <div className="mt-7 space-y-4">

                {whyChooseUs.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />

                    <span className="text-sm font-semibold text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
                How It Works
              </p>

              <div className="mt-6 grid gap-5 md:grid-cols-4">

                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative"
                    >

                      <div className="flex items-start gap-3">

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.className}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <div className="text-xs font-black text-orange-500">
                            {step.number}
                          </div>

                          <h3 className="mt-1 text-sm font-black text-[#0b2f67]">
                            {step.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {step.description}
                          </p>
                        </div>

                      </div>

                      {index < steps.length - 1 && (
                        <ChevronRight className="absolute -right-3 top-4 hidden h-5 w-5 text-slate-300 md:block" />
                      )}

                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICE AREAS
      ========================================================= */}
      <section className="bg-white py-8">

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Our Service Areas
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">

              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-2 text-sm font-bold text-[#0b2f67]"
                >
                  <MapPin className="h-4 w-4 text-orange-500" />
                  {location}
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="px-5 py-8 sm:px-6 sm:py-12 lg:px-8">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#062b61]">

          <div className="grid items-center gap-8 px-7 py-9 sm:px-10 lg:grid-cols-[1fr_auto] lg:px-14">

            <div className="flex items-center gap-5">

              <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-orange-500 sm:flex">
                <Headphones className="h-9 w-9 text-orange-500" />
              </div>

              <div>

                <p className="text-sm font-bold text-orange-400">
                  Need Help?
                </p>

                <h2 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                  Request a service today.
                </h2>

                <p className="mt-2 text-sm text-blue-100">
                  Tell us what you need and our team will contact you.
                </p>

              </div>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-7 py-3.5 font-bold text-white transition hover:bg-orange-600"
              >
                <Phone className="h-5 w-5" />
                Request Service
              </Link>

              <a
                href="tel:7780177012"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-[#062b61]"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}