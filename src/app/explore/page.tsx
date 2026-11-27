import { Suspense } from "react";
import type { Metadata } from "next";
import ExploreClient from "@/components/explore/ExploreClient";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return (
    <>
      <section className="px-6 py-16 text-center">
        <span className="mb-4 inline-block rounded-full bg-brand-sage/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive">
          Explore
        </span>
        <h1 className="mb-4 text-6xl font-bold uppercase leading-none tracking-tighter text-stone-900 md:text-8xl">
          Find your next stop
        </h1>
        <p className="mx-auto max-w-2xl font-serif text-xl italic text-stone-500">
          Pick a place and a radius, then narrow it down.
        </p>
      </section>

      <Suspense fallback={null}>
        <ExploreClient />
      </Suspense>
    </>
  );
}