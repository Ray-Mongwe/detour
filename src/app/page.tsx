import Link from "next/link";
import { categories, siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="px-6 py-24 text-center">
        <span className="mb-4 inline-block rounded-full bg-brand-sage/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive">
          South Africa
        </span>
        <h1 className="mb-4 text-6xl font-bold uppercase leading-none tracking-tighter text-stone-900 md:text-8xl">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mb-10 max-w-2xl font-serif text-xl italic text-stone-500">
          {siteConfig.tagline}
        </p>
        <Link
          href="/explore"
          className="inline-block rounded-2xl bg-brand-olive px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-olive/10 transition-all hover:bg-stone-900"
        >
          Start exploring
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.key}
            href={`/explore?cat=${c.key}`}
            className="group rounded-[32px] border border-stone-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <span className="mb-6 inline-block rounded-full bg-brand-terracotta/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-terracotta">
              {c.short}
            </span>
            <h3 className="mb-2 text-2xl font-bold uppercase tracking-tight text-stone-900 transition-colors group-hover:text-brand-olive">
              {c.label}
            </h3>
            <p className="text-sm text-stone-500">{c.blurb}</p>
          </Link>
        ))}
      </section>
    </>
  );
}