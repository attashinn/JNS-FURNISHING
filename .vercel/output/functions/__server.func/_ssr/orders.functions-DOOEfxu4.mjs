import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { t as createServerRpc } from "./createServerRpc-BIqpJPUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-DOOEfxu4.js
function generateOrderNumber() {
	const now = /* @__PURE__ */ new Date();
	return `SV-${now.getFullYear().toString().slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${Math.floor(1e3 + Math.random() * 9e3)}`;
}
var placeOrderFn_createServerFn_handler = createServerRpc({
	id: "c4dd963ce52952317a562c0b0824cd9990071cb5bf09b48225eda4e9eb942954",
	name: "placeOrderFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => placeOrderFn.__executeServer(opts));
var placeOrderFn = createServerFn({ method: "POST" }).validator((data) => data).handler(placeOrderFn_createServerFn_handler, async ({ data }) => {
	const trim = (s) => typeof s === "string" ? s.trim() : "";
	const name = trim(data.customer_name);
	const phone = trim(data.phone);
	const email = trim(data.email) || null;
	const address = trim(data.address);
	const city = trim(data.city);
	const notes = trim(data.notes) || null;
	if (!name || name.length > 120) throw new Error("Name is required");
	if (!phone || phone.length > 40) throw new Error("Phone is required");
	if (!address || address.length > 500) throw new Error("Address is required");
	if (!city || city.length > 120) throw new Error("City is required");
	if (!Array.isArray(data.items) || data.items.length === 0) throw new Error("Cart is empty");
	const items = data.items.map((i) => ({
		slug: String(i.slug),
		name: String(i.name),
		price: Number(i.price) || 0,
		img: String(i.img),
		qty: Math.max(1, Math.floor(Number(i.qty) || 1))
	}));
	const total = items.reduce((s, i) => s + i.price * i.qty, 0);
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	const sql = getSql();
	let orderNumber = generateOrderNumber();
	for (let attempt = 0; attempt < 5; attempt++) {
		if ((await sql`SELECT 1 FROM orders WHERE order_number = ${orderNumber} LIMIT 1`).length === 0) break;
		orderNumber = generateOrderNumber();
	}
	await sql`
      INSERT INTO orders (order_number, customer_name, phone, email, address, city, notes, items, total, payment_method, status)
      VALUES (${orderNumber}, ${name}, ${phone}, ${email}, ${address}, ${city}, ${notes},
              ${JSON.stringify(items)}::jsonb, ${total}, 'cod', 'pending')
    `;
	return {
		ok: true,
		order_number: orderNumber,
		total
	};
});
async function requireAdmin() {
	const { getAdminSession } = await import("./session.server-DLJCgx1U.mjs");
	if (!(await getAdminSession()).data.username) throw new Response("Unauthorized", { status: 401 });
}
var listOrdersFn_createServerFn_handler = createServerRpc({
	id: "d1fd1774bba7b45fd70c65cb44fdcd2ce97c39da91933dac30ca2e500074479d",
	name: "listOrdersFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => listOrdersFn.__executeServer(opts));
var listOrdersFn = createServerFn({ method: "GET" }).handler(listOrdersFn_createServerFn_handler, async () => {
	await requireAdmin();
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	return await getSql()`
    SELECT id, order_number, customer_name, phone, email, address, city, notes,
           items, total::text AS total, payment_method, status, created_at
    FROM orders ORDER BY id DESC
  `;
});
var updateOrderStatusFn_createServerFn_handler = createServerRpc({
	id: "71a96c4074bd523f86cbe6469e1783d48dc2ab02b0c2b626fa7b7d311de83fba",
	name: "updateOrderStatusFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => updateOrderStatusFn.__executeServer(opts));
var updateOrderStatusFn = createServerFn({ method: "POST" }).validator((data) => data).handler(updateOrderStatusFn_createServerFn_handler, async ({ data }) => {
	await requireAdmin();
	if (![
		"pending",
		"confirmed",
		"shipped",
		"delivered",
		"cancelled"
	].includes(data.status)) throw new Error("Invalid status");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	await getSql()`UPDATE orders SET status = ${data.status} WHERE order_number = ${data.order_number}`;
	return { ok: true };
});
var myOrdersFn_createServerFn_handler = createServerRpc({
	id: "2c3e15de7b9eaed1edb736d0f1f468d6ddfcdd4e83df0fea876a99dfceb82d19",
	name: "myOrdersFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => myOrdersFn.__executeServer(opts));
var myOrdersFn = createServerFn({ method: "GET" }).handler(myOrdersFn_createServerFn_handler, async () => {
	const { getUserSession } = await import("./user-session.server-D9b6DLsk.mjs");
	const session = await getUserSession();
	if (!session.data.userId || !session.data.email) return [];
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	return await getSql()`
    SELECT id, order_number, customer_name, phone, email, address, city, notes,
           items, total::text AS total, payment_method, status, created_at
    FROM orders WHERE LOWER(email) = ${session.data.email} ORDER BY id DESC
  `;
});
var trackOrderFn_createServerFn_handler = createServerRpc({
	id: "200711f07dd2fa7378f66da80e77661509c254688a1f6ab1f59ff6eafbd67e48",
	name: "trackOrderFn",
	filename: "src/lib/orders.functions.ts"
}, (opts) => trackOrderFn.__executeServer(opts));
var trackOrderFn = createServerFn({ method: "POST" }).validator((data) => data).handler(trackOrderFn_createServerFn_handler, async ({ data }) => {
	const q = (data.query || "").trim();
	if (!q) throw new Error("Please enter an order number or phone number");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	const rows = await getSql()`
      SELECT id, order_number, customer_name, phone, email, address, city, notes,
             items, total::text AS total, payment_method, status, created_at
      FROM orders
      WHERE LOWER(order_number) = ${q.toLowerCase()}
         OR phone = ${q}
         OR phone LIKE ${"%" + q + "%"}
      ORDER BY id DESC
      LIMIT 1
    `;
	if (rows.length === 0) return null;
	return rows[0];
});
//#endregion
export { listOrdersFn_createServerFn_handler, myOrdersFn_createServerFn_handler, placeOrderFn_createServerFn_handler, trackOrderFn_createServerFn_handler, updateOrderStatusFn_createServerFn_handler };
