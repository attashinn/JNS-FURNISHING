import { r as __toESM } from "../_runtime.mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, y as useSearch } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Heart, H as ChevronRight, W as Check, c as Sparkles, d as ShoppingBag, l as SlidersHorizontal, m as Search, t as X, y as RotateCcw } from "../_libs/lucide-react.mjs";
import { S as useCart, b as parsePriceNumber, g as SiteHeader, h as SiteFooter, v as formatPriceBDT } from "./router-BoUir8eE.mjs";
import { o as productsQueryOptions } from "./router-BoUir8eE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-D2N3V9i9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const { addItem } = useCart();
	const [isSaved, setIsSaved] = (0, import_react.useState)(false);
	const handleAdd = (e) => {
		e.preventDefault();
		addItem(p, 1);
	};
	const handleSave = (e) => {
		e.preventDefault();
		setIsSaved(!isSaved);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative flex flex-col text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/product/$slug",
			params: { slug: p.slug },
			className: "block overflow-hidden relative rounded-sm sm:rounded-md border border-[#E8E2D8]/80 bg-[#F3EFEA]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/4] w-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p.img || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
						alt: p.name,
						loading: "lazy",
						onError: (e) => {
							const target = e.currentTarget;
							target.src = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
						},
						className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					}),
					p.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute left-2 top-2 sm:left-3 sm:top-3 bg-[#141715] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white rounded-xs",
						children: p.tag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Save to Wishlist",
						onClick: handleSave,
						className: `absolute right-2 top-2 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/95 text-foreground shadow-xs transition-all hover:scale-110 ${isSaved ? "text-red-500 fill-red-500" : "text-[#7A766F] hover:text-[#141715]"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: `h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSaved ? "fill-current" : ""}`,
							strokeWidth: 1.5
						})
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-2.5 sm:pt-3.5 space-y-1 sm:space-y-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/product/$slug",
					params: { slug: p.slug },
					className: "block font-bold text-xs sm:text-base text-[#141715] hover:text-[#D4A25A] transition-colors leading-snug line-clamp-1",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] sm:text-[13px] text-[#7A766F] line-clamp-1",
					children: p.notes || `${p.brand} · ${p.category}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm sm:text-lg font-extrabold text-[#141715]",
						children: formatPriceBDT(p.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleAdd,
						className: "flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#141715] text-white hover:bg-[#2E473A] transition-colors cursor-pointer",
						title: "Add to Bag",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" })
					})]
				})
			]
		})]
	});
}
function Shop() {
	const searchParams = useSearch({ from: "/shop" });
	const { data: products } = useSuspenseQuery(productsQueryOptions);
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(searchParams.category || "all");
	const [selectedMaterial, setSelectedMaterial] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("featured");
	const [mobileFilterOpen, setMobileFilterOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (searchParams.category) setSelectedCategory(searchParams.category);
	}, [searchParams.category]);
	const categories = [
		{
			key: "all",
			label: "All Textiles"
		},
		{
			key: "fragrance",
			label: "Curtains & Drapery"
		},
		{
			key: "body",
			label: "Bedding & Linens"
		},
		{
			key: "skin",
			label: "Sofa Covers & Living"
		},
		{
			key: "hair",
			label: "Table Linen & Fabrics"
		}
	];
	const materials = [
		{
			key: "all",
			label: "All Materials"
		},
		{
			key: "blackout",
			label: "100% Blackout Weave"
		},
		{
			key: "linen",
			label: "Belgian Flax Linen"
		},
		{
			key: "cotton",
			label: "Egyptian Cotton"
		},
		{
			key: "velvet",
			label: "Plush Velvet"
		},
		{
			key: "jacquard",
			label: "Stretch Jacquard"
		}
	];
	const filteredProducts = (0, import_react.useMemo)(() => {
		let list = [...products];
		if (selectedCategory !== "all") list = list.filter((p) => p.category === selectedCategory);
		if (selectedMaterial !== "all") {
			const q = selectedMaterial.toLowerCase();
			list = list.filter((p) => p.notes.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q));
		}
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter((p) => p.name.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
		}
		if (sortBy === "price-asc") list.sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price));
		else if (sortBy === "price-desc") list.sort((a, b) => parsePriceNumber(b.price) - parsePriceNumber(a.price));
		return list;
	}, [
		products,
		selectedCategory,
		selectedMaterial,
		searchQuery,
		sortBy
	]);
	const resetFilters = () => {
		setSelectedCategory("all");
		setSelectedMaterial("all");
		setSearchQuery("");
		setSortBy("featured");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-[#E8E2D8] bg-[#F4EFE6] py-12 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#2E473A] font-semibold",
								children: "Catalog"
							}),
							selectedCategory !== "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: categories.find((c) => c.key === selectedCategory)?.label
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-3xl sm:text-5xl font-medium text-[#1A1A1A]",
							children: "The Textile Showroom"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-xl",
							children: "Explore tailored blackout drapes, pure flax linen sheers, Egyptian cotton bed sets, and architectural upholstery textiles."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-white px-4 py-2 text-xs font-semibold text-[#2E473A] shadow-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#D4A25A]" }),
								" Showing ",
								filteredProducts.length,
								" Premium Items"
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-10 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 min-w-[240px] max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search by fabric, style, or name...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "w-full rounded-full border border-[#E8E2D8] bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
							}),
							searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchQuery(""),
								className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setMobileFilterOpen(true),
							className: "lg:hidden flex items-center gap-2 rounded-full border border-[#E8E2D8] bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-[#F4EFE6]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5 text-[#D4A25A]" }), " Filters"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground hidden sm:inline",
								children: "Sort:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sortBy,
								onChange: (e) => setSortBy(e.target.value),
								className: "rounded-full border border-[#E8E2D8] bg-white px-4 py-2 text-xs font-medium outline-none focus:border-[#D4A25A]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "featured",
										children: "Featured Curations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-asc",
										children: "Price: Low to High"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "price-desc",
										children: "Price: High to Low"
									})
								]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden lg:block space-y-8 pr-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider text-xs",
								children: "Categories"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-1",
								children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedCategory(c.key),
									className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedCategory === c.key ? "bg-[#2E473A] text-white font-semibold" : "text-foreground/80 hover:bg-[#F4EFE6]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label }), selectedCategory === c.key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })]
								}, c.key))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider text-xs",
								children: "Material & Texture"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-1",
								children: materials.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedMaterial(m.key),
									className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedMaterial === m.key ? "bg-[#2E473A] text-white font-semibold" : "text-foreground/80 hover:bg-[#F4EFE6]"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.label }), selectedMaterial === m.key && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })]
								}, m.key))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-[#D4A25A]/40 bg-[#2E473A] p-5 text-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase tracking-widest text-[#D4A25A]",
										children: "Bespoke Order"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-serif text-lg font-bold mt-1 text-[#FAF9F6]",
										children: "Need Custom Sizing?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-[#EADCC8] leading-relaxed",
										children: "Use our interactive curtain calculator to tailor drapes to your exact window specifications."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/custom",
										className: "mt-4 block text-center rounded-full bg-[#D4A25A] py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5BE78]",
										children: "Launch Calculator"
									})
								]
							}),
							(selectedCategory !== "all" || selectedMaterial !== "all" || searchQuery) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: resetFilters,
								className: "flex items-center justify-center gap-2 w-full rounded-full border border-[#E8E2D8] bg-white py-2 text-xs font-semibold text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset All Filters"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-3",
						children: filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-dashed border-[#E8E2D8] bg-white p-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-10 w-10 text-muted-foreground mx-auto" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-xl font-semibold mt-3 text-foreground",
									children: "No matching furnishings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1 max-w-sm mx-auto",
									children: "Try relaxing your search terms or resetting filters to explore our full collection."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: resetFilters,
									className: "mt-4 inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-6 py-2 text-xs font-semibold text-white",
									children: "Reset Filters"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8",
							children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
						})
					})]
				})]
			}),
			mobileFilterOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md max-h-[80vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#E8E2D8] bg-[#FAF9F6] p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-[#E8E2D8] pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-lg font-bold text-foreground",
							children: "Filter Catalog"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMobileFilterOpen(false),
							className: "flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D8]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-[#D4A25A]",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedCategory(c.key),
									className: `rounded-xl border px-3 py-2 text-xs font-medium text-left ${selectedCategory === c.key ? "border-[#2E473A] bg-[#2E473A] text-white" : "border-[#E8E2D8] bg-white text-foreground"}`,
									children: c.label
								}, c.key))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-[#D4A25A]",
								children: "Material"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: materials.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedMaterial(m.key),
									className: `rounded-xl border px-3 py-2 text-xs font-medium text-left ${selectedMaterial === m.key ? "border-[#2E473A] bg-[#2E473A] text-white" : "border-[#E8E2D8] bg-white text-foreground"}`,
									children: m.label
								}, m.key))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-4 border-t border-[#E8E2D8]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: resetFilters,
									className: "flex-1 rounded-full border border-[#E8E2D8] py-2.5 text-xs font-semibold",
									children: "Reset"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setMobileFilterOpen(false),
									className: "flex-1 rounded-full bg-[#2E473A] py-2.5 text-xs font-bold text-white",
									children: "Apply Filters"
								})]
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
export { Shop as component };
