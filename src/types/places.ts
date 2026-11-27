import type { CategoryKey } from "@/lib/site";

export type PriceLevel = 0 | 1 | 2 | 3 | 4; 

export interface PlaceResult {
  id: string; 
  name: string;
  category: CategoryKey;
  address?: string;
  lat: number;
  lng: number;
  rating?: number;
  ratingCount?: number;
  priceLevel?: PriceLevel;
  openNow?: boolean;
  photoRef?: string;
  mapsUrl?: string;
  types?: string[];
  distanceKm?: number;
}

export interface SearchFilters {
  minRating?: number;
  priceLevels?: PriceLevel[];
  openNow?: boolean;
}

export interface SearchParams extends SearchFilters {
  lat: number;
  lng: number;
  radiusKm: number;
  cat: CategoryKey;
}

export interface PlaceSuggestion {
  id: string;
  label: string;
  lat: number;
  lng: number;
}