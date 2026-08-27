import { o as useSession$1 } from "./server-BtAHFl4G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-session.server-D9b6DLsk.js
function getUserSessionConfig() {
	return {
		password: process.env.SESSION_SECRET || "jns_furnishing_super_secure_session_secret_key_32_characters_long_2026",
		name: "sanvogue-user",
		maxAge: 2592e3,
		cookie: {
			sameSite: "lax",
			httpOnly: true,
			path: "/",
			secure: true
		}
	};
}
async function getUserSession() {
	return useSession$1(getUserSessionConfig());
}
//#endregion
export { getUserSession };
