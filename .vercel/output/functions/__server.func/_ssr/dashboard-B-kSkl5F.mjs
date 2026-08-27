import { r as __toESM } from "../_runtime.mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { k as LogOut, w as Package } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { C as userLogoutFn, g as SiteHeader, h as SiteFooter, w as userMeFn } from "./router-BoUir8eE.mjs";
import { n as myOrdersFn } from "./orders.functions-DQfHp6Jg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-B-kSkl5F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_COLORS = {
	pending: "bg-amber-100 text-amber-800",
	confirmed: "bg-blue-100 text-blue-800",
	shipped: "bg-purple-100 text-purple-800",
	delivered: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800"
};
function DashboardPage() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const logout = useServerFn(userLogoutFn);
	const { data: me, isLoading: meLoading } = useQuery({
		queryKey: ["me"],
		queryFn: () => userMeFn()
	});
	(0, import_react.useEffect)(() => {
		if (!meLoading && !me?.user) navigate({ to: "/auth" });
	}, [
		meLoading,
		me,
		navigate
	]);
	const { data: orders = [], isLoading: ordersLoading } = useQuery({
		queryKey: ["my-orders"],
		queryFn: () => myOrdersFn(),
		enabled: !!me?.user
	});
	async function handleLogout() {
		await logout();
		await qc.invalidateQueries({ queryKey: ["me"] });
		navigate({ to: "/" });
	}
	if (!me?.user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-md px-6 py-32 text-center text-sm text-muted-foreground",
			children: "Loading…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-5xl px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground",
							children: me.user.name.charAt(0).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.3em] text-muted-foreground",
								children: "Welcome back"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-4xl",
								children: me.user.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: me.user.email
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Your orders"
						})]
					}), ordersLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Loading your orders…"
					}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-dashed border-border p-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "You haven't placed any orders yet."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-4 inline-block rounded-full bg-primary px-6 py-2 text-xs uppercase tracking-widest text-primary-foreground",
							children: "Start shopping"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
											children: "Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-mono text-sm",
											children: o.order_number
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
											children: "Placed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: new Date(o.created_at).toLocaleDateString()
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-[0.25em] text-muted-foreground",
											children: "Total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-medium",
											children: ["৳", Number(o.total).toLocaleString("en-IN")]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-3 py-1 text-[11px] uppercase tracking-widest ${STATUS_COLORS[o.status] ?? "bg-muted text-muted-foreground"}`,
											children: o.status
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 space-y-3",
									children: o.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: it.img,
												alt: it.name,
												className: "h-14 w-14 rounded-lg bg-muted object-contain"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/product/$slug",
													params: { slug: it.slug },
													className: "text-sm hover:text-primary",
													children: it.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted-foreground",
													children: [
														"Qty ",
														it.qty,
														" · ৳",
														Math.round(it.price).toLocaleString("en-IN")
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/product/$slug",
												params: { slug: it.slug },
												className: "rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-widest hover:bg-muted",
												children: "Review"
											})
										]
									}, it.slug))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTrack, { status: o.status })
							]
						}, o.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function ProgressTrack({ status }) {
	if (status === "cancelled") return null;
	const steps = [
		"pending",
		"confirmed",
		"shipped",
		"delivered"
	];
	const idx = steps.indexOf(status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-6 flex items-center gap-2",
		children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-[10px] uppercase tracking-widest ${i <= idx ? "text-foreground" : "text-muted-foreground"}`,
				children: s
			})]
		}, s))
	});
}
//#endregion
export { DashboardPage as component };
