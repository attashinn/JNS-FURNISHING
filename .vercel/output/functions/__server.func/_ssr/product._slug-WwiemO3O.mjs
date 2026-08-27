import { r as __toESM } from "../_runtime.mjs";
import { a as useQueryClient, n as useSuspenseQuery, o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Pencil, F as Heart, H as ChevronRight, T as Minus, W as Check, c as Sparkles, d as ShoppingBag, f as ShieldCheck, j as Info, r as Truck, s as Star, v as Ruler, x as Plus, y as RotateCcw } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { S as useCart, _ as calculateCustomCurtainPrice, b as parsePriceNumber, g as SiteHeader, h as SiteFooter, i as productQueryOptions, n as ProductNotFound, r as allProductsQueryOptions, v as formatPriceBDT, w as userMeFn } from "./router-BoUir8eE.mjs";
import { a as listReviewsFn, l as submitReviewFn, t as Route } from "./router-BoUir8eE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-WwiemO3O.js
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
var COLOR_SWATCHES = [
	{
		name: "Oatmeal Beige",
		hex: "#E8DFC8"
	},
	{
		name: "Forest Olive",
		hex: "#3D4A3A"
	},
	{
		name: "Champagne Gold",
		hex: "#D4A25A"
	},
	{
		name: "Slate Charcoal",
		hex: "#2B2E2C"
	},
	{
		name: "Pure Ivory",
		hex: "#F7F5EE"
	}
];
var PLEAT_STYLES = [
	{
		id: "eyelet",
		name: "Eyelet (Grommet)",
		desc: "Modern wave fold on rod"
	},
	{
		id: "pinch-pleat",
		name: "Double Pinch Pleat",
		desc: "Classic tailored hotel drape"
	},
	{
		id: "wave-fold",
		name: "S-Fold Wave",
		desc: "Contemporary architectural fold"
	},
	{
		id: "rod-pocket",
		name: "Rod Pocket",
		desc: "Casual gathered style"
	}
];
function ProductPage() {
	const { slug } = Route.useParams();
	const { data: product } = useSuspenseQuery(productQueryOptions(slug));
	const { data: allProducts } = useSuspenseQuery(allProductsQueryOptions);
	const { addItem } = useCart();
	const queryClient = useQueryClient();
	const [qty, setQty] = (0, import_react.useState)(1);
	const [selectedColor, setSelectedColor] = (0, import_react.useState)(COLOR_SWATCHES[0].name);
	const [selectedPleat, setSelectedPleat] = (0, import_react.useState)("eyelet");
	const [isCustomMode, setIsCustomMode] = (0, import_react.useState)(false);
	const [customWidth, setCustomWidth] = (0, import_react.useState)(52);
	const [customHeight, setCustomHeight] = (0, import_react.useState)(84);
	const [added, setAdded] = (0, import_react.useState)(false);
	const [isSaved, setIsSaved] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("details");
	const [selectedImage, setSelectedImage] = (0, import_react.useState)(product?.img || "");
	(0, import_react.useEffect)(() => {
		if (product?.img) setSelectedImage(product.img);
	}, [product?.img]);
	const [showReviewModal, setShowReviewModal] = (0, import_react.useState)(false);
	const [reviewRating, setReviewRating] = (0, import_react.useState)(5);
	const [reviewTitle, setReviewTitle] = (0, import_react.useState)("");
	const [reviewBody, setReviewBody] = (0, import_react.useState)("");
	const [submittingReview, setSubmittingReview] = (0, import_react.useState)(false);
	const [reviewError, setReviewError] = (0, import_react.useState)("");
	const { data: userMe } = useQuery({
		queryKey: ["me"],
		queryFn: () => userMeFn()
	});
	const { data: reviews = [] } = useQuery({
		queryKey: ["reviews", slug],
		queryFn: () => listReviewsFn({ data: { slug } })
	});
	const submitReview = useServerFn(submitReviewFn);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductNotFound, {});
	const isCurtain = product.category === "fragrance" || product.slug.includes("curtain") || product.slug.includes("drape");
	const baseUnitPrice = parsePriceNumber(product.price);
	const uploadedGallery = Array.isArray(product.ugc_videos) ? product.ugc_videos.filter((s) => typeof s === "string" && s.trim().length > 0) : [];
	const galleryImages = [product.img, ...uploadedGallery.length > 0 ? uploadedGallery : ["https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"]].slice(0, 4);
	const customCalc = (0, import_react.useMemo)(() => {
		return calculateCustomCurtainPrice({
			widthInches: customWidth,
			heightInches: customHeight,
			pleatStyle: selectedPleat
		});
	}, [
		customWidth,
		customHeight,
		selectedPleat
	]);
	const effectiveUnitPrice = isCustomMode ? customCalc.totalPrice : baseUnitPrice;
	const totalPrice = effectiveUnitPrice * qty;
	const handleAddToCart = () => {
		isCustomMode ? `${customWidth}${customHeight}${selectedPleat}${selectedColor}` : `${selectedColor}${selectedPleat}`;
		const cartProduct = {
			...product,
			name: `${product.name} (${selectedColor})`,
			price: `৳${effectiveUnitPrice}`
		};
		addItem(cartProduct, qty);
		setAdded(true);
		setTimeout(() => setAdded(false), 2e3);
	};
	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		setReviewError("");
		setSubmittingReview(true);
		try {
			await submitReview({ data: {
				slug,
				rating: reviewRating,
				title: reviewTitle,
				body: reviewBody
			} });
			setShowReviewModal(false);
			setReviewTitle("");
			setReviewBody("");
			queryClient.invalidateQueries({ queryKey: ["reviews", slug] });
		} catch (err) {
			setReviewError(err?.message || "Please sign in to submit a review");
		} finally {
			setSubmittingReview(false);
		}
	};
	const recommendations = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-[#E8E2D8] bg-white/60 py-2.5 px-3.5 sm:px-8 lg:px-12 text-xs text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:text-foreground",
							children: "Shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground font-semibold truncate",
							children: product.name
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-3.5 sm:px-8 lg:px-12 py-5 sm:py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 sm:space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[4/5] w-full overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#F4EFEA] shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selectedImage || product.img,
									alt: product.name,
									className: "h-full w-full object-cover transition-all duration-300"
								}), product.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-3 top-3 rounded-xs bg-[#141715] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white",
									children: product.tag
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2 sm:gap-3",
								children: galleryImages.map((imgSrc, idx) => {
									const isCurrent = (selectedImage || product.img) === imgSrc;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSelectedImage(imgSrc),
										className: `aspect-square rounded-sm sm:rounded-md overflow-hidden bg-[#F4EFEA] transition-all cursor-pointer ${isCurrent ? "border-2 border-[#141715] ring-2 ring-[#141715]/20 opacity-100" : "border border-[#E8E2D8] opacity-75 hover:opacity-100 hover:border-[#141715]"}`,
										"aria-label": `View photo ${idx + 1}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imgSrc,
											alt: `${product.name} thumbnail ${idx + 1}`,
											className: "h-full w-full object-cover"
										})
									}, idx);
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 sm:space-y-6 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4A25A]",
												children: product.brand
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex text-[#D4A25A]",
														children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-xs font-bold ml-1",
														children: "5.0"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-xs text-muted-foreground",
														children: [
															"(",
															reviews.length + 8,
															")"
														]
													})
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#141715] leading-tight",
											children: product.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs sm:text-sm text-[#7A766F] leading-relaxed",
											children: product.description || "Masterfully tailored home textile woven with premier quality yarns and finished for durability, effortless drape, and lasting comfort."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 sm:p-4 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground block",
										children: isCustomMode ? "Custom Size Price" : "Standard Price"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl sm:text-3xl font-extrabold text-[#141715]",
										children: formatPriceBDT(effectiveUnitPrice)
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-xs bg-[#141715] px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white",
										children: "In Stock · Atelier Crafted"
									})]
								}),
								isCurtain && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md sm:rounded-lg border border-[#D4A25A]/60 bg-white p-3.5 sm:p-5 space-y-3 sm:space-y-4 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-4.5 w-4.5 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-sm sm:text-base text-[#141715]",
												children: "Bespoke Window Sizing"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsCustomMode(!isCustomMode),
											className: `rounded-sm px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${isCustomMode ? "bg-[#141715] text-white" : "border border-[#E8E2D8] bg-[#FAF9F6] text-[#141715] hover:bg-[#F4EFEA]"}`,
											children: isCustomMode ? "Custom Mode: Active" : "Enable Custom Sizing"
										})]
									}), isCustomMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 pt-2 border-t border-[#E8E2D8]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-3 sm:gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] font-bold text-[#141715]",
												children: "Width (Inches)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "24",
												max: "200",
												value: customWidth,
												onChange: (e) => setCustomWidth(Number(e.target.value) || 24),
												className: "mt-1 w-full rounded-sm border border-[#E8E2D8] px-3 py-1.5 text-sm font-semibold outline-none focus:border-[#141715]"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-[11px] font-bold text-[#141715]",
												children: "Height (Inches)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: "36",
												max: "160",
												value: customHeight,
												onChange: (e) => setCustomHeight(Number(e.target.value) || 36),
												className: "mt-1 w-full rounded-sm border border-[#E8E2D8] px-3 py-1.5 text-sm font-semibold outline-none focus:border-[#141715]"
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-3.5 w-3.5 text-[#D4A25A] shrink-0" }),
												" Sizing estimated for ",
												customCalc.panels,
												" full drape panel(s). Ready in ",
												customCalc.estimatedDays,
												"."
											]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11.5px] text-muted-foreground leading-relaxed",
										children: "Standard dimension: 52\" Width x 84\" Length (2 Panels included). Toggle custom mode to specify exact window height & width."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-bold uppercase tracking-wider text-[#141715]",
											children: ["Color Shade: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-[#D4A25A]",
												children: selectedColor
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2.5 sm:gap-3",
										children: COLOR_SWATCHES.map((swatch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedColor(swatch.name),
											className: `relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-105 cursor-pointer ${selectedColor === swatch.name ? "border-[#141715] ring-2 ring-[#D4A25A]" : "border-[#E8E2D8]"}`,
											style: { backgroundColor: swatch.hex },
											"aria-label": `Select ${swatch.name}`,
											children: selectedColor === swatch.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-white drop-shadow-md" })
										}, swatch.name))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold uppercase tracking-wider text-[#141715]",
										children: "Header / Pleat Style"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2 sm:gap-2.5",
										children: PLEAT_STYLES.map((style) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelectedPleat(style.id),
											className: `rounded-sm sm:rounded-md border p-2.5 sm:p-3 text-left transition-all cursor-pointer ${selectedPleat === style.id ? "border-[#141715] bg-[#141715] text-white" : "border-[#E8E2D8] bg-white text-[#141715] hover:bg-[#FAF9F6]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-xs",
												children: style.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `text-[10px] mt-0.5 ${selectedPleat === style.id ? "text-[#EADCC8]" : "text-muted-foreground"}`,
												children: style.desc
											})]
										}, style.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 sm:gap-3 pt-3 border-t border-[#E8E2D8]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center rounded-sm border border-[#E8E2D8] bg-white h-11 shrink-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQty(Math.max(1, qty - 1)),
													className: "flex h-11 w-9 items-center justify-center text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer",
													"aria-label": "Decrease quantity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-8 text-center font-bold text-xs sm:text-sm text-[#141715]",
													children: qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQty(qty + 1),
													className: "flex h-11 w-9 items-center justify-center text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer",
													"aria-label": "Increase quantity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleAddToCart,
											className: "flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#141715] h-11 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2E473A] cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: added ? "Added to Bag!" : `Add to Bag · ${formatPriceBDT(totalPrice)}`
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setIsSaved(!isSaved),
											className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D8] bg-white transition-colors cursor-pointer ${isSaved ? "text-red-500 fill-red-500" : "text-muted-foreground hover:text-foreground"}`,
											"aria-label": "Save to wishlist",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4.5 w-4.5 ${isSaved ? "fill-current" : ""}` })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2.5 pt-3 border-t border-[#E8E2D8] text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-[#D4A25A] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% Quality Assured" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 text-[#D4A25A] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free Delivery Over ৳5k" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5 text-[#D4A25A] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "7-Day Fit Guarantee" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-[#D4A25A] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free Swatch in Dhaka" })]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 sm:mt-20 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-6 sm:gap-8 border-b border-[#E8E2D8] pb-3 overflow-x-auto whitespace-nowrap scrollbar-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("details"),
									className: `text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${activeTab === "details" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"}`,
									children: "Product Details & Fabric"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("care"),
									className: `text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${activeTab === "care" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"}`,
									children: "Care & Maintenance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveTab("shipping"),
									className: `text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${activeTab === "shipping" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"}`,
									children: "Shipping & Installation"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 sm:py-8 max-w-3xl text-xs sm:text-sm leading-relaxed text-[#141715]",
							children: [
								activeTab === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.details || "Handcrafted using dense woven yarn with precision reinforced seams. Tested to maintain structural integrity and color luster across years of everyday use." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-md border border-[#E8E2D8] bg-white p-4 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[#141715]",
											children: "Composition:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[#7A766F] mt-0.5",
											children: product.notes
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[#141715]",
											children: "Origin & Craft:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[#7A766F] mt-0.5",
											children: "Handcrafted in JNS Atelier, Dhaka, Bangladesh"
										})] })]
									})]
								}),
								activeTab === "care" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.how_to_use || "Machine wash gentle in cold water using mild, bleach-free detergent. For best results, hang dry naturally or low-heat vertical steaming." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "list-disc pl-5 space-y-1.5 text-xs text-[#7A766F]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Do not use chlorine bleach or harsh chemical spot removers." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Iron on reverse side on low-medium synthetic/linen setting." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "For velvet fabrics, vertical garment steam or professional dry clean is recommended." })
										]
									})]
								}),
								activeTab === "shipping" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: product.shipping_text || "We ship to all 64 districts in Bangladesh via verified insured courier services (Pathao, Steadfast, RedX)." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md border border-[#E8E2D8] bg-white p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-[#141715]",
												children: "Dhaka City:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[#7A766F] mt-1",
												children: "2 - 3 business days (Home delivery: ৳80 or Free over ৳5,000)."
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-md border border-[#E8E2D8] bg-white p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-[#141715]",
												children: "Outside Dhaka:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[#7A766F] mt-1",
												children: "3 - 5 business days (Doorstep courier: ৳150)."
											})]
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 sm:mt-16 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
								children: "Verified Client Reviews"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "Direct feedback from homeowners across Bangladesh."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (!userMe?.user) {
										alert("Please sign in to write a review");
										return;
									}
									setShowReviewModal(true);
								},
								className: "inline-flex items-center justify-center gap-2 rounded-sm border border-[#141715] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#141715] hover:text-white transition-all cursor-pointer w-full sm:w-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Write a Review"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-1 md:grid-cols-2 gap-4",
							children: reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-dashed border-[#E8E2D8] bg-white p-8 text-center md:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-8 w-8 text-[#D4A25A] mx-auto" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-serif text-lg font-semibold mt-2",
										children: "Be the first to review this furnishing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "Share your experience with quality, sizing, and drape."
									})
								]
							}) : reviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-[#E8E2D8] bg-white p-5 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif font-bold text-sm text-foreground",
											children: rev.user_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex text-[#D4A25A]",
											children: [...Array(rev.rating)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-sm text-foreground mt-2",
										children: rev.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1 leading-relaxed",
										children: rev.body
									})
								]
							}, rev.id))
						})]
					}),
					recommendations.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 sm:mt-20 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
							children: "Complete the Look"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8",
							children: recommendations.map((rec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p: rec }, rec.slug))
						})]
					})
				]
			}),
			showReviewModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-3xl border border-[#E8E2D8] bg-[#FAF9F6] p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-2xl font-bold text-foreground",
							children: "Write a Review"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: ["Reviewing: ", product.name]
						}),
						reviewError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600",
							children: reviewError
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleReviewSubmit,
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Rating"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 mt-1",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((num) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setReviewRating(num),
										className: `p-1.5 rounded-lg border ${reviewRating >= num ? "border-[#D4A25A] text-[#D4A25A]" : "border-[#E8E2D8] text-muted-foreground"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-current" })
									}, num))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Review Headline"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									required: true,
									placeholder: "e.g. Exceptional Blackout Quality & Drape",
									value: reviewTitle,
									onChange: (e) => setReviewTitle(e.target.value),
									className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-foreground",
									children: "Your Experience"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									required: true,
									rows: 4,
									placeholder: "Share details about the fabric softness, sizing accuracy, stitching...",
									value: reviewBody,
									onChange: (e) => setReviewBody(e.target.value),
									className: "mt-1 w-full rounded-xl border border-[#E8E2D8] bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-end gap-3 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setShowReviewModal(false),
										className: "rounded-full border border-[#E8E2D8] px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground",
										children: "Cancel"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submittingReview,
										className: "rounded-full bg-[#2E473A] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E3127] disabled:opacity-50",
										children: submittingReview ? "Submitting..." : "Publish Review"
									})]
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ProductPage as component };
