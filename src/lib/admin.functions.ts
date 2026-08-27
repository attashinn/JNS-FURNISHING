import { createServerFn } from "@tanstack/react-start";
import type { Product } from "./products.functions";

async function requireAdmin() {
  const { getAdminSession } = await import("./session.server");
  const session = await getAdminSession();
  if (!session.data.username) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return session.data.username;
}

export const adminMeFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession } = await import("./session.server");
  const session = await getAdminSession();
  return { username: session.data.username ?? null };
});

export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { getAdminSession, ADMIN_USERNAME, VALID_ADMIN_PASSWORDS } = await import(
      "./session.server"
    );
    if (data.username !== ADMIN_USERNAME || !VALID_ADMIN_PASSWORDS.includes(data.password)) {
      throw new Error("Invalid username or password");
    }
    const session = await getAdminSession();
    await session.update({ username: ADMIN_USERNAME });
    return { ok: true, username: ADMIN_USERNAME };
  });

export const adminLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { getAdminSession } = await import("./session.server");
  const session = await getAdminSession();
  await session.clear();
  return { ok: true };
});

export const uploadProductImageFn = createServerFn({ method: "POST" })
  .validator(
    (data: { filename: string; base64Data: string; contentType?: string }) =>
      data
  )
  .handler(async ({ data }) => {
    await requireAdmin();
    const { uploadImageToStorage } = await import("./s3.server");
    const result = await uploadImageToStorage({
      filename: data.filename,
      base64Data: data.base64Data,
      contentType: data.contentType,
    });
    return result;
  });


type ProductInput = Omit<Product, never>;

function validateProduct(p: ProductInput) {
  const errs: string[] = [];
  const trim = (s: unknown) => (typeof s === "string" ? s.trim() : "");
  
  let name = trim(p.name);
  if (!name) name = "New Furnishing Item";

  let slug = trim(p.slug).toLowerCase();
  if (!slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!slug) slug = `jns-product-${Date.now()}`;
  }
  slug = slug.replace(/[^a-z0-9-]/g, "-");

  let brand = trim(p.brand);
  if (!brand) brand = "JNS Furnishing";

  let price = trim(p.price);
  if (!price || price === "৳") price = "৳2,490";
  else if (!price.startsWith("৳")) price = `৳${price}`;

  let img = trim(p.img);
  if (!img) img = "/products/curtain-blackout-charcoal.jpg";

  let tag = trim(p.tag);
  if (!tag) tag = "Bespoke";

  let notes = trim(p.notes);
  if (!notes) notes = `${brand} · ${p.category || "fragrance"}`;

  let category = trim(p.category) as Product["category"];
  if (!["fragrance", "body", "skin", "hair"].includes(category)) {
    category = "fragrance";
  }

  const optText = (s: unknown) => {
    const t = typeof s === "string" ? s.trim() : "";
    return t.length ? t : null;
  };
  const ugcRaw = Array.isArray(p.ugc_videos) ? p.ugc_videos : [];
  const ugc_videos = ugcRaw
    .map((v) => (typeof v === "string" ? v.trim() : ""))
    .filter(Boolean)
    .slice(0, 24);

  return {
    slug, name, brand, price, img, tag, notes,
    category,
    description: optText(p.description),
    details: optText(p.details),
    how_to_use: optText(p.how_to_use),
    shipping_text: optText(p.shipping_text),
    authenticity_text: optText(p.authenticity_text),
    returns_text: optText(p.returns_text),
    ugc_videos,
  };
}

export const createProductFn = createServerFn({ method: "POST" })
  .validator((data: ProductInput) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const p = validateProduct(data);
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`
      INSERT INTO products (
        slug, name, brand, price, img, tag, notes, category,
        description, details, how_to_use, shipping_text, authenticity_text, returns_text, ugc_videos
      )
      VALUES (
        ${p.slug}, ${p.name}, ${p.brand}, ${p.price}, ${p.img}, ${p.tag}, ${p.notes}, ${p.category},
        ${p.description}, ${p.details}, ${p.how_to_use}, ${p.shipping_text}, ${p.authenticity_text}, ${p.returns_text},
        ${JSON.stringify(p.ugc_videos)}::jsonb
      )
    `;
    return { ok: true };
  });

export const updateProductFn = createServerFn({ method: "POST" })
  .validator((data: { originalSlug: string } & ProductInput) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const p = validateProduct(data);
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`
      UPDATE products
      SET slug = ${p.slug}, name = ${p.name}, brand = ${p.brand}, price = ${p.price},
          img = ${p.img}, tag = ${p.tag}, notes = ${p.notes}, category = ${p.category},
          description = ${p.description}, details = ${p.details}, how_to_use = ${p.how_to_use},
          shipping_text = ${p.shipping_text}, authenticity_text = ${p.authenticity_text},
          returns_text = ${p.returns_text}, ugc_videos = ${JSON.stringify(p.ugc_videos)}::jsonb,
          updated_at = NOW()
      WHERE slug = ${data.originalSlug}
    `;
    return { ok: true };
  });

export const deleteProductFn = createServerFn({ method: "POST" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`DELETE FROM products WHERE slug = ${data.slug}`;
    return { ok: true };
  });

export type AdminReview = {
  id: number;
  product_slug: string;
  user_name: string;
  rating: number;
  title: string;
  body: string;
  created_at: string;
};

export const adminListReviewsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { getSql, ensureDb } = await import("./db.server");
  await ensureDb();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, product_slug, user_name, rating, title, body, created_at
    FROM reviews ORDER BY created_at DESC LIMIT 500
  `) as AdminReview[];
  return rows;
});

export const adminDeleteReviewFn = createServerFn({ method: "POST" })
  .validator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`DELETE FROM reviews WHERE id = ${data.id}`;
    return { ok: true };
  });
