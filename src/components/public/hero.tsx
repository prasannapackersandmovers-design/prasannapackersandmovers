import Link from "next/link";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-linear-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Safe. Reliable.<br />
              Professional Moving Services.
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-lg">
              Prashanth Packers & Movers helps you move homes, offices and vehicles safely and efficiently. 
              Also experts in AC, TV, Geyser, Electrical & Plumbing services.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg transition"
              >
                <Phone size={18} />
                Request a Call
              </Link>
              <a
                href="tel:7780177012"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-lg transition"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-6xl mb-4">🚚</div>
                <p className="text-xl font-semibold">24/7 Services</p>
                <p className="text-blue-100 mt-2">Guntur • Vizag • Bengaluru • Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}