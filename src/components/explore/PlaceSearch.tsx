"use client";

import { useMemo, useState } from "react";
import { mockSuggestions } from "@/lib/mock-data";
import type { PlaceSuggestion } from "@/types/places";

interface Props {
  value: PlaceSuggestion | null;
  onSelect: (place: PlaceSuggestion | null) => void;
}

export default function PlaceSearch({ value, onSelect }: Props) {
  const [query, setQuery] = useState(value?.label ?? "");
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? mockSuggestions.filter((s) => s.label.toLowerCase().includes(q))
      : mockSuggestions;
    return list.slice(0, 5);
  }, [query]);

  return (
    <div className="relative">
      <label
        htmlFor="place"
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-amber"
      >
        Where to?
      </label>
      <input
        id="place"
        type="text"
        value={query}
        autoComplete="off"
        placeholder="Search a town or city"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          if (value) onSelect(null);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        className="w-full rounded-2xl border border-stone-200 bg-brand-cream px-6 py-4 text-base text-stone-900 outline-none transition-all placeholder:text-stone-400 focus:border-brand-olive focus:ring-2 focus:ring-brand-olive/20"
      />
      <p className="mt-2 text-xs text-stone-400">
        Sample towns for now. Real place search arrives later.
      </p>

      {open && matches.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-xl"
        >
          {matches.map((s) => (
            <li key={s.id} role="option" aria-selected={value?.id === s.id}>
              <button
                type="button"
                // mousedown + preventDefault keeps the input from blurring first
                onMouseDown={(e) => {
                  e.preventDefault();
                  setQuery(s.label);
                  onSelect(s);
                  setOpen(false);
                }}
                className="w-full cursor-pointer px-6 py-3 text-left text-sm text-stone-700 transition-colors hover:bg-brand-cream"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}