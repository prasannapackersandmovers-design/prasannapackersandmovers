import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

const whatsappNumber = "917780177012";

export default function ContactCTA() {
  const whatsappMessage = encodeURIComponent(
    "Hello Prashanth Packers & Movers, I would like to know more about your services.",
  );

  return (
    <section className="bg-orange-500 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-100">
              Need Help?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to plan your move?
            </h2>

            <p className="mt-4 text-base leading-7 text-orange-50">
              Tell us what you need. Our team will contact you to understand
              your requirements and discuss the service.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-orange-600 transition hover:bg-orange-50"
            >
              <Phone size={18} />
              Request a Call
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}