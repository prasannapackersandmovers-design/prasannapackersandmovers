import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items?: string[];
  accent?: "blue" | "orange";
}

export default function ServiceCard({
  number,
  title,
  description,
  icon: Icon,
  items = [],
  accent = "blue",
}: ServiceCardProps) {
  const isOrange = accent === "orange";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* Number */}
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-bold tracking-widest text-gray-400">
          {number}
        </span>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
            isOrange
              ? "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white"
              : "bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white"
          }`}
        >
          <Icon size={24} strokeWidth={1.8} />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-gray-950">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-gray-600">
        {description}
      </p>

      {/* Service items */}
      {items.length > 0 && (
        <ul className="mt-5 space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOrange ? "bg-orange-500" : "bg-blue-700"
                }`}
              />
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Bottom link */}
      <div className="mt-auto pt-6">
        <div
          className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3 ${
            isOrange ? "text-orange-600" : "text-blue-700"
          }`}
        >
          Learn More
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full ${
          isOrange ? "bg-orange-500" : "bg-blue-700"
        }`}
      />
    </article>
  );
}