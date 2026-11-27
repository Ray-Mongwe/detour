import type { PlaceResult, SearchFilters } from "@/types/places";

export function applyFilters(
  results: PlaceResult[],
  f: SearchFilters,
): PlaceResult[] {
  return results.filter((r) => {
    if (f.minRating && (r.rating ?? 0) < f.minRating) return false;
    if (f.openNow && r.openNow !== true) return false;
    if (
      f.priceLevels?.length &&
      (r.priceLevel === undefined || !f.priceLevels.includes(r.priceLevel))
    ) {
      return false;
    }
    return true;
  });
}