"use client";

import Link from "next/link";
import {
  ArrowUp,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  UserCog,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#031b3d] text-white">
      {/* ORANGE ACCENT */}
      <div className="h-1 w-full bg-linear-to-r from-[#ff5a00] via-[#ff6b00] to-[#ff5a00]" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_0.8fr_0.9fr]">

          {/* =====================================================
              COMPANY
          ====================================================== */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-white px-4 py-3 transition hover:scale-[1.02]"
              aria-label="Prasanna Packers & Movers Home"
            >
              <div className="flex items-center gap-3">

                {/* LOGO ICON */}
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0b3d82]">
                  <div className="relative">
                    <div className="flex h-9 w-11 items-center justify-center rounded-md border-[3px] border-white">
                      <div className="h-4 w-4 rounded-full border-2 border-white" />
                    </div>

                    <div className="absolute -bottom-2 left-1 h-3 w-3 rounded-full border-2 border-white bg-[#0b3d82]" />

                    <div className="absolute -bottom-2 right-1 h-3 w-3 rounded-full border-2 border-white bg-[#0b3d82]" />
                  </div>
                </div>

                {/* COMPANY NAME */}
                <div className="leading-none">
                  <div className="text-2xl font-black tracking-wide text-[#0b3d82]">
                    PRASANNA
                  </div>

                  <div className="mt-1 text-sm font-extrabold tracking-[0.12em] text-[#ff5a00]">
                    PACKERS & MOVERS
                  </div>

                  <div className="mt-2 text-[9px] font-semibold tracking-[0.22em] text-slate-500">
                    MOVE SMART • MOVE SAFE
                  </div>
                </div>
              </div>
            </Link>

            <p className="mt-8 max-w-xl text-base leading-8 text-slate-300">
              Prasanna Packers & Movers provides professional shifting,
              transportation and home service assistance with a focus on safe
              handling and reliable support.
            </p>

            {/* ADDRESS */}
            <div className="mt-7 flex items-start gap-4">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/10">
                <MapPin className="h-5 w-5 text-[#ff6b00]" />
              </div>

              <p className="text-sm leading-6 text-slate-300">
                Rajagarithota, beside Liberty Hall,
                <br />
                Guntur, Andhra Pradesh
              </p>
            </div>

            {/* EMAIL */}
            <a
              href="mailto:info@prasannapackersandmovers.com"
              className="mt-5 flex items-center gap-4 text-sm text-slate-300 transition hover:text-[#ff6b00]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5a00]/10">
                <Mail className="h-5 w-5 text-[#ff6b00]" />
              </span>

              <span>
                info@prasannapackersandmovers.com
              </span>
            </a>
          </div>

          {/* =====================================================
              QUICK LINKS
          ====================================================== */}
          <div>
            <h3 className="mb-7 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">

              {/* HOME */}
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-2 text-slate-300 transition hover:text-[#ff6b00]"
                >
                  <ChevronRight className="h-4 w-4 text-[#ff6b00] transition group-hover:translate-x-1" />
                  <span>Home</span>
                </Link>
              </li>

              {/* ABOUT */}
              <li>
                <Link
                  href="/about"
                  className="group flex items-center gap-2 text-slate-300 transition hover:text-[#ff6b00]"
                >
                  <ChevronRight className="h-4 w-4 text-[#ff6b00] transition group-hover:translate-x-1" />
                  <span>About</span>
                </Link>
              </li>

              {/* SERVICES */}
              <li>
                <Link
                  href="/services"
                  className="group flex items-center gap-2 text-slate-300 transition hover:text-[#ff6b00]"
                >
                  <ChevronRight className="h-4 w-4 text-[#ff6b00] transition group-hover:translate-x-1" />
                  <span>Services</span>
                </Link>
              </li>

              {/* CONTACT */}
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-slate-300 transition hover:text-[#ff6b00]"
                >
                  <ChevronRight className="h-4 w-4 text-[#ff6b00] transition group-hover:translate-x-1" />
                  <span>Contact</span>
                </Link>
              </li>

              {/* REQUEST SERVICE */}
              <li>
                <Link
                  href="/enquiry"
                  className="group flex items-center gap-2 text-slate-300 transition hover:text-[#ff6b00]"
                >
                  <ChevronRight className="h-4 w-4 text-[#ff6b00] transition group-hover:translate-x-1" />
                  <span>Request Service</span>
                </Link>
              </li>

              {/* =================================================
                  ADMIN ACCESS
              ================================================== */}
              <li className="pt-4">

                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-[#ff6b00]">
                  Admin Access
                </div>

                <Link
                  href="/admin/login"
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#ff6b00] px-5 py-3 text-sm font-bold text-[#ff8a3d] transition-all duration-200 hover:bg-[#ff6b00] hover:text-white hover:shadow-lg"
                >
                  <UserCog className="h-4 w-4" />

                  <span>
                    Admin Login
                  </span>

                  <ChevronRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <p className="mt-2 text-xs text-slate-500">
                  Secure access for administrators only.
                </p>
              </li>
            </ul>
          </div>

          {/* =====================================================
              CONTACT
          ====================================================== */}
          <div>
            <h3 className="mb-7 text-lg font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              {/* PHONE 1 */}
              <a
                href="tel:7780177012"
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/10">
                  <Phone className="h-5 w-5 text-[#ff6b00]" />
                </span>

                <span className="group-hover:text-[#ff6b00]">
                  7780177012
                </span>
              </a>

              {/* PHONE 2 */}
              <a
                href="tel:9030814393"
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/10">
                  <Phone className="h-5 w-5 text-[#ff6b00]" />
                </span>

                <span className="group-hover:text-[#ff6b00]">
                  9030814393
                </span>
              </a>

              {/* PHONE 3 */}
              <a
                href="tel:9866687441"
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/10">
                  <Phone className="h-5 w-5 text-[#ff6b00]" />
                </span>

                <span className="group-hover:text-[#ff6b00]">
                  9866687441
                </span>
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/917780177012"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-slate-300 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ff5a00]/10">
                  <MessageCircle className="h-5 w-5 text-[#ff6b00]" />
                </span>

                <span className="group-hover:text-[#ff6b00]">
                  WhatsApp
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ====================================================== */}
        <div className="my-12 h-px bg-white/10" />

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} PRASANNA PACKERS & MOVERS.
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">

            <Link
              href="/privacy"
              className="text-sm text-slate-400 transition hover:text-[#ff6b00]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-slate-400 transition hover:text-[#ff6b00]"
            >
              Terms
            </Link>

          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL TO TOP
      ====================================================== */}
      <button
        type="button"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff5a00] text-white shadow-lg transition hover:scale-110 hover:bg-[#e94f00]"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}