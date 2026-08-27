import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { t as createServerRpc } from "./createServerRpc-BIqpJPUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-D98QUxfG.js
var listProductsFn_createServerFn_handler = createServerRpc({
	id: "3286bd167303cb4653765a4a57e9277ea1ce96c5d9dc2eb9611a3fc9ab18f3e9",
	name: "listProductsFn",
	filename: "src/lib/products.functions.ts"
}, (opts) => listProductsFn.__executeServer(opts));
var listProductsFn = createServerFn({ method: "GET" }).handler(listProductsFn_createServerFn_handler, async () => {
	try {
		const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
		await ensureDb();
		const rows = await getSql()`
      SELECT slug, name, brand, price, img, tag, notes, category,
             description, details, how_to_use, shipping_text, authenticity_text, returns_text,
             COALESCE(ugc_videos, '[]'::jsonb) AS ugc_videos
      FROM products
      ORDER BY id ASC
    `;
		if (rows && rows.length > 0) return rows;
	} catch (err) {
		console.error("Failed to query products from DB, using fallback seed catalog:", err);
	}
	const { SEED_PRODUCTS } = await import("./db.server-Dz78SIoq.mjs");
	return SEED_PRODUCTS;
});
var getProductFn_createServerFn_handler = createServerRpc({
	id: "83994b3dc3d81e585594f3bdd0a952d747bff42b8244d302b1e2cf8d320f88da",
	name: "getProductFn",
	filename: "src/lib/products.functions.ts"
}, (opts) => getProductFn.__executeServer(opts));
var getProductFn = createServerFn({ method: "GET" }).validator((data) => data).handler(getProductFn_createServerFn_handler, async ({ data }) => {
	try {
		const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
		await ensureDb();
		const rows = await getSql()`
        SELECT slug, name, brand, price, img, tag, notes, category,
               description, details, how_to_use, shipping_text, authenticity_text, returns_text,
               COALESCE(ugc_videos, '[]'::jsonb) AS ugc_videos
        FROM products WHERE slug = ${data.slug} LIMIT 1
      `;
		if (rows && rows[0]) return rows[0];
	} catch (err) {
		console.error("Failed to get product by slug from DB:", err);
	}
	const { SEED_PRODUCTS } = await import("./db.server-Dz78SIoq.mjs");
	return SEED_PRODUCTS.find((p) => p.slug === data.slug) ?? null;
});
//#endregion
export { getProductFn_createServerFn_handler, listProductsFn_createServerFn_handler };
