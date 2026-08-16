import {
  Bath,
  Building2,
  CarFront,
  Fan,
  Home,
  Package,
  PlugZap,
  Settings,
  Tv,
  Truck,
  Unplug,
  Wrench,
} from "lucide-react";

import ServiceCard from "./service-card";

const movingServices = [
  {
    number: "01",
    title: "Home Relocation",
    description:
      "Carefully coordinated household shifting for apartments, houses and complete home moves.",
    icon: Home,
    items: ["1 BHK", "2 BHK", "3 BHK", "Independent Houses"],
  },
  {
    number: "02",
    title: "Office Relocation",
    description:
      "Organized office shifting with careful handling of furniture, equipment and workplace essentials.",
    icon: Building2,
    items: [
      "Small Offices",
      "Corporate Offices",
      "Furniture Movement",
      "Equipment Movement",
    ],
  },
  {
    number: "03",
    title: "Vehicle Transportation",
    description:
      "Professional transportation support for cars, bikes and other approved vehicles.",
    icon: CarFront,
    items: ["Cars", "Bikes", "Vehicle Handling"],
  },
  {
    number: "04",
    title: "Packing & Unpacking",
    description:
      "Careful packing and unpacking assistance with attention to household and fragile belongings.",
    icon: Package,
    items: [
      "Packing Materials",
      "Furniture Protection",
      "Fragile Items",
      "Unpacking",
    ],
  },
  {
    number: "05",
    title: "Loading & Unloading",
    description:
      "Reliable loading and unloading assistance for a smooth and organized moving experience.",
    icon: Truck,
    items: ["Loading", "Unloading", "Labour Support", "Placement Assistance"],
  },
];

const homeServices = [
  {
    number: "01",
    title: "AC Services",
    description:
      "Professional assistance for AC installation, servicing and related requirements.",
    icon: Settings,
    items: ["Installation", "Service", "Maintenance"],
  },
  {
    number: "02",
    title: "TV Installation & Service",
    description:
      "Convenient TV installation and service support for your home or office.",
    icon: Tv,
    items: ["Installation", "Wall Mounting", "Service"],
  },
  {
    number: "03",
    title: "Water Purifier",
    description:
      "Water purifier installation and service support for residential requirements.",
    icon: Wrench,
    items: ["Installation", "Service", "Maintenance"],
  },
  {
    number: "04",
    title: "Geyser Services",
    description:
      "Installation and service assistance for household geysers.",
    icon: Bath,
    items: ["Installation", "Service", "Maintenance"],
  },
  {
    number: "05",
    title: "Fan Services",
    description:
      "Professional fan installation and electrical support for homes and offices.",
    icon: Fan,
    items: ["Installation", "Repair", "Replacement"],
  },
  {
    number: "06",
    title: "Electrical Work",
    description:
      "General electrical assistance for household and office requirements.",
    icon: PlugZap,
    items: ["Electrical Repairs", "Installation", "General Work"],
  },
  {
    number: "07",
    title: "Plumbing",
    description:
      "Reliable plumbing assistance for common household and office requirements.",
    icon: Unplug,
    items: ["Repairs", "Installation", "General Plumbing"],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-gray-50 py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
            What We Do
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Complete Moving &amp; Home Services
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
            From shifting your home or office to essential appliance,
            electrical and plumbing services, Arun Packers &amp; Movers helps
            you take care of the work with one trusted team.
          </p>
        </div>

        {/* Packers & Movers */}
        <div className="mt-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                Packers &amp; Movers
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Move with confidence
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-gray-500">
              Professional support for household shifting, office relocation,
              vehicle transportation and moving-related services.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {movingServices.map((service) => (
              <ServiceCard
                key={service.title}
                number={service.number}
                title={service.title}
                description={service.description}
                icon={service.icon}
                items={service.items}
                accent="blue"
              />
            ))}
          </div>
        </div>

        {/* Home & Technical Services */}
        <div className="mt-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">
                Home &amp; Technical Services
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Help beyond moving
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-6 text-gray-500">
              Appliance, electrical and plumbing services for everyday home
              and office requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homeServices.map((service) => (
              <ServiceCard
                key={service.title}
                number={service.number}
                title={service.title}
                description={service.description}
                icon={service.icon}
                items={service.items}
                accent="orange"
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-bold text-gray-950">
                Not sure which service you need?
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Tell us what you need and our team will contact you to
                understand your requirements.
              </p>
            </div>

            <a
              href="/enquiry"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
            >
              Request a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}