import { r as __toESM } from "../_runtime.mjs";
import { i as QueryClientProvider, o as require_jsx_runtime, s as require_react, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { R as redirect, V as notFound, _ as Link, b as useRouter, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./server-BtAHFl4G.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { D as createSsrRpc, E as listProductsFn, i as productQueryOptions, l as adminMeFn, m as CartProvider, r as allProductsQueryOptions } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BoUir8eE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BiZfWJLP.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$16 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "JNS Furnishing — Curate. Customize. Comfort. | Luxury Home Furnishings" },
			{
				name: "description",
				content: "JNS Furnishing offers bespoke custom curtains, luxury bedding, sofa covers, designer cushions, and premium upholstery fabrics in Bangladesh."
			},
			{
				name: "author",
				content: "JNS Furnishing"
			},
			{
				property: "og:title",
				content: "JNS Furnishing — Curate. Customize. Comfort."
			},
			{
				property: "og:description",
				content: "Premium custom curtains, luxury bedding sets, sofa covers, and tailored upholstery fabrics designed for homes that inspire."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "JNS Furnishing — Curate. Customize. Comfort."
			},
			{
				name: "twitter:description",
				content: "Premium custom curtains, luxury bedding sets, sofa covers, and tailored upholstery fabrics in Bangladesh."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "alternate icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$16.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var productsQueryOptions$1 = queryOptions({
	queryKey: ["products"],
	queryFn: () => listProductsFn()
});
var listReviewsFn = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("bc58e14ad44d7dc951a49045e6c126bd4f0955beb165ac752e722903334d8a2b"));
var listReviewStatsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("b63a499be38f3c10b3356dd3224f90845b1c8211ef2b184c14f21ca4c9cd31d7"));
var submitReviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("85289c17ced516c28197eb4b0097312eaad974c77915f330de47b169c77def86"));
var $$splitComponentImporter$15 = () => import("./routes-BcRwlGvK.mjs");
var reviewStatsQueryOptions$1 = queryOptions({
	queryKey: ["review-stats"],
	queryFn: () => listReviewStatsFn(),
	staleTime: 6e4
});
var Route$15 = createFileRoute("/")({
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions$1);
		context.queryClient.ensureQueryData(reviewStatsQueryOptions$1);
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-CCvFcXNE.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "Our Story & Heritage — JNS Furnishing" }, {
		name: "description",
		content: "Learn the story behind JNS Furnishing — handcrafted luxury custom curtains, Belgian linen, Egyptian cotton bedding, and tailored upholstery in Bangladesh."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./auth-CEva0pYK.mjs");
var Route$13 = createFileRoute("/auth")({
	validateSearch: (s) => ({ redirect: typeof s.redirect === "string" ? s.redirect : void 0 }),
	head: () => ({ meta: [{ title: "Sign In & Client Access — JNS Furnishing" }, {
		name: "description",
		content: "Sign in to your JNS Furnishing account to track custom curtain orders and manage your saved bespoke furnishings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./checkout-C0ljIsX3.mjs");
var Route$12 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "Checkout & Order Details — JNS Furnishing" },
		{
			name: "description",
			content: "Complete your bespoke home furnishing order with Cash on Delivery and bKash in Bangladesh."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./contact-DZB2ceWv.mjs");
var Route$11 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact & Showroom Concierge — JNS Furnishing" }, {
		name: "description",
		content: "Visit our Dhaka studio or connect with our drapery consultation team for window measurements and custom orders."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./custom-7nXGvLwL.mjs");
var Route$10 = createFileRoute("/custom")({
	head: () => ({ meta: [{ title: "Custom Sizing & Bespoke Window Concierge — JNS Furnishing" }, {
		name: "description",
		content: "Design and order bespoke custom curtains tailored to your exact window height and width. Doorstep measurements in Dhaka."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./dashboard-B-kSkl5F.mjs");
var Route$9 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "My Orders & Client Account — JNS Furnishing" },
		{
			name: "description",
			content: "Manage your JNS bespoke orders, reviews, and delivery status."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./journal-7M8LJ7Ps.mjs");
var Route$8 = createFileRoute("/journal")({
	head: () => ({ meta: [
		{ title: "Journal — Khidmah" },
		{
			name: "description",
			content: "Notes on fragrance, craft, and ritual from the Khidmah studio."
		},
		{
			property: "og:title",
			content: "Journal — Khidmah"
		},
		{
			property: "og:description",
			content: "Notes on fragrance, craft, and ritual from the Khidmah studio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./login-Bka5e_fD.mjs");
var Route$7 = createFileRoute("/login")({
	validateSearch: (s) => ({ redirect: typeof s.redirect === "string" ? s.redirect : void 0 }),
	head: () => ({ meta: [{ title: "Login — Sanvogue" }, {
		name: "description",
		content: "Log in to your Sanvogue account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./lookbook-DXCDcN6K.mjs");
var Route$6 = createFileRoute("/lookbook")({
	head: () => ({ meta: [{ title: "Lookbook & Inspired Spaces — JNS Furnishing" }, {
		name: "description",
		content: "Explore the JNS Furnishing editorial lookbook featuring bespoke residential, penthouse, and villa interiors in Dhaka."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var productsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => listProductsFn()
});
var $$splitComponentImporter$5 = () => import("./shop-D2N3V9i9.mjs");
var reviewStatsQueryOptions = queryOptions({
	queryKey: ["review-stats"],
	queryFn: () => listReviewStatsFn(),
	staleTime: 6e4
});
var Route$5 = createFileRoute("/shop")({
	validateSearch: (search) => {
		return {
			category: search.category || "all",
			room: search.room || ""
		};
	},
	head: () => ({ meta: [
		{ title: "Catalog & Collections — JNS Furnishing" },
		{
			name: "description",
			content: "Explore the complete JNS Furnishing collection — bespoke curtains, Egyptian cotton bedding, stretch sofa covers, and luxury upholstery fabrics."
		},
		{
			property: "og:title",
			content: "Catalog & Collections — JNS Furnishing"
		},
		{
			property: "og:description",
			content: "Explore bespoke curtains, Egyptian cotton bedding, stretch sofa covers, and luxury upholstery fabrics in Bangladesh."
		}
	] }),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQueryOptions);
		context.queryClient.ensureQueryData(reviewStatsQueryOptions);
	},
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./track-DaNkTxYz.mjs");
var Route$4 = createFileRoute("/track")({
	head: () => ({ meta: [{ title: "Track Your Order — JNS Furnishing" }, {
		name: "description",
		content: "Track your live custom curtain, bedding, or sofa cover order progress in real-time."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./trade-D7g7tV6X.mjs");
var Route$3 = createFileRoute("/trade")({
	head: () => ({ meta: [{ title: "JNS Pro / Trade Program for Interior Designers & Architects" }, {
		name: "description",
		content: "Exclusive wholesale trade pricing, bespoke manufacturing, and commercial project support for interior designers, architects, and hospitality in Bangladesh."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.index-XT6M79ZI.mjs");
var Route$2 = createFileRoute("/admin/")({
	head: () => ({ meta: [{ title: "Admin Portal — JNS Furnishing" }, {
		name: "robots",
		content: "noindex"
	}] }),
	loader: async () => {
		const me = await adminMeFn();
		if (!me.username) throw redirect({ to: "/admin/login" });
		return { username: me.username };
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.login-D0U3rMPa.mjs");
var Route$1 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Login — JNS Furnishing" }, {
		name: "robots",
		content: "noindex"
	}] }),
	loader: async () => {
		try {
			if ((await adminMeFn())?.username) throw redirect({ to: "/admin" });
		} catch (err) {
			if (err?.isRedirect || err && typeof err === "object" && "to" in err) throw err;
			return null;
		}
		return null;
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./product._slug-WwiemO3O.mjs");
var $$splitErrorComponentImporter = () => import("./product._slug-CH6f3pia.mjs");
var $$splitNotFoundComponentImporter = () => import("./product._slug-Do6lmkNi.mjs");
var Route = createFileRoute("/product/$slug")({
	loader: async ({ params, context }) => {
		if (!await context.queryClient.ensureQueryData(productQueryOptions(params.slug))) throw notFound();
		context.queryClient.ensureQueryData(allProductsQueryOptions);
	},
	head: ({ params }) => ({ meta: [{ title: `${params.slug} — JNS Furnishing` }, {
		property: "og:title",
		content: `${params.slug} — JNS Furnishing`
	}] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$16
});
var AuthRoute = Route$13.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$16
});
var CheckoutRoute = Route$12.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$16
});
var ContactRoute = Route$11.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$16
});
var CustomRoute = Route$10.update({
	id: "/custom",
	path: "/custom",
	getParentRoute: () => Route$16
});
var DashboardRoute = Route$9.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$16
});
var JournalRoute = Route$8.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var LookbookRoute = Route$6.update({
	id: "/lookbook",
	path: "/lookbook",
	getParentRoute: () => Route$16
});
var ShopRoute = Route$5.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$16
});
var TrackRoute = Route$4.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => Route$16
});
var TradeRoute = Route$3.update({
	id: "/trade",
	path: "/trade",
	getParentRoute: () => Route$16
});
var AdminIndexRoute = Route$2.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$16
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AuthRoute,
	CheckoutRoute,
	ContactRoute,
	CustomRoute,
	DashboardRoute,
	JournalRoute,
	LoginRoute,
	LookbookRoute,
	ShopRoute,
	TrackRoute,
	TradeRoute,
	AdminLoginRoute: Route$1.update({
		id: "/admin/login",
		path: "/admin/login",
		getParentRoute: () => Route$16
	}),
	ProductSlugRoute: Route.update({
		id: "/product/$slug",
		path: "/product/$slug",
		getParentRoute: () => Route$16
	}),
	AdminIndexRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var sanvogue_logo_png_asset_default = {
	asset_id: "8825d7ae-e863-4703-9d12-aa02150cc897",
	content_type: "image/png",
	created_at: "2026-07-07T13:20:20Z",
	original_filename: "sanvogue-logo.png",
	project_id: "37d2c85d-b704-4777-a47b-31ab42c04553",
	r2_key: "a/v1/37d2c85d-b704-4777-a47b-31ab42c04553/8825d7ae-e863-4703-9d12-aa02150cc897/sanvogue-logo.png",
	size: 9374,
	url: "/__l5e/assets-v1/8825d7ae-e863-4703-9d12-aa02150cc897/sanvogue-logo.png",
	version: 1
};
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: sanvogue_logo_png_asset_default.url,
					alt: "Sanvogue",
					className: "h-10 w-auto animate-pulse object-contain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loading-bar h-full w-1/3 rounded-full bg-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[10px] uppercase tracking-[0.35em] text-muted-foreground",
					children: "Curating your vogue"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes sanvogue-slide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(420%); }
        }
        .loading-bar { animation: sanvogue-slide 1.1s ease-in-out infinite; }
      ` })]
	});
}
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: LoadingScreen,
		defaultPendingMs: 200,
		defaultPendingMinMs: 400
	});
};
//#endregion
export { listReviewsFn as a, router_exports as c, listReviewStatsFn as i, submitReviewFn as l, Route$2 as n, productsQueryOptions as o, getRouter as r, productsQueryOptions$1 as s, Route as t };
