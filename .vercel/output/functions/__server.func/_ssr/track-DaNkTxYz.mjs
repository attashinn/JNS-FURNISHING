import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { S as Phone, V as CircleCheck, h as Scissors, m as Search, r as Truck, w as Package } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
import { i as trackOrderFn } from "./orders.functions-DQfHp6Jg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-DaNkTxYz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrackOrderPage() {
	const track = useServerFn(trackOrderFn);
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [order, setOrder] = (0, import_react.useState)(null);
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const handleSearch = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;
		setLoading(true);
		setError(null);
		setSearched(true);
		try {
			const res = await track({ data: { query: query.trim() } });
			setOrder(res);
		} catch (err) {
			setError(err?.message || "Failed to search order");
			setOrder(null);
		} finally {
			setLoading(false);
		}
	};
	const getStepIndex = (status) => {
		switch (status) {
			case "pending": return 0;
			case "confirmed": return 1;
			case "shipped": return 2;
			case "delivered": return 3;
			case "cancelled": return -1;
			default: return 0;
		}
	};
	const steps = [
		{
			title: "Order Confirmed",
			desc: "Tailoring details & fit verified",
			icon: CircleCheck
		},
		{
			title: "Atelier Tailoring",
			desc: "Fabric cut & pleated by master craftsmen",
			icon: Scissors
		},
		{
			title: "Out for Delivery",
			desc: "Courier dispatched for doorstep fitting",
			icon: Truck
		},
		{
			title: "Delivered & Inspected",
			desc: "Completed with 7-day fit warranty",
			icon: Package
		}
	];
	const currentStep = order ? getStepIndex(order.status) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-4xl px-4 py-8 sm:py-14 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-xl mx-auto space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]",
								children: "Real-Time Concierge Tracking"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl sm:text-4xl font-extrabold text-[#141715]",
								children: "Track Your Furnishing Order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs sm:text-sm text-[#7A766F] leading-relaxed",
								children: [
									"Enter your order reference number (e.g. ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-[#141715]",
										children: "SV-260828-..."
									}),
									") or phone number to see live tailoring and delivery status."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSearch,
						className: "mt-6 sm:mt-8 max-w-lg mx-auto flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A766F]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "e.g. SV-260828-1943 or 01700-000000",
								required: true,
								className: "w-full rounded-sm border border-[#E8E2D8] bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#141715] shadow-xs"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: loading,
							className: "rounded-sm bg-[#141715] px-5 sm:px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all disabled:opacity-60 cursor-pointer shrink-0",
							children: loading ? "Tracking..." : "Track Status"
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 max-w-lg mx-auto rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium text-center",
						children: error
					}),
					searched && !loading && !order && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-sm sm:rounded-md border border-dashed border-[#E8E2D8] bg-white p-8 sm:p-12 text-center max-w-lg mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-10 w-10 text-[#7A766F] mx-auto mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-[#141715]",
								children: "No order found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[#7A766F] mt-1",
								children: [
									"We couldn't locate an order matching \"",
									query,
									"\". Please check the reference number from your confirmation SMS or call our concierge."
								]
							})
						]
					}),
					order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 sm:mt-10 rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-5 sm:p-8 shadow-sm space-y-8 animate-in fade-in-0 duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-[#7A766F] uppercase tracking-wider font-bold",
										children: "Order Number:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-sm sm:text-base font-extrabold text-[#141715]",
										children: order.order_number
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[#7A766F] mt-1",
									children: [
										"Placed on ",
										new Date(order.created_at).toLocaleDateString("en-GB", {
											day: "numeric",
											month: "short",
											year: "numeric"
										}),
										" · ",
										order.city
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-[#7A766F]",
										children: "Status:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-sm px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${order.status === "delivered" ? "bg-emerald-100 text-emerald-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : order.status === "shipped" ? "bg-blue-100 text-blue-800" : order.status === "confirmed" ? "bg-indigo-100 text-indigo-800" : "bg-amber-100 text-amber-800"}`,
										children: order.status.toUpperCase()
									})]
								})]
							}),
							order.status !== "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 md:grid-cols-4 gap-4 relative",
									children: steps.map((st, idx) => {
										const Icon = st.icon;
										const isDone = idx <= currentStep;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex flex-col items-center text-center space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all ${isDone ? "bg-[#141715] border-[#141715] text-white shadow-sm" : "bg-[#FAF9F6] border-[#E8E2D8] text-[#7A766F]"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-xs font-bold ${idx === currentStep ? "text-[#D4A25A]" : isDone ? "text-[#141715]" : "text-[#7A766F]"}`,
												children: st.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-[#7A766F] leading-tight mt-0.5 max-w-[140px] mx-auto",
												children: st.desc
											})] })]
										}, st.title);
									})
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-sm bg-red-50 border border-red-200 p-4 text-center text-xs text-red-700 font-medium",
								children: "This order was marked as cancelled. Please contact our support if you believe this was in error."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-[#E8E2D8] pt-6 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-[#141715] uppercase tracking-wider",
									children: "Itemized Furnishings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-[#E8E2D8] rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4",
									children: order.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: it.img,
												alt: it.name,
												className: "h-10 w-10 rounded-sm object-cover bg-white"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-[#141715]",
												children: it.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-[#7A766F]",
												children: ["Quantity: ", it.qty]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-extrabold text-[#141715]",
											children: ["৳", (it.price * it.qty).toLocaleString("en-BD")]
										})]
									}, it.slug))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E8E2D8] pt-6 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-[#7A766F]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[#141715] uppercase tracking-wider block",
											children: "Delivery Recipient"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-[#141715]",
											children: order.customer_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.phone }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[#141715] font-medium leading-relaxed",
											children: [
												"📍 ",
												order.address,
												", ",
												order.city
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 sm:text-right text-[#7A766F]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between sm:justify-end gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment Mode:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-[#141715] uppercase",
											children: "Cash on Delivery / bKash"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between sm:justify-end gap-4 text-sm font-bold pt-1 border-t sm:border-t-0 border-[#E8E2D8]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#141715]",
											children: "Total Payable:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-lg font-extrabold text-[#141715]",
											children: ["৳", Number(order.total).toLocaleString("en-BD")]
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-sm bg-[#F4EFEA] border border-[#E8E2D8] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[#141715] font-medium",
										children: "Need to modify window measurements or change delivery timing?"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://wa.me/8801700000000?text=Hi%20JNS%20Furnishing,%20I%20would%20like%20to%20inquire%20about%20my%20order",
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-sm bg-[#141715] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors shrink-0",
									children: "Chat on WhatsApp ↗"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { TrackOrderPage as component };
