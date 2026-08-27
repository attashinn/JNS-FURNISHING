import { r as __toESM } from "../_runtime.mjs";
import { a as useQueryClient, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { Y as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { T as verifyCodeFn, g as SiteHeader, w as userMeFn, x as requestCodeFn } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CEva0pYK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const { redirect } = useSearch({ from: "/auth" });
	const qc = useQueryClient();
	const requestCode = useServerFn(requestCodeFn);
	const verifyCode = useServerFn(verifyCodeFn);
	const [step, setStep] = (0, import_react.useState)("identify");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		userMeFn().then((r) => {
			if (r.user) navigate({ to: redirect || "/dashboard" });
		});
	}, [navigate, redirect]);
	async function submitIdentify(e) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await requestCode({ data: {
				name,
				email
			} });
			setStep("verify");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setLoading(false);
		}
	}
	async function submitVerify(e) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await verifyCode({ data: {
				email,
				code
			} });
			await qc.invalidateQueries({ queryKey: ["me"] });
			navigate({ to: redirect || "/dashboard" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Verification failed");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-sm flex-col px-6 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl",
					children: step === "identify" ? "Sign in" : "Enter code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: step === "identify" ? "We'll email you a 6-digit code." : `Sent to ${email}.`
				}),
				step === "identify" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitIdentify,
					className: "mt-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							required: true,
							maxLength: 80,
							placeholder: "Your name",
							className: "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true,
							placeholder: "Email address",
							className: "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading,
							className: "flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground disabled:opacity-60",
							children: [loading ? "Sending…" : "Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitVerify,
					className: "mt-8 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: code,
							onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
							required: true,
							inputMode: "numeric",
							pattern: "\\d{6}",
							maxLength: 6,
							autoFocus: true,
							placeholder: "000000",
							className: "w-full rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-xl tracking-[0.4em] outline-none focus:border-primary"
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "submit",
							disabled: loading || code.length !== 6,
							className: "flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground disabled:opacity-60",
							children: [loading ? "Verifying…" : "Verify", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setStep("identify");
								setCode("");
								setError(null);
							},
							className: "w-full text-center text-xs text-muted-foreground hover:text-foreground",
							children: "Use a different email"
						})
					]
				}),
				step === "identify" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-sm text-muted-foreground",
					children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/login",
							className: "text-foreground underline underline-offset-4 hover:text-primary",
							children: "Login"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AuthPage as component };
