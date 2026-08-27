import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { s as adminLoginFn } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-D0U3rMPa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const login = useServerFn(adminLoginFn);
	const [username, setUsername] = (0, import_react.useState)("admin");
	const [password, setPassword] = (0, import_react.useState)("admin123");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	async function handleSubmit(e) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await login({ data: {
				username,
				password
			} });
			navigate({ to: "/admin" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-md sm:rounded-lg bg-white p-6 sm:p-8 shadow-xl border border-[#E8E2D8] text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.25em] text-[#D4A25A] font-bold block",
							children: "Internal Concierge"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl sm:text-2xl font-extrabold text-[#141715] mt-1",
							children: "JNS Admin Portal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#7A766F] mt-1",
							children: "Store catalogue, live orders & customer reviews"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 rounded-sm bg-[#F4EFEA] border border-[#E8E2D8] p-3 text-xs text-[#7A766F]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-[#141715] mb-0.5",
						children: "Admin Demo Credentials:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["User: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#141715]",
							children: "admin"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Pass: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-[#141715]",
							children: "admin123"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold uppercase tracking-wider text-[#141715]",
							children: "Username"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: username,
							onChange: (e) => setUsername(e.target.value),
							autoComplete: "username",
							required: true,
							className: "mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-bold uppercase tracking-wider text-[#141715]",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "password",
							value: password,
							onChange: (e) => setPassword(e.target.value),
							autoComplete: "current-password",
							required: true,
							className: "mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]"
						})] }),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-sm bg-red-50 border border-red-200 p-2.5 text-xs text-red-600 font-medium",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading || !hydrated,
							className: "w-full rounded-sm bg-[#141715] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all shadow-md disabled:opacity-60 cursor-pointer",
							children: !hydrated ? "Loading..." : loading ? "Signing in..." : "Sign into Dashboard →"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { LoginPage as component };
