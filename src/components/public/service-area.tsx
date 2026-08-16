import { MapPin } from "lucide-react";

const locations = [
  "Guntur",
  "Vizag",
  "Bengaluru",
  "Hyderabad",
];

export default function ServiceAreas() {
  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-700 p-8 text-white sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-300">
                Service Areas
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Moving services across our key locations.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100">
                Prashanth Packers &amp; Movers provides moving and home
                services across Guntur, Vizag, Bengaluru and Hyderabad.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {locations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-sm"
                >
                  <MapPin
                    size={20}
                    className="shrink-0 text-orange-300"
                  />

                  <span className="font-semibold">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}