import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Sparkles, d as ShoppingBag } from "../_libs/lucide-react.mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook-DXCDcN6K.js
var import_jsx_runtime = require_jsx_runtime();
var LOOKBOOK_ITEMS = [
	{
		title: "The Warm Neutral Living Gallery",
		location: "Gulshan-2 Penthouse",
		description: "Floor-to-ceiling Belgian flax linen sheers layered with custom blackout drapes in Oatmeal Beige. Accented with bouclé sofa slipcovers and jewel-tone velvet cushion trios.",
		img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
		products: [
			{
				name: "Belgian Linen Sheer Curtain",
				link: "/shop"
			},
			{
				name: "Nordic Bouclé Sofa Cover",
				link: "/shop"
			},
			{
				name: "Velvet Cushion Trio",
				link: "/shop"
			}
		]
	},
	{
		title: "Sanctuary Master Suite",
		location: "Banani Residence",
		description: "A calming oasis styled with 400TC long-staple Egyptian cotton bedding, quilted sateen bedcovers, and double pinch pleat blackout drapery for deep restful sleep.",
		img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85",
		products: [
			{
				name: "400TC Egyptian Cotton Bedding Set",
				link: "/shop"
			},
			{
				name: "Heritage Quilted Bedcover",
				link: "/shop"
			},
			{
				name: "Luxury Blackout Curtain",
				link: "/shop"
			}
		]
	},
	{
		title: "Architectural Formal Dining Hall",
		location: "Baridhara Diplomatic Enclave",
		description: "Grand damask jacquard drapes with brushed brass eyelets paired with raw slub linen embroidered runners on a 10-seater walnut table.",
		img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=85",
		products: [{
			name: "Artisan Damask Jacquard Curtain",
			link: "/shop"
		}, {
			name: "Raw Linen Table Runner",
			link: "/shop"
		}]
	},
	{
		title: "Executive Home Studio & Library",
		location: "Dhanmondi Modern Villa",
		description: "Acoustically lined heavyweight velvet drapes in Forest Olive, dampening ambient street sound and infusing an intellectual, timeless atmosphere.",
		img: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1400&q=85",
		products: [{
			name: "Royal Velvet Insulated Drape",
			link: "/shop"
		}, {
			name: "Commercial Upholstery Fabric",
			link: "/shop"
		}]
	}
];
function LookbookPage() {
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#D4A25A]" }), " Volume IV · Curated Spaces"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-4xl sm:text-6xl font-normal text-[#FAF9F6]",
							children: "The JNS Lookbook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light",
							children: "A visual anthology of curated homes, villas, and suites styled exclusively with JNS custom drapes, bedding sets, and tactile furnishings."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl space-y-24",
					children: LOOKBOOK_ITEMS.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#F4EFE6] shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.img,
									alt: item.title,
									className: "h-full w-full object-cover transition-transform duration-700 hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold text-[#D4A25A] uppercase tracking-wider",
									children: item.location
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `lg:col-span-5 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-xs font-bold text-[#D4A25A]",
									children: ["SPACE 0", idx + 1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A]",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground leading-relaxed",
									children: item.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 border-t border-[#E8E2D8]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wider text-[#2E473A] mb-3",
										children: "Featured in this Space:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-2",
										children: item.products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: p.link,
											className: "inline-flex items-center gap-1.5 rounded-full border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-[#D4A25A] hover:text-[#D4A25A] transition-colors",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3 w-3 text-[#D4A25A]" }),
												" ",
												p.name
											]
										}, p.name))
									})]
								})
							]
						})]
					}, item.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#2E473A] text-white py-16 px-6 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-3xl sm:text-4xl font-bold",
							children: "Inspired to Reimagine Your Space?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white/80",
							children: "Book a complimentary fabric swatch kit or window measurement consultation with our design atelier."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex justify-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/custom",
								className: "rounded-full bg-[#D4A25A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#E5BE78]",
								children: "Start Custom Sizing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "rounded-full border border-white/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-[#1A1A1A]",
								children: "Contact Atelier"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { LookbookPage as component };
