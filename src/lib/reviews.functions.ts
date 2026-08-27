import { createServerFn } from "@tanstack/react-start";

export type Review = {
  id: number;
  product_slug: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
};

export type ReviewStat = { slug: string; avg: number; count: number };

export const listReviewsFn = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    const rows = (await sql`
      SELECT id, product_slug, user_name, rating, title, body, created_at
      FROM reviews WHERE product_slug = ${data.slug}
      ORDER BY created_at DESC LIMIT 50
    `) as Review[];
    return rows;
  });

export const listReviewStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getSql, ensureDb } = await import("./db.server");
  await ensureDb();
  const sql = getSql();
  const rows = (await sql`
    SELECT product_slug AS slug, AVG(rating)::float AS avg, COUNT(*)::int AS count
    FROM reviews GROUP BY product_slug
  `) as ReviewStat[];
  return rows;
});

export const submitReviewFn = createServerFn({ method: "POST" })
  .validator((data: { slug: string; rating: number; title: string; body: string }) => data)
  .handler(async ({ data }) => {
    const { getUserSession } = await import("./user-session.server");
    const session = await getUserSession();
    if (!session.data.userId) throw new Error("Please sign in to write a review");

    const slug = data.slug.trim();
    const rating = Math.max(1, Math.min(5, Math.floor(Number(data.rating) || 0)));
    const title = data.title.trim().slice(0, 120);
    const body = data.body.trim().slice(0, 2000);
    if (!slug || !title || !body || !rating) throw new Error("Fill out all fields");

    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`
      INSERT INTO reviews (product_slug, user_id, user_name, rating, title, body)
      VALUES (${slug}, ${session.data.userId}, ${session.data.name!}, ${rating}, ${title}, ${body})
    `;
    return { ok: true };
  });