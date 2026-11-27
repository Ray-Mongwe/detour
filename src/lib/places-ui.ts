import type { CategoryKey } from "@/lib/site";
import type { PlaceResult } from "@/types/places";

export const categoryIcon: Record<CategoryKey, string> = {
  do: "🌿",
  eat: "🍽️",
  stay: "🛏️",
  clubs: "🎶",
};

export function priceLabel(level?: number): string | null {
  if (level === undefined) return null;
  return level === 0 ? "Free" : "R".repeat(level);
}

// Real results will carry Google's own link (step 7); mock ones fall back to coordinates.
export function mapsLink(p: PlaceResult): string {
  if (p.mapsUrl) return p.mapsUrl;
  const q = new URLSearchParams({ api: "1", query: `${p.lat},${p.lng}` });
  return `https://www.google.com/maps/search/?${q.toString()}`;
}