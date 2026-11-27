export const siteConfig = {
  name: "Detour", 
  tagline: "Find places to do, eat and stay across South Africa.",
  description:
    "Pick a place and a radius, then discover things to do, places to eat and stay, clubs and events nearby.",
  contactEmail: "",
    copyrightYear: 2026,
};

export const categories = [
  { key: "do", label: "Things to do", short: "Do", blurb: "Attractions, museums and parks" },
  { key: "eat", label: "Places to eat", short: "Eat", blurb: "Restaurants, cafés and bars" },
  { key: "stay", label: "Places to stay", short: "Stay", blurb: "Lodges, guesthouses and hotels" },
  { key: "clubs", label: "Clubs & events", short: "Clubs", blurb: "Nightlife and what's on" },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];