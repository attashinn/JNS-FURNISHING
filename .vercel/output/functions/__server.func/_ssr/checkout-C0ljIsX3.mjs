import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as CircleCheck, Y as ArrowRight, f as ShieldCheck, r as Truck } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { S as useCart, g as SiteHeader, h as SiteFooter, v as formatPriceBDT, w as userMeFn } from "./router-BoUir8eE.mjs";
import { r as placeOrderFn } from "./orders.functions-DQfHp6Jg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-C0ljIsX3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { items, total, clearCart, setIsOpen } = useCart();
	const placeOrder = useServerFn(placeOrderFn);
	const navigate = useNavigate();
	const { data: me, isLoading: meLoading } = useQuery({
		queryKey: ["me"],
		queryFn: () => userMeFn(),
		staleTime: 3e4
	});
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setHydrated(true);
		setIsOpen(false);
	}, [setIsOpen]);
	(0, import_react.useEffect)(() => {
		if (!meLoading && me && !me.user) navigate({
			to: "/auth",
			search: { redirect: "/checkout" }
		});
	}, [
		me,
		meLoading,
		navigate
	]);
	const [form, setForm] = (0, import_react.useState)({
		customer_name: me?.user?.name || "",
		phone: "",
		email: me?.user?.email || "",
		address: "",
		city: "Dhaka",
		notes: ""
	});
	(0, import_react.useEffect)(() => {
		if (me?.user) setForm((f) => ({
			...f,
			customer_name: f.customer_name || me.user.name,
			email: f.email || me.user.email
		}));
	}, [me]);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [confirmed, setConfirmed] = (0, import_react.useState)(null);
	async function handleSubmit(e) {
		e.preventDefault();
		if (items.length === 0) return;
		setSubmitting(true);
		setError(null);
		try {
			const res = await placeOrder({ data: {
				...form,
				items: items.map((i) => ({
					slug: i.slug,
					name: i.name,
					price: i.price,
					img: i.img,
					qty: i.qty
				}))
			} });
			setConfirmed({
				order_number: res.order_number,
				total: res.total
			});
			clearCart();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not place order");
		} finally {
			setSubmitting(false);
		}
	}
	if (confirmed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-2xl px-6 py-20 text-center space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2E473A] text-[#D4A25A]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-bold uppercase tracking-[0.3em] text-[#D4A25A]",
						children: "Order Confirmed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-4xl sm:text-5xl font-medium text-[#1A1A1A]",
						children: "Thank You for Your Order."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground max-w-md mx-auto leading-relaxed",
						children: "Your home furnishing order has been received. Our concierge team will contact you shortly on your phone to confirm tailoring and dispatch details."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-[#E8E2D8] bg-white p-8 text-left space-y-4 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[#E8E2D8] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Order Reference Number"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-base font-bold text-[#2E473A]",
									children: confirmed.order_number
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[#E8E2D8] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Payment Method"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-sm text-foreground",
									children: "Cash on Delivery / bKash at Doorstep"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Total Amount"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-serif text-2xl font-bold text-[#2E473A]",
									children: formatPriceBDT(confirmed.total)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-4 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127]",
							children: ["Continue Shopping ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-[#E8E2D8] pb-4 sm:pb-6 mb-6 sm:mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4A25A]",
						children: "Secure Checkout"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl sm:text-4xl font-extrabold text-[#141715] mt-1 leading-tight",
						children: "Complete Your Order"
					})]
				}), hydrated && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-md sm:rounded-lg border border-dashed border-[#E8E2D8] bg-white p-8 sm:p-12 text-center max-w-md mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base sm:text-lg font-bold text-[#141715]",
						children: "Your shopping bag is empty."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-5 inline-flex items-center gap-2 rounded-sm bg-[#141715] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors",
						children: "Browse Catalog"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 sm:gap-10 lg:grid-cols-[1fr_400px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-4 sm:p-7 space-y-5 sm:space-y-6 shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg sm:text-xl font-bold text-[#141715] leading-snug",
								children: "Delivery & Recipient Information"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11.5px] sm:text-xs text-[#7A766F] mt-0.5",
								children: "Please provide accurate contact details for courier dispatch."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3.5 sm:gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Full Name *",
										value: form.customer_name,
										onChange: (v) => setForm({
											...form,
											customer_name: v
										}),
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Contact Phone / WhatsApp *",
										value: form.phone,
										onChange: (v) => setForm({
											...form,
											phone: v
										}),
										placeholder: "+880 1700-000000",
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email Address *",
										type: "email",
										value: form.email,
										onChange: (v) => setForm({
											...form,
											email: v
										}),
										required: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "City / District *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.city,
										onChange: (e) => setForm({
											...form,
											city: e.target.value
										}),
										className: "mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Dhaka",
												children: "Dhaka City"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Chittagong",
												children: "Chittagong"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Sylhet",
												children: "Sylhet"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Rajshahi",
												children: "Rajshahi"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Khulna",
												children: "Khulna"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Barisal",
												children: "Barisal"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Rangpur",
												children: "Rangpur"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Mymensingh",
												children: "Mymensingh"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "Outside Dhaka",
												children: "Other Districts"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Detailed Delivery Address *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: form.address,
											onChange: (e) => setForm({
												...form,
												address: e.target.value
											}),
											required: true,
											rows: 3,
											className: "mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs outline-none focus:border-[#141715]",
											placeholder: "Apartment / House number, Road, Sector / Area..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Order Notes / Special Tailoring Instructions (Optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: form.notes,
											onChange: (e) => setForm({
												...form,
												notes: e.target.value
											}),
											rows: 2,
											className: "mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs outline-none focus:border-[#141715]",
											placeholder: "e.g. Ring eyelets in antique brass, leave with building reception..."
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base sm:text-lg font-bold text-[#141715]",
								children: "Payment Option"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 rounded-sm sm:rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 sm:p-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									checked: true,
									readOnly: true,
									className: "h-4 w-4 accent-[#141715]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-[#141715]",
									children: "Cash on Delivery & bKash / Nagad"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#7A766F] mt-0.5",
									children: "Pay conveniently upon delivery or via mobile banking when verified."
								})] })]
							})] }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: submitting || !hydrated,
								className: "w-full flex items-center justify-center gap-2 rounded-sm bg-[#141715] py-3.5 sm:py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all shadow-md disabled:opacity-60 cursor-pointer",
								children: [submitting ? "Processing Order..." : `Place Order · ${formatPriceBDT(total)}`, !submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-4 sm:p-6 space-y-5 h-fit shadow-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-base sm:text-lg font-bold text-[#141715]",
								children: "Your Selection"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-[#E8E2D8] max-h-96 overflow-y-auto pr-1",
								children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: i.img,
											alt: i.name,
											className: "h-12 w-12 rounded-sm object-cover bg-muted shrink-0"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-xs text-[#141715] truncate",
												children: i.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-[#7A766F]",
												children: ["Qty ", i.qty]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-xs text-[#141715]",
											children: formatPriceBDT(i.price * i.qty)
										})
									]
								}, i.slug))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-[#E8E2D8] pt-3.5 space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[#7A766F]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[#141715]",
											children: formatPriceBDT(total)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-[#7A766F]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-[#141715]",
											children: total >= 5e3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[#2E473A] font-bold",
												children: "Complimentary (Free)"
											}) : "Calculated upon dispatch"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between border-t border-[#E8E2D8] pt-2 text-sm font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#141715]",
											children: "Total:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xl font-extrabold text-[#141715]",
											children: formatPriceBDT(total)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-sm bg-[#FAF9F6] border border-[#E8E2D8] p-3 text-[11px] text-[#7A766F] space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% Quality Fabric Assured" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Doorstep Inspection on Delivery" })]
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "block text-xs font-semibold text-foreground",
		children
	});
}
function Field({ label, value, onChange, placeholder, required, type = "text" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		required,
		className: "mt-1.5 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
	})] });
}
//#endregion
export { CheckoutPage as component };
