import { createServerFn } from "@tanstack/react-start";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  price: string;
  img: string;
  tag: string;
  notes: string;
  category: "fragrance" | "body" | "skin" | "hair";
  description?: string | null;
  details?: string | null;
  how_to_use?: string | null;
  shipping_text?: string | null;
  authenticity_text?: string | null;
  returns_text?: string | null;
  ugc_videos?: string[];
};

export const listProductsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    const rows = (await sql`
      SELECT slug, name, brand, price, img, tag, notes, category,
             description, details, how_to_use, shipping_text, authenticity_text, returns_text,
             COALESCE(ugc_videos, '[]'::jsonb) AS ugc_videos
      FROM products
      ORDER BY id ASC
    `) as Product[];
    if (rows && rows.length > 0) return rows;
  } catch (err) {
    console.error("Failed to query products from DB, using fallback seed catalog:", err);
  }
  const { SEED_PRODUCTS } = await import("./db.server");
  return SEED_PRODUCTS as Product[];
});

export const getProductFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const { getSql, ensureDb } = await import("./db.server");
      await ensureDb();
      const sql = getSql();
      const rows = (await sql`
        SELECT slug, name, brand, price, img, tag, notes, category,
               description, details, how_to_use, shipping_text, authenticity_text, returns_text,
               COALESCE(ugc_videos, '[]'::jsonb) AS ugc_videos
        FROM products WHERE slug = ${data.slug} LIMIT 1
      `) as Product[];
      if (rows && rows[0]) return rows[0];
    } catch (err) {
      console.error("Failed to get product by slug from DB:", err);
    }
    const { SEED_PRODUCTS } = await import("./db.server");
    const found = SEED_PRODUCTS.find((p) => p.slug === data.slug);
    return (found as Product) ?? null;
  });
