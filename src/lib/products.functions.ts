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
  return rows;
});

export const getProductFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    const rows = (await sql`
      SELECT slug, name, brand, price, img, tag, notes, category,
             description, details, how_to_use, shipping_text, authenticity_text, returns_text,
             COALESCE(ugc_videos, '[]'::jsonb) AS ugc_videos
      FROM products WHERE slug = ${data.slug} LIMIT 1
    `) as Product[];
    return rows[0] ?? null;
  });
