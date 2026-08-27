import { createServerFn } from "@tanstack/react-start";

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  img: string;
  qty: number;
};

export type Order = {
  id: number;
  order_number: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  notes: string | null;
  items: OrderItem[];
  total: string;
  payment_method: string;
  status: string;
  created_at: string;
};

export type PlaceOrderInput = {
  customer_name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
};

function generateOrderNumber() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SV-${y}${m}${d}-${rand}`;
}

export const placeOrderFn = createServerFn({ method: "POST" })
  .validator((data: PlaceOrderInput) => data)
  .handler(async ({ data }) => {
    const trim = (s: unknown) => (typeof s === "string" ? s.trim() : "");
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

    const items: OrderItem[] = data.items.map((i) => ({
      slug: String(i.slug),
      name: String(i.name),
      price: Number(i.price) || 0,
      img: String(i.img),
      qty: Math.max(1, Math.floor(Number(i.qty) || 1)),
    }));
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);

    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();

    let orderNumber = generateOrderNumber();
    for (let attempt = 0; attempt < 5; attempt++) {
      const existing = (await sql`SELECT 1 FROM orders WHERE order_number = ${orderNumber} LIMIT 1`) as unknown[];
      if (existing.length === 0) break;
      orderNumber = generateOrderNumber();
    }

    await sql`
      INSERT INTO orders (order_number, customer_name, phone, email, address, city, notes, items, total, payment_method, status)
      VALUES (${orderNumber}, ${name}, ${phone}, ${email}, ${address}, ${city}, ${notes},
              ${JSON.stringify(items)}::jsonb, ${total}, 'cod', 'pending')
    `;

    return { ok: true, order_number: orderNumber, total };
  });

async function requireAdmin() {
  const { getAdminSession } = await import("./session.server");
  const session = await getAdminSession();
  if (!session.data.username) throw new Response("Unauthorized", { status: 401 });
}

export const listOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { getSql, ensureDb } = await import("./db.server");
  await ensureDb();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, order_number, customer_name, phone, email, address, city, notes,
           items, total::text AS total, payment_method, status, created_at
    FROM orders ORDER BY id DESC
  `) as Order[];
  return rows;
});

export const updateOrderStatusFn = createServerFn({ method: "POST" })
  .validator((data: { order_number: string; status: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const allowed = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!allowed.includes(data.status)) throw new Error("Invalid status");
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    await sql`UPDATE orders SET status = ${data.status} WHERE order_number = ${data.order_number}`;
    return { ok: true };
  });

export const myOrdersFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getUserSession } = await import("./user-session.server");
  const session = await getUserSession();
  if (!session.data.userId || !session.data.email) return [] as Order[];
  const { getSql, ensureDb } = await import("./db.server");
  await ensureDb();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, order_number, customer_name, phone, email, address, city, notes,
           items, total::text AS total, payment_method, status, created_at
    FROM orders WHERE LOWER(email) = ${session.data.email} ORDER BY id DESC
  `) as Order[];
  return rows;
});

export const trackOrderFn = createServerFn({ method: "POST" })
  .validator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    const q = (data.query || "").trim();
    if (!q) throw new Error("Please enter an order number or phone number");
    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();
    const rows = (await sql`
      SELECT id, order_number, customer_name, phone, email, address, city, notes,
             items, total::text AS total, payment_method, status, created_at
      FROM orders
      WHERE LOWER(order_number) = ${q.toLowerCase()}
         OR phone = ${q}
         OR phone LIKE ${"%" + q + "%"}
      ORDER BY id DESC
      LIMIT 1
    `) as Order[];
    if (rows.length === 0) return null;
    return rows[0];
  });

