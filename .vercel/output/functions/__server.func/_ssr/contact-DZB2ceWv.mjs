import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { B as Clock, D as MapPin, O as Mail, S as Phone, Y as ArrowRight, c as Sparkles } from "../_libs/lucide-react.mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DZB2ceWv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		message: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#1A1A1A] text-white py-16 px-6 lg:px-8 border-b border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]",
							children: "Connect with JNS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-4xl sm:text-5xl font-normal text-[#FAF9F6]",
							children: "Showroom & Consultations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white/80 max-w-xl mx-auto",
							children: "Book an in-person fabric consultation at our studio or request doorstep measurements for your home in Dhaka."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-widest text-[#D4A25A]",
								children: "Client Services"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-3xl font-bold text-[#1A1A1A] mt-1",
								children: "We're Here to Help"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mt-2 leading-relaxed",
								children: "Whether you have questions about fabric durability, curtain hardware compatibility, or placing bulk hospitality orders, our textile specialists are at your disposal."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-xs sm:text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: "Dhaka Showroom & Studio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-0.5",
										children: "House 42, Road 11, Block D, Banani / Gulshan-2, Dhaka 1213, Bangladesh"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: "Hotline & WhatsApp Consultation"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-0.5",
										children: "+880 1700-000000 · +880 1800-000000"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: "Email Inquiries"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-0.5",
										children: "concierge@jnsfurnishing.com · trade@jnsfurnishing.com"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground",
										children: "Showroom Hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground mt-0.5",
										children: "Saturday – Thursday: 10:00 AM – 8:30 PM (Friday by appointment)"
									})] })]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-[#E8E2D8] bg-white p-8 shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl font-bold text-[#1A1A1A]",
								children: "Send a Message"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1 mb-6",
								children: "Our concierge team typically responds within 2 hours."
							}),
							sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-[#2E473A] p-8 text-center text-white space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-[#D4A25A] mx-auto" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-serif text-xl font-bold",
										children: "Message Sent Successfully"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#EADCC8]",
										children: "Thank you for reaching out. A JNS textile specialist will contact you shortly."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-foreground",
										children: "Your Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										placeholder: "e.g. Tanzim Ahmed",
										value: formData.name,
										onChange: (e) => setFormData({
											...formData,
											name: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Email Address *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											type: "email",
											placeholder: "tanzim@example.com",
											value: formData.email,
											onChange: (e) => setFormData({
												...formData,
												email: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-foreground",
											children: "Phone / WhatsApp"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											placeholder: "+880 1700-000000",
											value: formData.phone,
											onChange: (e) => setFormData({
												...formData,
												phone: e.target.value
											}),
											className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-foreground",
										children: "How can we assist you? *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										required: true,
										rows: 4,
										placeholder: "Tell us about your window sizes, fabric questions, or showroom visit preferences...",
										value: formData.message,
										onChange: (e) => setFormData({
											...formData,
											message: e.target.value
										}),
										className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all shadow-md",
										children: ["Send Inquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ContactPage as component };
