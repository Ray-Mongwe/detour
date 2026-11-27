import type { CategoryKey } from "@/lib/site";
import type { PlaceResult, PlaceSuggestion, PriceLevel } from "@/types/places";

// MOCK ONLY: replaced by Google autocomplete in step 7. Coordinates approximate.
export const mockSuggestions: PlaceSuggestion[] = [
  { id: "mock-durban", label: "Durban, KwaZulu-Natal", lat: -29.8587, lng: 31.0218 },
  { id: "mock-cpt", label: "Cape Town, Western Cape", lat: -33.9249, lng: 18.4241 },
  { id: "mock-jhb", label: "Johannesburg, Gauteng", lat: -26.2041, lng: 28.0473 },
  { id: "mock-pta", label: "Pretoria, Gauteng", lat: -25.7479, lng: 28.2293 },
  { id: "mock-pmb", label: "Pietermaritzburg, KwaZulu-Natal", lat: -29.6006, lng: 30.3794 },
  { id: "mock-gqeberha", label: "Gqeberha, Eastern Cape", lat: -33.9608, lng: 25.6022 },
  { id: "mock-polokwane", label: "Polokwane, Limpopo", lat: -23.9045, lng: 29.4689 },
  { id: "mock-tzaneen", label: "Tzaneen, Limpopo", lat: -23.8333, lng: 30.1667 },
];

const noun: Record<CategoryKey, string> = {
  do: "Attraction",
  eat: "Restaurant",
  stay: "Lodge",
  clubs: "Club",
};

const ratings = [4.8, 4.5, 4.2, 3.9, 4.7, 4.1, 3.6, 4.4, 4.0, 4.9, 3.8, 4.3];
const prices: PriceLevel[] = [1, 2, 3, 2, 4, 1, 2, 3, 1, 2, 3, 2];

export function getMockResults(
  cat: CategoryKey,
  center: { lat: number; lng: number },
  radiusKm: number,
): PlaceResult[] {
  return ratings.map((rating, i) => {
    const distanceKm = Math.round(((i + 1) * radiusKm * 10) / 13) / 10;
    const angle = (i * 137.5 * Math.PI) / 180;
    const dLat = (distanceKm / 111) * Math.cos(angle);
    const dLng =
      (distanceKm / (111 * Math.cos((center.lat * Math.PI) / 180))) *
      Math.sin(angle);

    return {
      id: `mock-${cat}-${i}`,
      name: `Sample ${noun[cat]} ${i + 1}`,
      category: cat,
      address: `[Sample address ${i + 1}]`,
      lat: center.lat + dLat,
      lng: center.lng + dLng,
      rating,
      ratingCount: 20 + i * 37,
      priceLevel: prices[i],
      openNow: i % 3 !== 0,
      distanceKm,
    };
  });
}