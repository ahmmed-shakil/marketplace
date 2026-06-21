/** Deterministic product image URLs — stable per product slug */

const CATEGORY_SEEDS: Record<string, number> = {
  smartphones: 100,
  laptops: 200,
  televisions: 300,
  audio: 400,
  motorcycles: 500,
  cars: 600,
  cycling: 700,
  "air-conditioners": 800,
  refrigerators: 900,
  "washing-machines": 1000,
  fashion: 1100,
  tools: 1200,
  appliances: 1300,
};

export function productImageUrl(slug: string, categorySlug = "general"): string {
  const base = CATEGORY_SEEDS[categorySlug] ?? 50;
  const hash = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const id = base + (hash % 80);
  return `https://picsum.photos/seed/market-${slug}-${id}/800/600`;
}

export function productThumbUrl(slug: string, categorySlug = "general"): string {
  return productImageUrl(slug, categorySlug).replace("/800/600", "/400/300");
}
