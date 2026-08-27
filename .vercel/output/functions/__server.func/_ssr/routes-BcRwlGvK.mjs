import { r as __toESM } from "../_runtime.mjs";
import { n as useSuspenseQuery, o as require_jsx_runtime, s as require_react, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Heart, H as ChevronRight, J as Award, Y as ArrowRight, c as Sparkles, d as ShoppingBag, f as ShieldCheck, p as Send, r as Truck, s as Star, v as Ruler } from "../_libs/lucide-react.mjs";
import { S as useCart, g as SiteHeader, h as SiteFooter, v as formatPriceBDT } from "./router-BoUir8eE.mjs";
import { i as listReviewStatsFn, s as productsQueryOptions$1 } from "./router-BoUir8eE2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BcRwlGvK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
queryOptions({
	queryKey: ["review-stats"],
	queryFn: () => listReviewStatsFn(),
	staleTime: 6e4
});
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
function Index() {
	const { data: products } = useSuspenseQuery(productsQueryOptions$1);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("all");
	const [newsletterEmail, setNewsletterEmail] = (0, import_react.useState)("");
	const [subscribed, setSubscribed] = (0, import_react.useState)(false);
	const [currentSlide, setCurrentSlide] = (0, import_react.useState)(0);
	const heroSlides = [
		{
			collection: "VOL. 04 / LIVING ATELIER",
			title: "The Art of Living.",
			subtitle: "Curated Comfort & Bespoke Drapery",
			desc: "Architectural home textiles crafted with natural Belgian flax linen, triple-weave thermal blackouts, and Turkish plush velvet.",
			img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
			featuredProduct: "Belgian Flax Linen Sheer",
			featuredPrice: "৳1,850",
			cta1: "Explore Collection",
			cta1Link: "/shop",
			cta2: "Bespoke Window Sizing",
			cta2Link: "/custom"
		},
		{
			collection: "VOL. 04 / DRAPERY CONCIERGE",
			title: "Tailored to Precision.",
			subtitle: "Handcrafted Custom Sizing",
			desc: "Every window drop and width custom stitched by Dhaka master artisans. 100% light-blocking privacy and temperature insulation.",
			img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=90",
			featuredProduct: "Triple-Weave Blackout Curtain",
			featuredPrice: "৳2,490",
			cta1: "Launch Custom Sizer",
			cta1Link: "/custom",
			cta2: "View All Fabrics",
			cta2Link: "/shop"
		},
		{
			collection: "VOL. 04 / SANCTUARY BEDDING",
			title: "Restful Architecture.",
			subtitle: "400TC Long-Staple Egyptian Cotton",
			desc: "Silky breathability and hotel-grade sateen finishes designed for deep, restorative sleep in modern homes.",
			img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=2400&q=90",
			featuredProduct: "400TC Egyptian Cotton Bedding",
			featuredPrice: "৳4,800",
			cta1: "Shop Sanctuary Bedding",
			cta1Link: "/shop",
			cta2: "View Lookbook",
			cta2Link: "/lookbook"
		}
	];
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
		}, 5e3);
		return () => clearInterval(timer);
	}, [heroSlides.length]);
	heroSlides[currentSlide];
	const filteredProducts = products.filter((p) => {
		if (activeCategory === "all") return true;
		return p.category === activeCategory;
	});
	const bestSellingProducts = products.slice(0, 4);
	const newArrivalsProducts = products.slice(4, 8);
	const handleNewsletter = (e) => {
		e.preventDefault();
		if (newsletterEmail.trim()) {
			setSubscribed(true);
			setNewsletterEmail("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#FAF9F6] pt-3 sm:pt-6 pb-8 sm:pb-12 px-3.5 sm:px-8 lg:px-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1440px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#141715]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.4/1] min-h-[440px] sm:min-h-[540px] lg:min-h-[620px] w-full overflow-hidden",
							children: [
								heroSlides.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 pointer-events-none z-0"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.img,
										alt: s.title,
										className: "h-full w-full object-cover object-center",
										loading: idx === 0 ? "eager" : "lazy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-end sm:items-center p-4 sm:p-10 lg:p-14 z-20 pointer-events-none",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full sm:max-w-md lg:max-w-lg rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white/95 backdrop-blur-md p-5 sm:p-8 lg:p-9 shadow-xl space-y-3 sm:space-y-4 text-left pointer-events-auto transition-all animate-in fade-in-0 duration-300",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D4A25A]",
															children: idx === 0 ? "Curtains & Drapery" : idx === 1 ? "Egyptian Bedding" : "Living & Slipcovers"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[#E8E2D8]",
															children: "•"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] sm:text-[11px] font-bold text-[#7A766F] uppercase tracking-wider",
															children: "Atelier 2026"
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#141715] leading-snug",
													children: idx === 0 ? "Luxury Custom Curtains & Drapery" : idx === 1 ? "400TC Egyptian Cotton Bedding" : "Tailored Living & Sofa Covers"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs sm:text-[13.5px] text-[#5A574F] font-medium leading-relaxed",
													children: idx === 0 ? "Triple-weave thermal blackout & Belgian flax linen sheers. Tailored to your exact window drop." : idx === 1 ? "Ultra-soft sateen finish and breathable French linen sets for deep, restorative sleep." : "Handcrafted made-to-measure sofa slipcovers and plush velvet cushions."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between border-t border-[#E8E2D8]/80 pt-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] uppercase tracking-wider text-[#8C887F] font-bold block",
														children: "Starting From"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm sm:text-base font-extrabold text-[#141715]",
														children: idx === 0 ? "৳1,850" : idx === 1 ? "৳3,200" : "৳1,650"
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
														to: s.cta1Link,
														className: "inline-flex items-center justify-center gap-2 rounded-sm bg-[#141715] px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2E473A]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: idx === 0 ? "Shop Curtains" : idx === 1 ? "Explore Bedding" : "Shop Living" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
													})]
												})
											]
										})
									})]
								}, s.title)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCurrentSlide((prev) => prev === 0 ? heroSlides.length - 1 : prev - 1),
									className: "hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/80 transition-colors cursor-pointer text-lg",
									"aria-label": "Previous slide",
									children: "‹"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCurrentSlide((prev) => prev === heroSlides.length - 1 ? 0 : prev + 1),
									className: "hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/80 transition-colors cursor-pointer text-lg",
									"aria-label": "Next slide",
									children: "›"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-3 sm:bottom-6 right-4 sm:right-10 z-30 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-xs px-3 py-1.5 shadow-md",
									children: heroSlides.map((_, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setCurrentSlide(idx),
										className: `h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${idx === currentSlide ? "w-6 sm:w-8 bg-[#D4A25A]" : "w-1.5 sm:w-2 bg-white/60 hover:bg-white"}`,
										"aria-label": `Go to slide ${idx + 1}`
									}, idx))
								})
							]
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-12 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80 bg-[#FAF9F6]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-8 sm:space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 text-left border-b border-[#E8E2D8] pb-4 sm:pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]",
							children: "The Atelier Catalogue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1 sm:mt-1.5",
							children: "Curated Spaces & Collections"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "text-xs font-bold uppercase tracking-widest text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Full Catalogue (24)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8",
						children: [
							{
								num: "01",
								name: "Curtains & Drapery",
								desc: "Triple-weave thermal blackout, organic Belgian flax linen & Turkish velvet.",
								img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
								link: "/shop",
								search: { category: "fragrance" },
								tag: "Custom Sizing",
								cta: "Explore Curtains"
							},
							{
								num: "02",
								name: "Sanctuary Bedding",
								desc: "400TC long-staple Egyptian cotton sateen & French washed linen sets.",
								img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1200&q=85",
								link: "/shop",
								search: { category: "body" },
								tag: "Hotel Grade",
								cta: "Explore Bedding"
							},
							{
								num: "03",
								name: "Living & Sofa Covers",
								desc: "Stretch jacquard slipcovers, water-repellent fabrics & plush velvet cushions.",
								img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
								link: "/shop",
								search: { category: "skin" },
								tag: "Universal Fit",
								cta: "Explore Living"
							},
							{
								num: "04",
								name: "Custom Sizer Atelier",
								desc: "Doorstep measurements across Dhaka with fabric swatches & fitting guarantee.",
								img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
								link: "/custom",
								tag: "Free Doorstep Visit",
								cta: "Book Measurement"
							}
						].map((dept) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: dept.link,
							search: dept.search,
							className: "group relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#141715] shadow-xs transition-all duration-500 hover:shadow-xl block text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: dept.img,
									alt: dept.name,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 left-4 z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-sm bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#141715] shadow-2xs",
										children: dept.tag
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute inset-x-0 bottom-0 p-6 z-10 space-y-2 text-white",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs font-bold text-[#D4A25A] tracking-wider",
											children: dept.num
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-serif text-xl sm:text-2xl font-normal text-white leading-tight",
											children: dept.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-[#EADCC8] line-clamp-2 leading-relaxed",
											children: dept.desc
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#D4A25A] transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dept.cta }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })]
										})
									]
								})
							]
						}, dept.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-10 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-6 sm:space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]",
								children: "Best Selling"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "text-xs font-bold uppercase tracking-wider text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1 sm:hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8",
							children: bestSellingProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-2 text-left hidden sm:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								className: "inline-flex items-center rounded-sm bg-[#141715] px-7 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#2E473A] transition-colors",
								children: "View all offers"
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-10 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-6 sm:space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]",
							children: "New Arrivals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop",
							className: "text-xs font-bold uppercase tracking-wider text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1 sm:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8",
						children: (newArrivalsProducts.length > 0 ? newArrivalsProducts : products.slice(0, 4)).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-10 sm:py-20 px-4 sm:px-10 lg:px-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-6 sm:space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-left space-y-3 sm:space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]",
								children: "More ideas and inspiration"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [
									{
										label: "All",
										key: "all"
									},
									{
										label: "Curtains & Drapery",
										key: "fragrance"
									},
									{
										label: "Bedding",
										key: "body"
									},
									{
										label: "Sofa Covers",
										key: "skin"
									},
									{
										label: "Textiles by Yard",
										key: "hair"
									}
								].map((pill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActiveCategory(pill.key),
									className: `rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${activeCategory === pill.key ? "bg-[#141715] text-white shadow-xs" : "border border-[#E8E2D8] bg-white text-[#141715]/80 hover:border-[#141715] hover:text-[#141715]"}`,
									children: pill.label
								}, pill.key))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8",
							children: filteredProducts.slice(0, 8).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.slug))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-4 text-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/shop",
								className: "inline-flex items-center gap-2 rounded-sm border border-[#141715] px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#141715] hover:text-white transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Explore Full Collection (",
									products.length,
									")"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#FAF9F6] py-14 px-6 sm:px-10 lg:px-14 border-y border-[#E8E2D8]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1440px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-[#141715]",
										children: "Doorstep Sizing"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#7A766F] leading-relaxed",
										children: "Expert measurement & fabric swatch consultation anywhere in Dhaka."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-[#141715]",
										children: "Nationwide Delivery"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#7A766F] leading-relaxed",
										children: "Fast, secure courier delivery across all 64 districts in Bangladesh."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-[#141715]",
										children: "Master Craftsmanship"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#7A766F] leading-relaxed",
										children: "Certified Belgian linen, Turkish velvet & triple-weave thermal blackouts."
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-bold text-[#141715]",
										children: "Fitting Guarantee"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#7A766F] leading-relaxed",
										children: "100% custom fit assurance and 7-day hassle-free exchange on ready sizes."
									})]
								})]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 sm:py-22 px-6 sm:px-10 lg:px-14 bg-white border-b border-[#E8E2D8]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-[#E8E2D8] pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]",
								children: "Living Architecture"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1.5",
								children: "Inspired Spaces & Real Homes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-[#7A766F] mt-1",
								children: "Explore how JNS bespoke textiles transform apartments and penthouses in Dhaka."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/lookbook",
							className: "text-xs font-bold uppercase tracking-widest text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Lookbook" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9",
						children: [
							{
								title: "Warm Minimal Living Space",
								location: "Gulshan Residence, Dhaka",
								img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
								featuredProducts: [{
									name: "Triple-Weave Blackout Curtain",
									price: "৳2,490"
								}, {
									name: "Velvet Cushion Trio",
									price: "৳1,650"
								}],
								link: "/shop",
								category: "fragrance"
							},
							{
								title: "Sanctuary Master Bedroom",
								location: "Banani Penthouse, Dhaka",
								img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
								featuredProducts: [{
									name: "400TC Egyptian Cotton Bedding",
									price: "৳4,800"
								}, {
									name: "Belgian Flax Linen Sheers",
									price: "৳1,850"
								}],
								link: "/shop",
								category: "body"
							},
							{
								title: "Serene Daylight Studio",
								location: "Dhanmondi Residence, Dhaka",
								img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
								featuredProducts: [{
									name: "Plush Velvet Insulated Drape",
									price: "৳3,450"
								}, {
									name: "Jacquard Sofa Slipcover",
									price: "৳3,200"
								}],
								link: "/shop",
								category: "skin"
							}
						].map((look) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8E2D8] bg-[#FAF9F6] text-left transition-all duration-500 hover:shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFEA]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: look.img,
									alt: look.title,
									loading: "lazy",
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-3 left-3 bg-[#141715]/85 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-xs",
									children: look.location
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6 flex flex-col justify-between flex-1 space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-[#141715] leading-snug",
									children: look.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3.5 space-y-2 border-t border-[#E8E2D8] pt-3",
									children: look.featuredProducts.map((prod) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[#5A574F] font-medium truncate mr-2",
											children: ["• ", prod.name]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[#141715] shrink-0",
											children: prod.price
										})]
									}, prod.name))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: look.link,
										search: { category: look.category },
										className: "inline-flex items-center justify-between w-full rounded-md bg-white border border-[#E8E2D8] px-4 py-2.5 text-xs font-bold text-[#141715] hover:bg-[#141715] hover:text-white transition-all shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop This Room" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
									})
								})]
							})]
						}, look.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#141715] text-white py-18 sm:py-24 px-6 sm:px-10 lg:px-14 border-y border-[#262B28]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1440px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-6 space-y-6 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A25A]",
										children: "JNS Trade & Contract Atelier"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight",
										children: "Furnishing for Hotels, Offices & Architecture."
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm sm:text-base text-[#D5CEBF] leading-relaxed max-w-xl",
									children: "We partner with interior architects, boutique hospitality groups, corporate developers, and staging professionals across Bangladesh. Enjoy dedicated trade discounts, commercial fire-retardant fabrics, and turnkey measurement & installation."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3.5 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-white/10 bg-white/5 p-4 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-bold text-white",
												children: "Interior Designers"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#A8A296]",
												children: "Trade pricing & custom fabric yardage."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-white/10 bg-white/5 p-4 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-bold text-white",
												children: "Boutique Hotels"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#A8A296]",
												children: "Fire-retardant blackout suites."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-white/10 bg-white/5 p-4 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-bold text-white",
												children: "Corporate Offices"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#A8A296]",
												children: "Acoustic drapery & window fit-outs."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-white/10 bg-white/5 p-4 space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-sm font-bold text-white",
												children: "Model Staging"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#A8A296]",
												children: "Turnkey styling for penthouses."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-5 pt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/trade",
										className: "inline-flex items-center gap-2 rounded-sm bg-[#D4A25A] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#E5BE78] transition-colors shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apply for Trade Account" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/contact",
										className: "text-xs font-bold uppercase tracking-wider text-white border-b border-white/40 pb-0.5 hover:text-[#D4A25A] hover:border-[#D4A25A] transition-all",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book Consultation →" })
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
								alt: "Hospitality Contract Fit-Out",
								loading: "lazy",
								className: "h-full w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-4 right-4 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-xs border border-white/20 text-[11px] font-mono text-[#D4A25A]",
								children: "JNS Contract · Dhaka"
							})]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-18 sm:py-24 px-6 sm:px-10 lg:px-14 bg-[#FAF9F6] border-b border-[#E8E2D8]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[1440px] space-y-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-[#E8E2D8] pb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]",
							children: "Verified Client Stories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1.5",
							children: "What Homeowners Say"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs font-bold text-[#141715]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex text-[#D4A25A]",
								children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-current" }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "4.9 / 5.0 Star Average" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 text-left",
						children: [
							{
								quote: "The custom triple-weave blackout curtains completely changed our master bedroom. No light leaks, and the pinch pleat finish feels like a 5-star hotel in Paris.",
								author: "Farzana Chowdhury",
								location: "Gulshan-2, Dhaka",
								item: "Custom Blackout Curtains",
								date: "Verified Order"
							},
							{
								quote: "I was skeptical about ordering made-to-measure window sizing online, but their team came to our apartment in Banani with full fabric books. Flawless installation.",
								author: "Tanvir Ahmed",
								location: "Banani, Dhaka",
								item: "Belgian Flax Linen Sheers",
								date: "Verified Order"
							},
							{
								quote: "The 400TC Egyptian cotton bedding set has such a smooth, cool luster. It gets softer with every wash. Hands down the finest home textiles in Bangladesh.",
								author: "Nusrat Jahan",
								location: "Dhanmondi, Dhaka",
								item: "400TC Egyptian Cotton Set",
								date: "Verified Order"
							}
						].map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between rounded-2xl border border-[#E8E2D8] bg-white p-7 shadow-2xs space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1 text-[#D4A25A]",
									children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-current" }, i))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm sm:text-[14.5px] text-[#4A4740] leading-relaxed italic",
									children: [
										"\"",
										review.quote,
										"\""
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-[#E8E2D8] pt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-sm font-bold text-[#141715]",
									children: review.author
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#7A766F]",
									children: review.location
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-bold text-[#2E473A] bg-[#FAF4EA] px-2.5 py-1 rounded-sm",
									children: review.item
								})]
							})]
						}, review.author))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#FAF9F6] border-t border-[#E8E2D8] py-16 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-2xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]",
							children: "Stay Inspired"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-3xl font-medium text-[#1A1A1A] sm:text-4xl",
							children: "Join the JNS Inner Circle"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Receive curated home styling guides, early access to new textile seasonal drops, and exclusive bespoke tailoring offers."
						}),
						subscribed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-[#2E473A] p-6 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-[#D4A25A] mx-auto mb-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-serif text-lg font-bold",
									children: "Welcome to JNS Furnishing"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#EADCC8] mt-1",
									children: "Thank you for subscribing. We've sent an introductory gift to your inbox."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleNewsletter,
							className: "mt-6 flex flex-col sm:flex-row gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "Enter your email address...",
								value: newsletterEmail,
								onChange: (e) => setNewsletterEmail(e.target.value),
								className: "flex-1 rounded-full border border-[#E8E2D8] bg-white px-5 py-3.5 text-sm outline-none focus:border-[#D4A25A]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "inline-flex items-center justify-center gap-2 rounded-full bg-[#2E473A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all",
								children: ["Subscribe ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })]
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
export { Index as component };
