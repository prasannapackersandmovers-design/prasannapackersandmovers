import {
  ClipboardList,
  PackageCheck,
  PhoneCall,
  Truck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Tell Us What You Need",
    description:
      "Share your pickup, destination, moving date and service requirements through our enquiry form.",
  },
  {
    number: "02",
    icon: PhoneCall,
    title: "We Contact You",
    description:
      "Our team contacts you to understand your requirements and discuss the service in detail.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Confirm Your Service",
    description:
      "After discussing your requirements and final price, confirm the service with our team.",
  },
  {
    number: "04",
    icon: Truck,
    title: "We Handle the Move",
    description:
      "Our team coordinates the required moving or home service through completion.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-950 py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-400">
            How It Works
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Simple from enquiry to service.
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-400 sm:text-lg">
            Tell us what you need. Our team takes care of the next steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-white/4 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-[0.2em] text-orange-400">
                    {step.number}
                  </span>

                  <Icon
                    size={24}
                    className="text-blue-400"
                    strokeWidth={1.8}
                  />
                </div>

                <h3 className="mt-8 text-xl font-bold">{step.title}</h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}