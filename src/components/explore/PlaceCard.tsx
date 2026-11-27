import { categories } from "@/lib/site";
import { categoryIcon, mapsLink, priceLabel } from "@/lib/places-ui";
import type { PlaceResult } from "@/types/places";

function Stars({ rating, count }: { rating: number; count?: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-2 text-brand-amber">
      <span className="text-[10px] tracking-widest" aria-hidden>
        {"★".repeat(full)}
        {"☆".repeat(5 - full)}
      </span>
      <span className="sr-only">Rated {rating} out of 5</span>
      <span className="text-xs font-bold text-stone-600">
        {rating.toFixed(1)}
        {count !== undefined && (
          <span className="ml-1 font-normal text-stone-400">({count})</span>
        )}
      </span>
    </div>
  );
}

function OpenBadge({ open }: { open?: boolean }) {
  if (open === undefined) return null;
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
        open ? "bg-brand-sage/40 text-brand-olive" : "bg-stone-100 text-stone-500"
      }`}
    >
      {open ? "Open now" : "Closed"}
    </span>
  );
}

function MapsButton({ place, className }: { place: PlaceResult; className?: string }) {
  return (
    <a
      href={mapsLink(place)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 bg-brand-olive px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-900 ${className ?? ""}`}
    >
      View on Maps <span aria-hidden>→</span>
    </a>
  );
}

function distanceText(place: PlaceResult) {
  return place.distanceKm !== undefined ? `${place.distanceKm} km away` : null;
}

export function PhotoCard({ place }: { place: PlaceResult }) {
  const price = priceLabel(place.priceLevel);
  const badge = categories.find((c) => c.key === place.category)?.short;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[40px] border border-stone-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      {/* Placeholder until photos are fetched lazily in step 7 */}
      <div className="relative flex aspect-16/11 items-center justify-center bg-linear-to-br from-brand-sage/40 to-brand-cream text-5xl">
        <span aria-hidden>{categoryIcon[place.category]}</span>
        <div className="absolute left-5 top-5">
          <OpenBadge open={place.openNow} />
        </div>
      </div>

      <div className="flex grow flex-col items-start p-8">
        <span className="mb-4 inline-block rounded-full bg-brand-terracotta/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-terracotta">
          {badge}
        </span>
        <h3 className="mb-2 text-2xl font-bold uppercase tracking-tight text-stone-900 transition-colors group-hover:text-brand-olive">
          {place.name}
        </h3>
        <p className="mb-6 text-sm text-stone-500">
          {[place.address, distanceText(place)].filter(Boolean).join(" • ")}
        </p>

        <div className="mt-auto flex w-full items-center justify-between border-t border-stone-100 pt-6">
          <div className="space-y-1">
            {place.rating !== undefined && (
              <Stars rating={place.rating} count={place.ratingCount} />
            )}
            {price && (
              <p className="text-sm font-bold text-brand-terracotta">{price}</p>
            )}
          </div>
          <MapsButton place={place} className="rounded-xl" />
        </div>
      </div>
    </article>
  );
}

export function RowCard({ place }: { place: PlaceResult }) {
  const price = priceLabel(place.priceLevel);

  return (
    <article className="group flex flex-col items-center justify-between gap-6 rounded-[32px] border border-stone-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-terracotta/30 hover:shadow-md sm:flex-row">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
        <div
          aria-hidden
          className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-stone-50 bg-brand-cream text-3xl transition-transform group-hover:scale-110"
        >
          {categoryIcon[place.category]}
        </div>
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900">
            {place.name}
          </h3>
          <p className="text-sm font-medium text-stone-500">
            {[place.address, distanceText(place)].filter(Boolean).join(" • ")}
          </p>
          <div className="mt-2">
            <OpenBadge open={place.openNow} />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-3 border-t border-stone-100 pt-6 sm:w-auto sm:items-end sm:border-t-0 sm:pt-0">
        <div className="flex flex-col items-center gap-1 sm:items-end">
          {price && (
            <span className="text-lg font-bold leading-none tracking-tighter text-brand-olive">
              {price}
            </span>
          )}
          {place.rating !== undefined && (
            <Stars rating={place.rating} count={place.ratingCount} />
          )}
        </div>
        <MapsButton place={place} className="rounded-xl" />
      </div>
    </article>
  );
}