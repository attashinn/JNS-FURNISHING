import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { J as Award, K as Building2, N as House, P as Hotel, c as Sparkles, p as Send, q as Briefcase } from "../_libs/lucide-react.mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trade-D7g7tV6X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TradePage() {
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		company: "",
		email: "",
		phone: "",
		type: "Interior Designer",
		projectScope: ""
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#1A1A1A] text-white py-20 px-6 lg:px-8 border-b border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-[#D4A25A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5DFB3]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-[#D4A25A]" }), " JNS Pro Partnership"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-serif text-4xl sm:text-6xl font-normal text-[#FAF9F6]",
							children: [
								"Furnishing for Spaces ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "italic text-[#EADCC8]",
									children: "That Matter."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light",
							children: "Dedicated trade pricing, custom drapery manufacturing, and fabric concierge for interior designers, architects, luxury resorts, and corporate developers."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center max-w-xl mx-auto space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]",
							children: "The JNS Pro Advantage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl font-medium text-foreground",
							children: "Built for Design Professionals"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-6",
						children: [
							{
								title: "Tiered Trade Pricing",
								desc: "Up to 30% discount off standard retail pricing on fabrics, custom drapery, and bedding with no minimum order requirements.",
								icon: Award
							},
							{
								title: "Custom Atelier Production",
								desc: "Direct access to our Dhaka textile workshop for bespoke heights, specialty headers, motorized curtain tracks, and fire-retardant liners.",
								icon: Sparkles
							},
							{
								title: "Complimentary Swatch Books",
								desc: "Receive full-size textile sample books containing our Belgian linen, Turkish velvet, and blackout weave collections for client presentations.",
								icon: Briefcase
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-[#E8E2D8] bg-white p-8 space-y-4 shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E473A] text-[#D4A25A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-xl font-bold text-foreground",
									children: b.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: b.desc
								})
							]
						}, b.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#F4EFE6] py-20 px-6 lg:px-8 border-y border-[#E8E2D8]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
						children: [
							{
								name: "Residential Interiors",
								desc: "Turnkey luxury apartments & villas",
								icon: House
							},
							{
								name: "Hotels & Resorts",
								desc: "Bespoke blackout suites & bedding",
								icon: Hotel
							},
							{
								name: "Corporate Offices",
								desc: "Acoustic fabric wall panels & drapes",
								icon: Building2
							},
							{
								name: "Restaurants & Cafés",
								desc: "High-rub seating upholstery & curtains",
								icon: Sparkles
							}
						].map((sector) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-[#E8E2D8] bg-white p-6 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(sector.icon, { className: "h-6 w-6 text-[#2E473A]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-serif font-bold text-base text-foreground",
									children: sector.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: sector.desc
								})
							]
						}, sector.name))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl rounded-3xl border border-[#E8E2D8] bg-white p-8 sm:p-12 shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center space-y-2 mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]",
								children: "Membership Application"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-3xl font-bold text-foreground",
								children: "Apply for a Trade Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-muted-foreground",
								children: "Submit your studio or business credentials for approval within 24 hours."
							})
						]
					}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-[#2E473A] p-8 text-center text-white space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-[#D4A25A] mx-auto" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-2xl font-bold",
								children: "Application Received"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[#EADCC8] max-w-md mx-auto",
								children: "Thank you for applying to the JNS Pro Program. A trade concierge specialist will contact you shortly with your account activation and digital sample catalogs."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Full Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Architect Sarah Ahmed",
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Firm / Studio Name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Studio Arc Dhaka",
									value: formData.company,
									onChange: (e) => setFormData({
										...formData,
										company: e.target.value
									}),
									className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Email Address *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									required: true,
									placeholder: "sarah@studioarc.com",
									value: formData.email,
									onChange: (e) => setFormData({
										...formData,
										email: e.target.value
									}),
									className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Contact Phone / WhatsApp *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "tel",
									required: true,
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
								children: "Professional Discipline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.type,
								onChange: (e) => setFormData({
									...formData,
									type: e.target.value
								}),
								className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Interior Designer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Architectural Practice" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Hospitality / Hotel Developer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Real Estate Turnkey Stager" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "General Contractor" })
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-foreground",
								children: "Active Project Scope / Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								placeholder: "Tell us about your upcoming project location, estimated window count, or fabric yardage requirements...",
								value: formData.projectScope,
								onChange: (e) => setFormData({
									...formData,
									projectScope: e.target.value
								}),
								className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all shadow-md mt-2",
								children: ["Submit Trade Partner Application ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })]
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
export { TradePage as component };
