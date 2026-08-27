import { createServerFn } from "@tanstack/react-start";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendVerificationEmail(email: string, name: string, code: string) {
  const apiKey = process.env.RESEND_API_KEY;
  // Default to Resend's shared onboarding sender which works without domain verification.
  // Override with RESEND_MAILING_ADDRESS once you've verified your own domain in Resend.
  const from = process.env.RESEND_MAILING_ADDRESS || "onboarding@resend.dev";
  if (!apiKey) {
    console.log(`\n[DEV AUTH] Verification code for ${email} (${name || "User"}): ${code}\n`);
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `Sanvogue <${from}>`,
      to: [email],
      subject: `Your Sanvogue verification code: ${code}`,
      html: `<div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px;background:#fafaf7;color:#1a1a1a">
        <h1 style="font-size:28px;margin:0 0 8px;letter-spacing:-.5px">Welcome${name ? `, ${name}` : ""}.</h1>
        <p style="color:#666;font-family:Arial,sans-serif;font-size:14px;margin:0 0 32px">Use the code below to sign in to Sanvogue. It expires in 1 hour.</p>
        <div style="background:#fff;border:1px solid #e5e5e0;border-radius:16px;padding:24px;text-align:center">
          <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#999">Verification code</p>
          <p style="margin:0;font-family:'Courier New',monospace;font-size:42px;letter-spacing:12px;font-weight:600;color:#1a1a1a">${code}</p>
        </div>
        <p style="color:#999;font-family:Arial,sans-serif;font-size:12px;margin-top:32px">If you didn't request this, ignore this email.</p>
      </div>`,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Resend send failed", res.status, body);
    let detail = "";
    try {
      const parsed = JSON.parse(body);
      detail = parsed?.message || parsed?.error || "";
    } catch { detail = body?.slice(0, 200) ?? ""; }
    throw new Error(`Failed to send verification email${detail ? `: ${detail}` : ""}`);
  }
}

export const requestCodeFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; name: string }) => data)
  .handler(async ({ data }) => {
    const email = normalizeEmail(data.email);
    const name = data.name.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email");
    if (!name || name.length > 80) throw new Error("Enter your name");

    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();

    await sql`
      INSERT INTO users (email, name) VALUES (${email}, ${name})
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    `;

    const code = generateCode();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await sql`
      INSERT INTO verification_codes (email, code, expires_at)
      VALUES (${email}, ${code}, ${expires})
    `;

    await sendVerificationEmail(email, name, code);
    return { ok: true };
  });

export const loginRequestCodeFn = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const email = normalizeEmail(data.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email");

    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();

    const users = (await sql`SELECT name FROM users WHERE email = ${email} LIMIT 1`) as { name: string }[];
    if (users.length === 0) throw new Error("No account found with that email");

    const code = generateCode();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    await sql`
      INSERT INTO verification_codes (email, code, expires_at)
      VALUES (${email}, ${code}, ${expires})
    `;

    await sendVerificationEmail(email, users[0].name, code);
    return { ok: true };
  });

export const verifyCodeFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; code: string }) => data)
  .handler(async ({ data }) => {
    const email = normalizeEmail(data.email);
    const code = data.code.trim();
    if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit code");

    const { getSql, ensureDb } = await import("./db.server");
    await ensureDb();
    const sql = getSql();

    const rows = (await sql`
      SELECT id FROM verification_codes
      WHERE email = ${email} AND code = ${code} AND used = FALSE AND expires_at > NOW()
      ORDER BY id DESC LIMIT 1
    `) as { id: number }[];

    if (rows.length === 0) throw new Error("Invalid or expired code");

    await sql`UPDATE verification_codes SET used = TRUE WHERE id = ${rows[0].id}`;

    const users = (await sql`SELECT id, email, name FROM users WHERE email = ${email} LIMIT 1`) as {
      id: number; email: string; name: string;
    }[];
    if (users.length === 0) throw new Error("Account not found");

    const { getUserSession } = await import("./user-session.server");
    const session = await getUserSession();
    await session.update({ userId: users[0].id, email: users[0].email, name: users[0].name });

    return { ok: true, user: users[0] };
  });

export const userMeFn = createServerFn({ method: "GET" }).handler(async () => {
  const { getUserSession } = await import("./user-session.server");
  const session = await getUserSession();
  if (!session.data.userId) return { user: null };
  return {
    user: {
      id: session.data.userId,
      email: session.data.email!,
      name: session.data.name!,
    },
  };
});

export const userLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  const { getUserSession } = await import("./user-session.server");
  const session = await getUserSession();
  await session.clear();
  return { ok: true };
});