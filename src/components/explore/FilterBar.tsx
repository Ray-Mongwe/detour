"use client";

import { categories, type CategoryKey } from "@/lib/site";
import type { PriceLevel, SearchFilters } from "@/types/places";

interface Props {
  radiusKm: number;
  onRadius: (km: number) => void;
  category: CategoryKey;
  onCategory: (c: CategoryKey) => void;
  filters: SearchFilters;
  onFilters: (f: SearchFilters) => void;
}

const ratingOptions = [
  { label: "Any", value: undefined },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
];

const priceOptions: PriceLevel[] = [1, 2, 3, 4];

function Chip({
  active,
  onClick,
  tone = "amber",
  children,
}: {
  active: boolean;
  onClick: () => void;
  tone?: "olive" | "amber";
  children: React.ReactNode;
}) {
  const styles =
    tone === "olive"
      ? active
        ? "border-brand-olive bg-brand-olive text-white"
        : "border-stone-200 text-stone-600 hover:border-brand-olive hover:text-brand-olive"
      : active
        ? "border-brand-amber bg-brand-amber text-white"
        : "border-brand-amber text-brand-amber hover:bg-brand-amber/10";

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`cursor-pointer whitespace-nowrap rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${styles}`}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-amber">
      {children}
    </p>
  );
}

export default function FilterBar({
  radiusKm,
  onRadius,
  category,
  onCategory,
  filters,
  onFilters,
}: Props) {
  const togglePrice = (p: PriceLevel) => {
    const current = filters.priceLevels ?? [];
    const next = current.includes(p)
      ? current.filter((x) => x !== p)
      : [...current, p];
    onFilters({ ...filters, priceLevels: next.length ? next : undefined });
  };

  const hasFilters =
    filters.minRating !== undefined ||
    !!filters.priceLevels?.length ||
    !!filters.openNow;

  return (
    <div className="space-y-8">
      <div>
        <label
          htmlFor="radius"
          className="mb-3 flex items-baseline justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-brand-amber"
        >
          <span>Radius</span>
          <span className="text-sm tracking-normal text-stone-900">{radiusKm} km</span>
        </label>
        <input
          id="radius"
          type="range"
          min={1}
          max={50}
          step={1}
          value={radiusKm}
          onChange={(e) => onRadius(Number(e.target.value))}
          className="w-full cursor-pointer accent-brand-olive"
        />
      </div>

      <div>
        <Label>Category</Label>
        <div className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <Chip
              key={c.key}
              tone="olive"
              active={category === c.key}
              onClick={() => onCategory(c.key)}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <Label>Price</Label>
          <div className="flex flex-wrap gap-3">
            {priceOptions.map((p) => (
              <Chip
                key={p}
                active={!!filters.priceLevels?.includes(p)}
                onClick={() => togglePrice(p)}
              >
                {"R".repeat(p)}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Label>Rating</Label>
          <div className="flex flex-wrap gap-3">
            {ratingOptions.map((o) => (
              <Chip
                key={o.label}
                active={filters.minRating === o.value}
                onClick={() => onFilters({ ...filters, minRating: o.value })}
              >
                {o.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <Label>Availability</Label>
          <div className="flex flex-wrap items-center gap-3">
            <Chip
              active={!!filters.openNow}
              onClick={() =>
                onFilters({ ...filters, openNow: filters.openNow ? undefined : true })
              }
            >
              Open now
            </Chip>
            {hasFilters && (
              <button
                type="button"
                onClick={() => onFilters({})}
                className="cursor-pointer text-[10px] font-bold uppercase tracking-widest text-stone-400 underline underline-offset-4 hover:text-stone-900"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}