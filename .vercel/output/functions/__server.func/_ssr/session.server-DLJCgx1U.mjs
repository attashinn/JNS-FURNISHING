import { o as useSession$1 } from "./server-BtAHFl4G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session.server-DLJCgx1U.js
function getSessionConfig() {
	return {
		password: process.env.SESSION_SECRET || "jns_furnishing_super_secure_session_secret_key_32_characters_long_2026",
		name: "sanvogue-admin",
		maxAge: 604800,
		cookie: {
			sameSite: "lax",
			httpOnly: true,
			path: "/",
			secure: true
		}
	};
}
async function getAdminSession() {
	return useSession$1(getSessionConfig());
}
var ADMIN_USERNAME = "admin";
var VALID_ADMIN_PASSWORDS = [
	"admin123",
	"sanvogue2026",
	"admin"
];
//#endregion
export { ADMIN_USERNAME, VALID_ADMIN_PASSWORDS, getAdminSession };
