import { PhotoCard, RowCard } from "./PlaceCard";
import type { CategoryKey } from "@/lib/site";
import type { PlaceResult } from "@/types/places";

export default function ResultList({
  results,
  category,
}: {
  results: PlaceResult[];
  category: CategoryKey;
}) {
  if (category === "eat") {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {results.map((r) => (
          <RowCard key={r.id} place={r} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
      {results.map((r) => (
        <PhotoCard key={r.id} place={r} />
      ))}
    </div>
  );
}