"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceSearch from "./PlaceSearch";
import FilterBar from "./FilterBar";
import ResultList from "./ResultList";
import { applyFilters } from "@/lib/filters";
import { getMockResults } from "@/lib/mock-data";
import { categories, type CategoryKey } from "@/lib/site";
import type { PlaceSuggestion, SearchFilters } from "@/types/places";

function parseCat(value: string | null): CategoryKey {
  return categories.find((c) => c.key === value)?.key ?? "do";
}

export default function ExploreClient() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = parseCat(params.get("cat"));

  const [place, setPlace] = useState<PlaceSuggestion | null>(null);
  const [radiusKm, setRadiusKm] = useState(10);
  const [filters, setFilters] = useState<SearchFilters>({});

  const results = useMemo(() => {
    if (!place) return [];
    return applyFilters(getMockResults(cat, place, radiusKm), filters).sort(
      (a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0),
    );
  }, [place, cat, radiusKm, filters]);

  const setCategory = (key: CategoryKey) =>
    router.replace(`/explore?cat=${key}`, { scroll: false });

  const catLabel = categories.find((c) => c.key === cat)?.label;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24">
      <div className="space-y-8 rounded-[32px] border border-stone-100 bg-white p-8 shadow-sm md:p-10">
        <PlaceSearch value={place} onSelect={setPlace} />
        <FilterBar
          radiusKm={radiusKm}
          onRadius={setRadiusKm}
          category={cat}
          onCategory={setCategory}
          filters={filters}
          onFilters={setFilters}
        />
      </div>

      <div className="mt-12">
        {!place ? (
          <div className="rounded-[32px] border border-dashed border-stone-200 p-16 text-center">
            <p className="font-serif text-lg italic text-stone-400">
              Pick a place above to see sample results.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-amber">
                {results.length} {catLabel} within {radiusKm} km of {place.label}
              </h2>
              <span className="rounded-full bg-brand-sage/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-olive">
                Sample data
              </span>
            </div>

            {results.length === 0 ? (
              <p className="rounded-[32px] border border-stone-100 bg-white p-12 text-center text-stone-500">
                Nothing matches these filters. Try a wider radius or clear the filters.
              </p>
            ) : (
              <ResultList results={results} category={cat} />
            )}
          </>
        )}
      </div>
    </div>
  );
}