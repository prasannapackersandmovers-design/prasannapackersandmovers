"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
            aria-label="Prasanna Packers & Movers Home"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0b3d82] shadow-md">
              <div className="relative">
                <div className="flex h-8 w-10 items-center justify-center rounded-md border-[3px] border-white">
                  <div className="h-3 w-3 rounded-full border-2 border-white" />
                </div>

                <div className="absolute -bottom-2 left-1 h-3 w-3 rounded-full border-2 border-white bg-[#0b3d82]" />

                <div className="absolute -bottom-2 right-1 h-3 w-3 rounded-full border-2 border-white bg-[#0b3d82]" />
              </div>
            </div>

            <div className="hidden leading-none sm:block">
              <div className="text-2xl font-black tracking-wide text-[#0b3d82]">
                PRASANNA
              </div>

              <div className="mt-1 text-sm font-extrabold tracking-[0.12em] text-[#ff5a00]">
                PACKERS & MOVERS
              </div>

              <div className="mt-1 text-[8px] font-semibold tracking-[0.2em] text-slate-500">
                MOVE SMART • MOVE SAFE
              </div>
            </div>

            <div className="sm:hidden">
              <div className="text-xl font-black tracking-wide text-[#0b3d82]">
                PRASANNA
              </div>

              <div className="text-[10px] font-extrabold tracking-widest text-[#ff5a00]">
                PACKERS & MOVERS
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="font-semibold text-slate-700 transition hover:text-[#ff5a00]"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="font-semibold text-slate-700 transition hover:text-[#ff5a00]"
            >
              About
            </Link>

            <Link
              href="/services"
              className="font-semibold text-slate-700 transition hover:text-[#ff5a00]"
            >
              Services
            </Link>

            <Link
              href="/contact"
              className="font-semibold text-slate-700 transition hover:text-[#ff5a00]"
            >
              Contact
            </Link>

            <Link
              href="/enquiry"
              className="rounded-xl bg-[#ff5a00] px-6 py-3 font-bold text-white shadow-md transition hover:bg-[#e94f00] hover:shadow-lg"
            >
              Request a Call
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            {isOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff5a00]"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff5a00]"
              >
                About
              </Link>

              <Link
                href="/services"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff5a00]"
              >
                Services
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#ff5a00]"
              >
                Contact
              </Link>

              <Link
                href="/enquiry"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-[#ff5a00] px-4 py-3 text-center font-bold text-white transition hover:bg-[#e94f00]"
              >
                Request a Call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}