import {
  CheckCircle2,
  Clock3,
  Headphones,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Careful Handling",
    description:
      "Your household belongings are handled with care throughout the moving process.",
  },
  {
    icon: Clock3,
    title: "24/7 Services",
    description:
      "Our services are available around the clock for your moving and home-service needs.",
  },
  {
    icon: Headphones,
    title: "Clear Communication",
    description:
      "We understand your requirements first and keep you informed throughout the process.",
  },
  {
    icon: CheckCircle2,
    title: "One Trusted Team",
    description:
      "From moving services to appliance, electrical and plumbing support, get multiple services from one team.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Why Choose Us
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              Moving support you can rely on.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Prashanth Packers &amp; Movers focuses on careful handling,
              reliable coordination and clear communication from the first
              enquiry to the completion of your service.
            </p>

            <a
              href="/enquiry"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-blue-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              Request a Call
            </a>
          </div>

          {/* Right */}
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-950">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}