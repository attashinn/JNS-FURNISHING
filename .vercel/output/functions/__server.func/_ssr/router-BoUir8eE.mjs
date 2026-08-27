import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as useQuery, s as require_react, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-BtAHFl4G.mjs";
import { E as Menu, F as Heart, T as Minus, U as ChevronDown, Y as ArrowRight, a as Trash2, c as Sparkles, d as ShoppingBag, g as Scale, m as Search, n as User, t as X, u as ShoppingCart, x as Plus } from "../_libs/lucide-react.mjs";
import { c as router_exports } from "./router-BoUir8eE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-BgUWLNr9.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/products.functions-DR84L5ZB.js
var listProductsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("3286bd167303cb4653765a4a57e9277ea1ce96c5d9dc2eb9611a3fc9ab18f3e9"));
var getProductFn = createServerFn({ method: "GET" }).validator((data) => data).handler(createSsrRpc("83994b3dc3d81e585594f3bdd0a952d747bff42b8244d302b1e2cf8d320f88da"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-zo8GTtHh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "khidmah-cart";
function parsePrice(price) {
	if (typeof price === "number") return price;
	return Number(price.replace(/[^0-9.]/g, "")) || 0;
}
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setItems(JSON.parse(raw));
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}, [items, hydrated]);
	const addItem = (product, qty = 1) => {
		const price = parsePrice(product.price);
		setItems((prev) => {
			if (prev.find((i) => i.slug === product.slug)) return prev.map((i) => i.slug === product.slug ? {
				...i,
				qty: i.qty + qty
			} : i);
			return [...prev, {
				slug: product.slug,
				name: product.name,
				price,
				img: product.img,
				qty
			}];
		});
		setIsOpen(true);
	};
	const removeItem = (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug));
	const updateQty = (slug, qty) => {
		if (qty < 1) return removeItem(slug);
		setItems((prev) => prev.map((i) => i.slug === slug ? {
			...i,
			qty
		} : i));
	};
	const clearCart = () => setItems([]);
	const count = items.reduce((s, i) => s + i.qty, 0);
	const total = items.reduce((s, i) => s + i.price * i.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			items,
			count,
			total,
			addItem,
			removeItem,
			updateQty,
			clearCart,
			isOpen,
			setIsOpen
		},
		children
	});
}
function useCart() {
	const ctx = (0, import_react.useContext)(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
}
var requestCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("33288ab3ac3af4812eaf8ac9914515d31c4c2f704f0b4da20ef38b82f1a5b9b5"));
var loginRequestCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("3e63e072a0b8839911bc11c6fa7577b77a1ce5397713a75f66ac79222a13858c"));
var verifyCodeFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("1574a82b8357e6c7496cbf6545d99e0c565add31cd5b99c48064790d72bdff3d"));
var userMeFn = createServerFn({ method: "GET" }).handler(createSsrRpc("7be806595fad7f26c1805a5ee553f238291994fc3da0c21d3508576c17f7487f"));
var userLogoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("097d00c64bc0a53f72dab0f29882cf0cff2c8d42599693d283432de20d61cde3"));
function BrandLogo({ className = "", variant = "light", size = "md", withTagline = true }) {
	const isDarkBg = variant === "dark";
	const isGold = variant === "gold";
	const sizeClasses = {
		sm: {
			img: "h-7 sm:h-9",
			text: "text-sm sm:text-base tracking-[0.1em]",
			tag: "text-[7px] sm:text-[8px] tracking-[0.18em]"
		},
		md: {
			img: "h-8 sm:h-12",
			text: "text-sm sm:text-[21px] tracking-[0.1em] sm:tracking-[0.14em]",
			tag: "text-[7px] sm:text-[9.5px] tracking-[0.16em] sm:tracking-[0.22em]"
		},
		lg: {
			img: "h-11 sm:h-16",
			text: "text-lg sm:text-3xl tracking-[0.14em]",
			tag: "text-[9px] sm:text-[11px] tracking-[0.24em]"
		},
		xl: {
			img: "h-14 sm:h-20",
			text: "text-xl sm:text-4xl tracking-[0.16em]",
			tag: "text-[10px] sm:text-[13px] tracking-[0.28em]"
		}
	}[size];
	if (variant === "monogram-only") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/jns-logo.png",
		alt: "JNS",
		className: `${sizeClasses.img} w-auto object-contain ${className}`
	});
	const textColor = isDarkBg ? "text-[#FAF9F6]" : isGold ? "text-[#D4A25A]" : "text-[#141715]";
	const tagColor = isDarkBg ? "text-[#EADCC8]" : isGold ? "text-[#D4A25A]/90" : "text-[#7A766F]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-1.5 sm:gap-3.5 select-none ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/jns-logo.png",
			alt: "JNS Logo",
			className: `${sizeClasses.img} w-auto object-contain rounded-md shrink-0`,
			onError: (e) => {
				const target = e.currentTarget;
				target.style.display = "none";
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col text-left leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `font-extrabold ${textColor} ${sizeClasses.text} font-sans uppercase`,
				children: "JNS Furnishing"
			}), withTagline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `mt-0.5 sm:mt-1 font-semibold uppercase ${tagColor} ${sizeClasses.tag} font-sans truncate`,
				children: "Curate · Customize · Comfort"
			})]
		})]
	});
}
function formatPriceBDT(priceStr) {
	if (typeof priceStr === "number") return `৳${priceStr.toLocaleString("en-US")}`;
	const clean = String(priceStr).replace(/[^\d.]/g, "");
	const num = parseFloat(clean);
	if (isNaN(num)) return String(priceStr);
	return `৳${num.toLocaleString("en-US")}`;
}
function parsePriceNumber(priceStr) {
	if (typeof priceStr === "number") return priceStr;
	const clean = String(priceStr).replace(/[^\d.]/g, "");
	const num = parseFloat(clean);
	return isNaN(num) ? 0 : num;
}
function calculateCustomCurtainPrice({ widthInches, heightInches, fabricType = "blackout", lining = "standard", pleatStyle = "eyelet" }) {
	const areaSqFt = Math.max(24, widthInches) * Math.max(36, heightInches) / 144;
	const panels = Math.max(1, Math.ceil(widthInches / 48));
	const fabricMultiplier = {
		blackout: 120,
		linen: 105,
		velvet: 160,
		jacquard: 140
	};
	const liningExtra = {
		standard: 0,
		thermal: 350 * panels,
		blackout: 600 * panels
	};
	const pleatExtra = {
		eyelet: 200 * panels,
		"pinch-pleat": 450 * panels,
		"rod-pocket": 100 * panels,
		"wave-fold": 500 * panels
	};
	const fabricRate = fabricMultiplier[fabricType] ?? 120;
	const basePrice = Math.round(areaSqFt * fabricRate);
	const totalPrice = Math.round(basePrice + (liningExtra[lining] ?? 0) + (pleatExtra[pleatStyle] ?? 0));
	return {
		basePrice,
		totalPrice: Math.max(1600, totalPrice),
		panels,
		estimatedDays: "5 - 7 business days"
	};
}
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: `flex items-center transition-opacity hover:opacity-90 ${className}`,
		"aria-label": "JNS Furnishing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
			size: "md",
			variant: "light"
		})
	});
}
function UserAccountIcon() {
	const { data } = useQuery({
		queryKey: ["me"],
		queryFn: () => userMeFn(),
		staleTime: 3e4
	});
	const to = data?.user ? "/dashboard" : "/auth";
	const label = data?.user ? `Account: ${data.user.name}` : "Sign in";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		"aria-label": label,
		title: label,
		className: "relative flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
			className: "h-5 w-5",
			strokeWidth: 1.5
		}), data?.user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D4A25A] ring-2 ring-white" })]
	});
}
function InlineSearchBar() {
	const [term, setTerm] = (0, import_react.useState)("");
	const [isFocused, setIsFocused] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: () => listProductsFn()
	});
	(0, import_react.useEffect)(() => {
		function handleClickOutside(event) {
			if (containerRef.current && !containerRef.current.contains(event.target)) setIsFocused(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	const filtered = (products ?? []).filter((p) => {
		if (!term.trim()) return false;
		const q = term.toLowerCase();
		return p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q) || (p.description ?? "").toLowerCase().includes(q);
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (term.trim()) {
			setIsFocused(false);
			navigate({
				to: "/shop",
				search: {
					category: "all",
					room: term.trim()
				}
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "relative flex-1 max-w-xl mx-2 sm:mx-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "relative flex items-center w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute left-3.5 flex items-center text-[#7A766F]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "h-4 w-4",
						strokeWidth: 2
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					value: term,
					onChange: (e) => setTerm(e.target.value),
					onFocus: () => setIsFocused(true),
					placeholder: "Search curtains, bedding, sofa covers...",
					className: "h-10 w-full rounded-md bg-[#F4EFEA]/70 hover:bg-[#F4EFEA] focus:bg-white pl-10 pr-9 text-xs sm:text-[13px] font-medium text-[#141715] transition-all border border-[#E8E2D8] focus:border-[#141715] outline-none placeholder:text-[#8C887F]"
				}),
				term && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setTerm(""),
					className: "absolute right-3 flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[#7A766F] hover:bg-black/20 text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
				})
			]
		}), isFocused && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-0 top-full mt-1.5 w-full rounded-md border border-[#E8E2D8] bg-white p-4 shadow-xl z-50 animate-in fade-in-0 duration-100 text-left",
			children: term.trim() === "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold uppercase tracking-wider text-[#8C887F]",
					children: "Quick Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						{
							label: "Blackout Curtains",
							cat: "fragrance"
						},
						{
							label: "Belgian Linen",
							cat: "fragrance"
						},
						{
							label: "Egyptian Cotton Bedding",
							cat: "body"
						},
						{
							label: "Sofa Slipcovers",
							cat: "skin"
						},
						{
							label: "Custom Window Sizer",
							cat: "custom"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setIsFocused(false);
							if (s.cat === "custom") navigate({ to: "/custom" });
							else navigate({
								to: "/shop",
								search: { category: s.cat }
							});
						},
						className: "rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3 py-1 text-xs font-semibold text-[#141715] hover:border-[#141715] hover:bg-white transition-colors",
						children: s.label
					}, s.label))
				})]
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-5 text-center text-xs text-[#7A766F]",
				children: [
					"No products found matching “",
					term,
					"”."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1.5 max-h-72 overflow-y-auto pr-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-bold uppercase tracking-wider text-[#8C887F] pb-1",
						children: [
							"Products (",
							filtered.length,
							")"
						]
					}),
					filtered.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/product/$slug",
						params: { slug: item.slug },
						onClick: () => setIsFocused(false),
						className: "flex items-center gap-3 rounded-md p-2 hover:bg-[#FAF9F6] transition-colors border border-transparent hover:border-[#E8E2D8]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.img,
								alt: item.name,
								className: "h-11 w-11 rounded-sm object-cover bg-muted shrink-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs sm:text-[13px] font-bold text-[#141715] truncate",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#7A766F] truncate",
									children: item.notes || item.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-[#141715] shrink-0",
								children: formatPriceBDT(item.price)
							})
						]
					}, item.slug)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/shop",
						search: {
							category: "all",
							room: term
						},
						onClick: () => setIsFocused(false),
						className: "mt-2 flex items-center justify-center gap-1.5 rounded-sm bg-[#FAF9F6] border border-[#E8E2D8] py-2 text-xs font-bold text-[#141715] hover:bg-[#141715] hover:text-white transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View all search results" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
					})
				]
			})
		})]
	});
}
function CartDrawer() {
	const { items, total, isOpen, setIsOpen, updateQty, removeItem } = useCart();
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/60 backdrop-blur-xs",
			onClick: () => setIsOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative flex h-full w-full max-w-md flex-col justify-between border-l border-[#E8E2D8] bg-[#FAF9F6] p-6 sm:p-8 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-[#E8E2D8] pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-serif text-lg font-bold uppercase tracking-wider text-foreground",
						children: "Your Shopping Bag"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setIsOpen(false),
					className: "flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5",
					"aria-label": "Close cart",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-12 w-12 text-muted-foreground/40 stroke-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-lg font-medium text-foreground",
						children: "Your bag is currently empty"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground max-w-xs",
						children: "Explore our curated custom curtains, Egyptian bedding, and tailored living essentials."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						onClick: () => setIsOpen(false),
						className: "mt-6 rounded-full bg-[#1A1A1A] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#D4A25A] hover:text-[#1A1A1A] transition-colors",
						children: "Discover Catalog"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto py-4 space-y-3 pr-1",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 rounded-2xl border border-[#E8E2D8] bg-white p-3 shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: item.slug },
						onClick: () => setIsOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.img,
							alt: item.name,
							className: "h-18 w-18 rounded-xl object-cover bg-muted shrink-0"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-1 flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/product/$slug",
								params: { slug: item.slug },
								onClick: () => setIsOpen(false),
								className: "font-serif font-medium text-xs text-foreground hover:text-[#D4A25A] line-clamp-1",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeItem(item.slug),
								className: "text-muted-foreground hover:text-red-600 p-0.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-full border border-[#E8E2D8] bg-[#FAF9F6]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateQty(item.slug, item.qty - 1),
										className: "flex h-6 w-6 items-center justify-center text-foreground hover:bg-[#EFEBE4] rounded-l-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-2.5 w-2.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-6 text-center text-xs font-semibold",
										children: item.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateQty(item.slug, item.qty + 1),
										className: "flex h-6 w-6 items-center justify-center text-foreground hover:bg-[#EFEBE4] rounded-r-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-2.5 w-2.5" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-xs text-[#2E473A]",
								children: formatPriceBDT(item.price * item.qty)
							})]
						})]
					})]
				}, item.slug))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-[#E8E2D8] pt-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Subtotal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-xl font-bold text-[#2E473A]",
						children: formatPriceBDT(total)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					onClick: () => setIsOpen(false),
					className: "flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#2E473A] transition-all shadow-md",
					children: ["Proceed to Checkout ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
				})]
			})] })]
		})]
	});
}
function SiteHeader() {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [megaOpen, setMegaOpen] = (0, import_react.useState)(false);
	const { count, setIsOpen: setCartOpen } = useCart();
	const timerRef = (0, import_react.useRef)(null);
	const handleEnter = () => {
		if (timerRef.current) clearTimeout(timerRef.current);
		setMegaOpen(true);
	};
	const handleLeave = () => {
		timerRef.current = setTimeout(() => setMegaOpen(false), 200);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-[#141715] px-4 py-2 text-center text-[11px] font-medium tracking-[0.16em] text-[#FAF9F6] border-b border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-center gap-3 sm:gap-6 flex-wrap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-[#D4A25A] font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), "Free Nationwide Shipping Over ৳5,000"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline text-white/30",
						children: "•"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline text-[#EADCC8]",
						children: "Bespoke Window Sizing & Consultations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:inline text-white/30",
						children: "•"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden md:inline text-white/80",
						children: "Showroom: Banani / Gulshan, Dhaka"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-50 border-b border-[#E8E2D8]/80 bg-white/95 backdrop-blur-md transition-all shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)] w-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-[68px] sm:h-[84px] gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 sm:gap-6 xl:gap-9 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileOpen(true),
								className: "flex xl:hidden h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md text-[#1A1A1A] hover:bg-[#F4EFEA] active:scale-95 transition-all cursor-pointer",
								"aria-label": "Open menu",
								title: "Open menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden xl:flex items-center gap-6 text-[13.5px] font-medium tracking-[0.02em] text-[#1A1A1A]/90 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative py-2",
									onMouseEnter: handleEnter,
									onMouseLeave: handleLeave,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/shop",
										className: "flex items-center gap-1 font-semibold text-[#1A1A1A] transition-colors hover:text-[#D4A25A]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Products" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${megaOpen ? "rotate-180 text-[#D4A25A]" : ""}` })]
									}), megaOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute left-0 top-full mt-1 w-[800px] rounded-md border border-[#E8E2D8] bg-white p-6 shadow-xl z-50 animate-in fade-in-0 duration-100 text-left",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-4 gap-6",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider",
														children: "Curtains & Drapery"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "space-y-2 text-[12.5px] font-medium text-[#5A574F]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "fragrance" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Triple-Weave Blackout"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "fragrance" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Belgian Flax Linen Sheers"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "fragrance" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Turkish Plush Velvet"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "fragrance" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Artisan Damask Jacquard"
															}) })
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider",
														children: "Bedding & Linens"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "space-y-2 text-[12.5px] font-medium text-[#5A574F]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "body" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "400TC Egyptian Cotton"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "body" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "French Washed Linen Sets"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "body" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Quilted Luxury Bedcovers"
															}) })
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider",
														children: "Living & Covers"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "space-y-2 text-[12.5px] font-medium text-[#5A574F]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "skin" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Jacquard Sofa Slipcovers"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "skin" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Velvet Cushion Trios"
															}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/shop",
																search: { category: "hair" },
																className: "hover:text-[#141715] hover:font-bold transition-colors block",
																children: "Fabrics by Yard"
															}) })
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-4 flex flex-col justify-between space-y-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] uppercase tracking-wider text-[#8C887F] font-bold",
																children: "Dhaka Atelier"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "text-sm font-bold text-[#141715] leading-tight",
																children: "Doorstep Measurement"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-[#7A766F] leading-relaxed",
																children: "Book expert window sizing & swatch consultation in Dhaka."
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: "/custom",
														className: "inline-flex items-center justify-between rounded-sm bg-[#141715] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch Sizer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
													})]
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "py-2 transition-colors hover:text-[#D4A25A]",
									children: "Showroom"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/custom",
									className: "py-2 transition-colors hover:text-[#D4A25A]",
									children: "Custom Sizing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/track",
									className: "py-2 transition-colors hover:text-[#D4A25A] flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Track Order" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lookbook",
									className: "py-2 transition-colors hover:text-[#D4A25A]",
									children: "Lookbook"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex flex-1 justify-center max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSearchBar, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 sm:gap-2.5 shrink-0 pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserAccountIcon, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]",
								title: "Compare",
								"aria-label": "Compare",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
									className: "h-5 w-5",
									strokeWidth: 1.5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-0 right-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#1A1A1A] text-[9px] font-bold text-white shadow-xs",
									children: "0"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]",
								title: "Wishlist",
								"aria-label": "Wishlist",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "h-5 w-5",
									strokeWidth: 1.5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-0 right-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#1A1A1A] text-[9px] font-bold text-white shadow-xs",
									children: "0"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setCartOpen(true),
								className: "relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A] cursor-pointer",
								title: "Shopping Cart",
								"aria-label": "Shopping Cart",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
									className: "h-4.5 w-4.5 sm:h-5 sm:w-5",
									strokeWidth: 1.5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#141715] text-[9px] font-bold text-white shadow-xs",
									children: count
								})]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex md:hidden px-4 pb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineSearchBar, {})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
		mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity",
				onClick: () => setMobileOpen(false)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "relative flex h-full w-[85%] max-w-sm flex-col justify-between bg-white shadow-2xl z-10 overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-[#E8E2D8] pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMobileOpen(false),
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EFEA] text-[#141715] hover:bg-black/10 transition-colors",
								"aria-label": "Close menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#141715] text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4.5 w-4.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold text-[#141715]",
									children: "Welcome to JNS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#7A766F]",
									children: "Curate. Customize. Comfort."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								onClick: () => setMobileOpen(false),
								className: "rounded-xs bg-[#141715] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#D4A25A] hover:text-[#141715] transition-colors",
								children: "Sign In"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex flex-col space-y-1 text-[13.5px] font-bold text-[#141715] text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Home" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90 text-[#7A766F]" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/shop",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Products" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold text-[#D4A25A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs",
										children: "24 Items"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pl-3 py-1 space-y-1 border-l-2 border-[#E8E2D8] ml-2 text-xs font-semibold text-[#5A574F]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/shop",
											search: { category: "fragrance" },
											onClick: () => setMobileOpen(false),
											className: "block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs",
											children: "🪟 Curtains & Drapery"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/shop",
											search: { category: "body" },
											onClick: () => setMobileOpen(false),
											className: "block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs",
											children: "🛏️ Bedding & Linens"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/shop",
											search: { category: "skin" },
											onClick: () => setMobileOpen(false),
											className: "block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs",
											children: "🛋️ Sofa & Living Covers"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/custom",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between rounded-md bg-[#141715] p-3 text-white transition-all hover:bg-[#2E473A]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold",
											children: "Window Sizer Atelier"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-[#D4A25A]",
											children: "Calculate Yardage & Panels"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/track",
										onClick: () => setMobileOpen(false),
										className: "flex items-center justify-between rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3 text-[#141715] transition-all hover:bg-[#F4EFEA]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold",
											children: "Track Your Order"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-[#7A766F]",
											children: "Real-time tailoring & delivery"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-[#7A766F]" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/lookbook",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Editorial Lookbook" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90 text-[#7A766F]" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/trade",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Trade & B2B Concierge" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90 text-[#7A766F]" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/contact",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Banani Showroom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90 text-[#7A766F]" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/about",
									onClick: () => setMobileOpen(false),
									className: "flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "About JNS Atelier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90 text-[#7A766F]" })]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-[#E8E2D8] bg-[#FAF9F6] p-4 text-xs text-[#7A766F] space-y-2 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-[#141715]",
								children: "Dhaka Atelier Concierge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-bold text-[#2E473A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs",
								children: "Open 7 Days"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] leading-relaxed",
							children: "House 42, Road 11, Block D, Banani / Gulshan, Dhaka"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1 flex items-center justify-between text-xs font-bold text-[#141715]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hotline: +880 1700-000000" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#D4A25A]",
								children: "BDT ৳"
							})]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			"aria-label": "Drapery Concierge Support",
			className: "fixed bottom-4 sm:bottom-6 right-3.5 sm:right-6 z-40 flex flex-col items-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "https://wa.me/8801700000000?text=Hi%20JNS%20Furnishing,%20I%20would%20like%20to%20consult%20about%20custom%20curtain%20sizing",
				target: "_blank",
				rel: "noreferrer",
				className: "group flex items-center gap-2 rounded-full bg-[#141715] hover:bg-[#2E473A] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer",
				title: "Chat with Drapery Expert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "relative flex h-2.5 w-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-bold tracking-wide",
					children: "Drapery Concierge"
				})]
			})
		})
	] });
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-[#2A2E2B] bg-[#141715] text-[#FAF9F6] pt-12 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-12 text-left",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl space-y-10 sm:space-y-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3.5 sm:col-span-2 lg:col-span-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
								variant: "dark",
								size: "sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[#A8A49C] leading-relaxed max-w-sm font-medium",
								children: "Curate. Customize. Comfort. Bespoke custom drapery, organic Belgian linens, and hotel-grade furnishings crafted with master Dhaka artisans."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-1 flex items-center gap-3 text-xs font-bold text-[#D4A25A]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📍 Dhaka Atelier" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nationwide Delivery" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.12em] text-white",
							children: "Collections"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-[#A8A49C]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "fragrance" },
									className: "hover:text-white transition-colors block",
									children: "Blackout & Thermal Curtains"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "fragrance" },
									className: "hover:text-white transition-colors block",
									children: "Belgian Flax Linen Sheers"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "body" },
									className: "hover:text-white transition-colors block",
									children: "400TC Egyptian Cotton Bedding"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/shop",
									search: { category: "skin" },
									className: "hover:text-white transition-colors block",
									children: "Stretch Sofa Slipcovers"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/custom",
									className: "text-[#D4A25A] font-bold hover:underline transition-colors block",
									children: "Custom Window Sizer Atelier →"
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.12em] text-white",
							children: "Client Experience"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-[#A8A49C]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/lookbook",
									className: "hover:text-white transition-colors block",
									children: "Editorial Lookbook"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/trade",
									className: "hover:text-white transition-colors block",
									children: "Trade & B2B Concierge"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "hover:text-white transition-colors block",
									children: "Showroom & Consultations"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "hover:text-white transition-colors block",
									children: "Our Story & Craft"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/track",
									className: "hover:text-white transition-colors block",
									children: "Track Your Order"
								}) })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.12em] text-white",
							children: "Dhaka Atelier"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs text-[#A8A49C]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white font-medium",
									children: "House 42, Road 11, Block D, Banani / Gulshan, Dhaka"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Hotline: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-bold",
									children: "+880 1700-000000"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["WhatsApp: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#D4A25A] font-bold",
									children: "+880 1800-000000"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-[#7A766F]",
									children: "Open Sat – Thu: 10:00 AM – 8:30 PM"
								})
							]
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row items-center justify-between border-t border-[#2A2E2B] pt-6 text-[11px] text-[#7A766F] gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" JNS Furnishing Ltd. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A8A49C]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cash on Delivery" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "bKash / Nagad" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nationwide 64 Districts" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/login",
							className: "text-[#D4A25A] font-semibold hover:underline",
							title: "Admin Panel Login",
							children: "Admin Portal"
						})
					]
				})]
			})]
		})
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-SOfWhmjd.js
var adminMeFn = createServerFn({ method: "GET" }).handler(createSsrRpc("e8075f0118d2cb22610ab1f890f35e43f48699f0e9efdcf974c954c4adccec19"));
var adminLoginFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("c503d0ead8f8cb8790578898339bedbd75b8707f146ed203919b8582851fdb43"));
var adminLogoutFn = createServerFn({ method: "POST" }).handler(createSsrRpc("0fe875f17052d2dcfa21965b34346d2c1c87b3eea56dc5df1e14621fe7c94b9d"));
var uploadProductImageFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("46cca3f8b4839a8bbd07111581948924e6c76ce8894c39203079b0b7c341d4b9"));
var createProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ce37921f47cb506ad6c2ed9518afa04aa4ee39399d8595bc07fac7e53e633ccd"));
var updateProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("975f3c3d48bf5c6a73d73bb38c4dd74ec1cff065e9b9d7b7c091acb18e38876d"));
var deleteProductFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("ed022e7bacbd7594e4d86c62ca1d2ce41b6cf4e5645aafc87fc538b65011dc8e"));
var adminListReviewsFn = createServerFn({ method: "GET" }).handler(createSsrRpc("1df26427009c15b5b7f50c3eeced9aa850f93ec285e1874c3636b03c73bc48af"));
var adminDeleteReviewFn = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("68bfce8fbe265e156c0f6c852f3c396cab5b4049c54ee0ea82d538531fcfe65b"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-CBr-eq0y.js
var productQueryOptions = (slug) => queryOptions({
	queryKey: ["product", slug],
	queryFn: () => getProductFn({ data: { slug } })
});
var allProductsQueryOptions = queryOptions({
	queryKey: ["products"],
	queryFn: () => listProductsFn()
});
function ProductNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl px-6 py-32 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-serif text-4xl text-foreground",
						children: "Furnishing Not Found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "The item you are looking for may have been archived or moved."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white",
						children: "Back to Catalog"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { userLogoutFn as C, createSsrRpc as D, listProductsFn as E, useCart as S, verifyCodeFn as T, calculateCustomCurtainPrice as _, adminDeleteReviewFn as a, parsePriceNumber as b, adminLogoutFn as c, deleteProductFn as d, updateProductFn as f, SiteHeader as g, SiteFooter as h, productQueryOptions as i, adminMeFn as l, CartProvider as m, ProductNotFound as n, adminListReviewsFn as o, uploadProductImageFn as p, allProductsQueryOptions as r, adminLoginFn as s, router_exports as t, createProductFn as u, formatPriceBDT as v, userMeFn as w, requestCodeFn as x, loginRequestCodeFn as y };
