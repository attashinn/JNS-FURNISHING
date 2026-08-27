import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { t as createServerRpc } from "./createServerRpc-BIqpJPUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reviews.functions-DoBFgKJL.js
var listReviewsFn_createServerFn_handler = createServerRpc({
	id: "bc58e14ad44d7dc951a49045e6c126bd4f0955beb165ac752e722903334d8a2b",
	name: "listReviewsFn",
	filename: "src/lib/reviews.functions.ts"
}, (opts) => listReviewsFn.__executeServer(opts));
var listReviewsFn = createServerFn({ method: "GET" }).validator((data) => data).handler(listReviewsFn_createServerFn_handler, async ({ data }) => {
	try {
		const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
		await ensureDb();
		return await getSql()`
        SELECT id, product_slug, user_name, rating, title, body, created_at
        FROM reviews WHERE product_slug = ${data.slug}
        ORDER BY created_at DESC LIMIT 50
      ` ?? [];
	} catch (err) {
		console.error("Failed to query reviews:", err);
		return [];
	}
});
var listReviewStatsFn_createServerFn_handler = createServerRpc({
	id: "b63a499be38f3c10b3356dd3224f90845b1c8211ef2b184c14f21ca4c9cd31d7",
	name: "listReviewStatsFn",
	filename: "src/lib/reviews.functions.ts"
}, (opts) => listReviewStatsFn.__executeServer(opts));
var listReviewStatsFn = createServerFn({ method: "GET" }).handler(listReviewStatsFn_createServerFn_handler, async () => {
	try {
		const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
		await ensureDb();
		return await getSql()`
      SELECT product_slug AS slug, AVG(rating)::float AS avg, COUNT(*)::int AS count
      FROM reviews GROUP BY product_slug
    ` ?? [];
	} catch (err) {
		console.error("Failed to query review stats:", err);
		return [];
	}
});
var submitReviewFn_createServerFn_handler = createServerRpc({
	id: "85289c17ced516c28197eb4b0097312eaad974c77915f330de47b169c77def86",
	name: "submitReviewFn",
	filename: "src/lib/reviews.functions.ts"
}, (opts) => submitReviewFn.__executeServer(opts));
var submitReviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(submitReviewFn_createServerFn_handler, async ({ data }) => {
	const { getUserSession } = await import("./user-session.server-D9b6DLsk.mjs");
	const session = await getUserSession();
	if (!session.data.userId) throw new Error("Please sign in to write a review");
	const slug = data.slug.trim();
	const rating = Math.max(1, Math.min(5, Math.floor(Number(data.rating) || 0)));
	const title = data.title.trim().slice(0, 120);
	const body = data.body.trim().slice(0, 2e3);
	if (!slug || !title || !body || !rating) throw new Error("Fill out all fields");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`
      INSERT INTO reviews (product_slug, user_id, user_name, rating, title, body)
      VALUES (${slug}, ${session.data.userId}, ${session.data.name}, ${rating}, ${title}, ${body})
    `;
	return { ok: true };
});
//#endregion
export { listReviewStatsFn_createServerFn_handler, listReviewsFn_createServerFn_handler, submitReviewFn_createServerFn_handler };
