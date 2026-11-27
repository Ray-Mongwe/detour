"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { categories, siteConfig } from "@/lib/site";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between border-b border-stone-100 bg-white px-4 md:px-12">
      <Link
        href="/"
        onClick={close}
        className="text-xl font-bold uppercase tracking-tighter text-brand-olive md:text-2xl"
      >
        {siteConfig.name}
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 md:flex lg:gap-12">
        <Link href="/explore" className="transition-colors hover:text-stone-400">
          Explore
        </Link>
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/explore?cat=${c.key}`}
            className="transition-colors hover:text-stone-400"
          >
            {c.short}
          </Link>
        ))}
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-brand-olive px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-900"
        >
          Sign in
        </button>
      </div>

      {/* Burger (mobile) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="z-50 flex w-8 cursor-pointer flex-col gap-1.5 md:hidden"
      >
        <span className={`h-0.5 w-6 bg-stone-900 transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-stone-900 transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-stone-900 transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <Link href="/explore" onClick={close} className="text-lg font-bold uppercase tracking-widest text-stone-900 hover:text-stone-400">
          Explore
        </Link>
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/explore?cat=${c.key}`}
            onClick={close}
            className="text-lg font-bold uppercase tracking-widest text-stone-900 hover:text-stone-400"
          >
            {c.label}
          </Link>
        ))}
        <button
          type="button"
          className="mt-4 cursor-pointer rounded-lg bg-brand-olive px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-white"
        >
          Sign in
        </button>
      </div>
    </nav>
  );
}