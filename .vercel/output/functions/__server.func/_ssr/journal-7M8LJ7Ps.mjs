import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-7M8LJ7Ps.js
var import_jsx_runtime = require_jsx_runtime();
var posts = [
	{
		title: "The Art of Layering Scents",
		excerpt: "How to build a signature by pairing complementary notes.",
		img: "/assets/hero-BYDINIxM.jpg"
	},
	{
		title: "Inside the Oak Cellar",
		excerpt: "Six months of stillness before a fragrance is ready.",
		img: "/assets/driftwood-Bon9b8Od.jpg"
	},
	{
		title: "Notes from Marrakech",
		excerpt: "Sourcing rose absolute from the Ourika Valley.",
		img: "/assets/for-yourself-Du7EJBFo.jpg"
	}
];
function Journal() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-7xl px-6 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-muted-foreground",
						children: "Journal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl md:text-6xl",
						children: "Notes & Rituals"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-8 md:grid-cols-3",
						children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-2xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.img,
										alt: p.title,
										className: "h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105",
										loading: "lazy"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 font-display text-2xl leading-snug",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: p.excerpt
								})
							]
						}, p.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Journal as component };
