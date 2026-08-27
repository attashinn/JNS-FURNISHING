import { r as createServerFn } from "./server-BtAHFl4G.mjs";
import { t as createServerRpc } from "./createServerRpc-BIqpJPUu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.functions-BLAWcw_1.js
function normalizeEmail(email) {
	return email.trim().toLowerCase();
}
function generateCode() {
	return String(Math.floor(1e5 + Math.random() * 9e5));
}
async function sendVerificationEmail(email, name, code) {
	const apiKey = process.env.RESEND_API_KEY;
	const from = process.env.RESEND_MAILING_ADDRESS || "onboarding@resend.dev";
	if (!apiKey) {
		console.log(`\n[DEV AUTH] Verification code for ${email} (${name || "User"}): ${code}\n`);
		return;
	}
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
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
      </div>`
		})
	});
	if (!res.ok) {
		const body = await res.text();
		console.error("Resend send failed", res.status, body);
		let detail = "";
		try {
			const parsed = JSON.parse(body);
			detail = parsed?.message || parsed?.error || "";
		} catch {
			detail = body?.slice(0, 200) ?? "";
		}
		throw new Error(`Failed to send verification email${detail ? `: ${detail}` : ""}`);
	}
}
var requestCodeFn_createServerFn_handler = createServerRpc({
	id: "33288ab3ac3af4812eaf8ac9914515d31c4c2f704f0b4da20ef38b82f1a5b9b5",
	name: "requestCodeFn",
	filename: "src/lib/auth.functions.ts"
}, (opts) => requestCodeFn.__executeServer(opts));
var requestCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(requestCodeFn_createServerFn_handler, async ({ data }) => {
	const email = normalizeEmail(data.email);
	const name = data.name.trim();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email");
	if (!name || name.length > 80) throw new Error("Enter your name");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	const sql = getSql();
	await sql`
      INSERT INTO users (email, name) VALUES (${email}, ${name})
      ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    `;
	const code = generateCode();
	await sql`
      INSERT INTO verification_codes (email, code, expires_at)
      VALUES (${email}, ${code}, ${new Date(Date.now() + 36e5).toISOString()})
    `;
	await sendVerificationEmail(email, name, code);
	return { ok: true };
});
var loginRequestCodeFn_createServerFn_handler = createServerRpc({
	id: "3e63e072a0b8839911bc11c6fa7577b77a1ce5397713a75f66ac79222a13858c",
	name: "loginRequestCodeFn",
	filename: "src/lib/auth.functions.ts"
}, (opts) => loginRequestCodeFn.__executeServer(opts));
var loginRequestCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(loginRequestCodeFn_createServerFn_handler, async ({ data }) => {
	const email = normalizeEmail(data.email);
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	const sql = getSql();
	const users = await sql`SELECT name FROM users WHERE email = ${email} LIMIT 1`;
	if (users.length === 0) throw new Error("No account found with that email");
	const code = generateCode();
	await sql`
      INSERT INTO verification_codes (email, code, expires_at)
      VALUES (${email}, ${code}, ${new Date(Date.now() + 36e5).toISOString()})
    `;
	await sendVerificationEmail(email, users[0].name, code);
	return { ok: true };
});
var verifyCodeFn_createServerFn_handler = createServerRpc({
	id: "1574a82b8357e6c7496cbf6545d99e0c565add31cd5b99c48064790d72bdff3d",
	name: "verifyCodeFn",
	filename: "src/lib/auth.functions.ts"
}, (opts) => verifyCodeFn.__executeServer(opts));
var verifyCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(verifyCodeFn_createServerFn_handler, async ({ data }) => {
	const email = normalizeEmail(data.email);
	const code = data.code.trim();
	if (!/^\d{6}$/.test(code)) throw new Error("Enter the 6-digit code");
	const { getSql, ensureDb } = await import("./db.server-Dz78SIoq.mjs");
	await ensureDb();
	const sql = getSql();
	const rows = await sql`
      SELECT id FROM verification_codes
      WHERE email = ${email} AND code = ${code} AND used = FALSE AND expires_at > NOW()
      ORDER BY id DESC LIMIT 1
    `;
	if (rows.length === 0) throw new Error("Invalid or expired code");
	await sql`UPDATE verification_codes SET used = TRUE WHERE id = ${rows[0].id}`;
	const users = await sql`SELECT id, email, name FROM users WHERE email = ${email} LIMIT 1`;
	if (users.length === 0) throw new Error("Account not found");
	const { getUserSession } = await import("./user-session.server-D9b6DLsk.mjs");
	await (await getUserSession()).update({
		userId: users[0].id,
		email: users[0].email,
		name: users[0].name
	});
	return {
		ok: true,
		user: users[0]
	};
});
var userMeFn_createServerFn_handler = createServerRpc({
	id: "7be806595fad7f26c1805a5ee553f238291994fc3da0c21d3508576c17f7487f",
	name: "userMeFn",
	filename: "src/lib/auth.functions.ts"
}, (opts) => userMeFn.__executeServer(opts));
var userMeFn = createServerFn({ method: "GET" }).handler(userMeFn_createServerFn_handler, async () => {
	const { getUserSession } = await import("./user-session.server-D9b6DLsk.mjs");
	const session = await getUserSession();
	if (!session.data.userId) return { user: null };
	return { user: {
		id: session.data.userId,
		email: session.data.email,
		name: session.data.name
	} };
});
var userLogoutFn_createServerFn_handler = createServerRpc({
	id: "097d00c64bc0a53f72dab0f29882cf0cff2c8d42599693d283432de20d61cde3",
	name: "userLogoutFn",
	filename: "src/lib/auth.functions.ts"
}, (opts) => userLogoutFn.__executeServer(opts));
var userLogoutFn = createServerFn({ method: "POST" }).handler(userLogoutFn_createServerFn_handler, async () => {
	const { getUserSession } = await import("./user-session.server-D9b6DLsk.mjs");
	await (await getUserSession()).clear();
	return { ok: true };
});
//#endregion
export { loginRequestCodeFn_createServerFn_handler, requestCodeFn_createServerFn_handler, userLogoutFn_createServerFn_handler, userMeFn_createServerFn_handler, verifyCodeFn_createServerFn_handler };
