import Link from "next/link";
import { categories, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="w-full bg-stone-900 pb-12 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="mb-6 text-3xl font-bold uppercase tracking-[0.3em]">
              {siteConfig.name}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-amber">
              Explore
            </h4>
            <ul className="space-y-4">
              {categories.map((c) => (
                <li key={c.key}>
                  <Link
                    href={`/explore?cat=${c.key}`}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-amber">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy" className="text-sm text-stone-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
            {siteConfig.contactEmail && (
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-8 inline-block text-sm font-bold underline decoration-brand-amber underline-offset-8 transition-colors hover:text-brand-amber"
              >
                {siteConfig.contactEmail}
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-stone-800 pt-12">
          <p className="text-[10px] uppercase tracking-widest text-stone-500">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}