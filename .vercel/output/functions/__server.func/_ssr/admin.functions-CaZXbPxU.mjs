import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { t as createServerRpc } from "./createServerRpc-BIqpJPUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CaZXbPxU.js
async function requireAdmin() {
	const { getAdminSession } = await import("./session.server-DLJCgx1U.mjs");
	const session = await getAdminSession();
	if (!session.data.username) throw new Response("Unauthorized", { status: 401 });
	return session.data.username;
}
var adminMeFn_createServerFn_handler = createServerRpc({
	id: "e8075f0118d2cb22610ab1f890f35e43f48699f0e9efdcf974c954c4adccec19",
	name: "adminMeFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminMeFn.__executeServer(opts));
var adminMeFn = createServerFn({ method: "GET" }).handler(adminMeFn_createServerFn_handler, async () => {
	const { getAdminSession } = await import("./session.server-DLJCgx1U.mjs");
	return { username: (await getAdminSession()).data.username ?? null };
});
var adminLoginFn_createServerFn_handler = createServerRpc({
	id: "c503d0ead8f8cb8790578898339bedbd75b8707f146ed203919b8582851fdb43",
	name: "adminLoginFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminLoginFn.__executeServer(opts));
var adminLoginFn = createServerFn({ method: "POST" }).validator((data) => data).handler(adminLoginFn_createServerFn_handler, async ({ data }) => {
	const { getAdminSession, ADMIN_USERNAME, VALID_ADMIN_PASSWORDS } = await import("./session.server-DLJCgx1U.mjs");
	if (data.username !== ADMIN_USERNAME || !VALID_ADMIN_PASSWORDS.includes(data.password)) throw new Error("Invalid username or password");
	await (await getAdminSession()).update({ username: ADMIN_USERNAME });
	return {
		ok: true,
		username: ADMIN_USERNAME
	};
});
var adminLogoutFn_createServerFn_handler = createServerRpc({
	id: "0fe875f17052d2dcfa21965b34346d2c1c87b3eea56dc5df1e14621fe7c94b9d",
	name: "adminLogoutFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminLogoutFn.__executeServer(opts));
var adminLogoutFn = createServerFn({ method: "POST" }).handler(adminLogoutFn_createServerFn_handler, async () => {
	const { getAdminSession } = await import("./session.server-DLJCgx1U.mjs");
	await (await getAdminSession()).clear();
	return { ok: true };
});
var uploadProductImageFn_createServerFn_handler = createServerRpc({
	id: "46cca3f8b4839a8bbd07111581948924e6c76ce8894c39203079b0b7c341d4b9",
	name: "uploadProductImageFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => uploadProductImageFn.__executeServer(opts));
var uploadProductImageFn = createServerFn({ method: "POST" }).validator((data) => data).handler(uploadProductImageFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const { uploadImageToStorage } = await import("./s3.server-DQN2lAUs.mjs");
	return await uploadImageToStorage({
		filename: data.filename,
		base64Data: data.base64Data,
		contentType: data.contentType
	});
});
function validateProduct(p) {
	const trim = (s) => typeof s === "string" ? s.trim() : "";
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
	let category = trim(p.category);
	if (![
		"fragrance",
		"body",
		"skin",
		"hair"
	].includes(category)) category = "fragrance";
	const optText = (s) => {
		const t = typeof s === "string" ? s.trim() : "";
		return t.length ? t : null;
	};
	const ugc_videos = (Array.isArray(p.ugc_videos) ? p.ugc_videos : []).map((v) => typeof v === "string" ? v.trim() : "").filter(Boolean).slice(0, 24);
	return {
		slug,
		name,
		brand,
		price,
		img,
		tag,
		notes,
		category,
		description: optText(p.description),
		details: optText(p.details),
		how_to_use: optText(p.how_to_use),
		shipping_text: optText(p.shipping_text),
		authenticity_text: optText(p.authenticity_text),
		returns_text: optText(p.returns_text),
		ugc_videos
	};
}
var createProductFn_createServerFn_handler = createServerRpc({
	id: "ce37921f47cb506ad6c2ed9518afa04aa4ee39399d8595bc07fac7e53e633ccd",
	name: "createProductFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => createProductFn.__executeServer(opts));
var createProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createProductFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const p = validateProduct(data);
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`
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
var updateProductFn_createServerFn_handler = createServerRpc({
	id: "975f3c3d48bf5c6a73d73bb38c4dd74ec1cff065e9b9d7b7c091acb18e38876d",
	name: "updateProductFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => updateProductFn.__executeServer(opts));
var updateProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateProductFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const p = validateProduct(data);
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`
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
var deleteProductFn_createServerFn_handler = createServerRpc({
	id: "ed022e7bacbd7594e4d86c62ca1d2ce41b6cf4e5645aafc87fc538b65011dc8e",
	name: "deleteProductFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => deleteProductFn.__executeServer(opts));
var deleteProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(deleteProductFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`DELETE FROM products WHERE slug = ${data.slug}`;
	return { ok: true };
});
var adminListReviewsFn_createServerFn_handler = createServerRpc({
	id: "1df26427009c15b5b7f50c3eeced9aa850f93ec285e1874c3636b03c73bc48af",
	name: "adminListReviewsFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListReviewsFn.__executeServer(opts));
var adminListReviewsFn = createServerFn({ method: "GET" }).handler(adminListReviewsFn_createServerFn_handler, async () => {
	await requireAdmin();
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	return await getSql()`
    SELECT id, product_slug, user_name, rating, title, body, created_at
    FROM reviews ORDER BY created_at DESC LIMIT 500
  `;
});
var adminDeleteReviewFn_createServerFn_handler = createServerRpc({
	id: "68bfce8fbe265e156c0f6c852f3c396cab5b4049c54ee0ea82d538531fcfe65b",
	name: "adminDeleteReviewFn",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteReviewFn.__executeServer(opts));
var adminDeleteReviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(adminDeleteReviewFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`DELETE FROM reviews WHERE id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { adminDeleteReviewFn_createServerFn_handler, adminListReviewsFn_createServerFn_handler, adminLoginFn_createServerFn_handler, adminLogoutFn_createServerFn_handler, adminMeFn_createServerFn_handler, createProductFn_createServerFn_handler, deleteProductFn_createServerFn_handler, updateProductFn_createServerFn_handler, uploadProductImageFn_createServerFn_handler };
