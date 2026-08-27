import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Sparkles, f as ShieldCheck, r as Truck, v as Ruler } from "../_libs/lucide-react.mjs";
import { S as useCart, _ as calculateCustomCurtainPrice, g as SiteHeader, h as SiteFooter, v as formatPriceBDT } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/custom-7nXGvLwL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomCurtainsPage() {
	const { addItem } = useCart();
	const [width, setWidth] = (0, import_react.useState)(60);
	const [height, setHeight] = (0, import_react.useState)(90);
	const [fabric, setFabric] = (0, import_react.useState)("blackout");
	const [lining, setLining] = (0, import_react.useState)("thermal");
	const [pleat, setPleat] = (0, import_react.useState)("pinch-pleat");
	const [color, setColor] = (0, import_react.useState)("Warm Oatmeal");
	const [added, setAdded] = (0, import_react.useState)(false);
	const calc = calculateCustomCurtainPrice({
		widthInches: width,
		heightInches: height,
		fabricType: fabric,
		lining,
		pleatStyle: pleat
	});
	const handleOrderCustom = () => {
		const customProduct = {
			slug: `custom-curtain-${Date.now()}`,
			name: `Custom Tailored Drapery (${width}"W x ${height}"L)`,
			brand: "JNS Bespoke",
			price: `৳${calc.totalPrice}`,
			img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
			tag: "Custom Sizing",
			notes: `${fabric.toUpperCase()} · ${pleat.toUpperCase()} · ${lining.toUpperCase()} Lining · ${color}`,
			category: "fragrance"
		};
		addItem(customProduct, 1);
		setAdded(true);
		setTimeout(() => setAdded(false), 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#2E473A] text-white py-16 px-6 lg:px-8 border-b border-[#1E3127]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A25A]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { className: "h-3.5 w-3.5" }), " Bespoke Window Concierge"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-serif text-3xl sm:text-5xl font-medium text-[#FAF9F6]",
							children: "Designed Around Your Space."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed",
							children: "Every window is unique. Input your custom dimensions below to instantly calculate price, select luxury fabrics and pleat headers, and order bespoke curtains handcrafted in Dhaka."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-[#E8E2D8] bg-[#F4EFE6] py-12 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 md:grid-cols-5 gap-4",
						children: [
							{
								step: "01",
								title: "Window Dimensions",
								desc: "Specify width & height in inches"
							},
							{
								step: "02",
								title: "Select Fabric",
								desc: "Linen, blackout, velvet, or jacquard"
							},
							{
								step: "03",
								title: "Choose Pleat",
								desc: "Pinch pleat, eyelet, or wave fold"
							},
							{
								step: "04",
								title: "We Handcraft It",
								desc: "Tailored by master Dhaka artisans"
							},
							{
								step: "05",
								title: "Delivered & Ready",
								desc: "Doorstep delivery in 5 to 7 days"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-[#E8E2D8] bg-white p-4 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs font-bold text-[#D4A25A]",
									children: s.step
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-serif font-semibold text-sm text-[#1A1A1A] mt-1",
									children: s.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: s.desc
								})
							]
						}, s.step))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white",
										children: "1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-xl font-bold text-foreground",
										children: "Window Measurements"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-semibold mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Width (Inches):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[#2E473A] font-bold",
												children: [
													width,
													"\" (",
													(width / 12).toFixed(1),
													" ft)"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "24",
											max: "180",
											step: "2",
											value: width,
											onChange: (e) => setWidth(Number(e.target.value)),
											className: "w-full accent-[#2E473A]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-[10px] text-muted-foreground mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "24\" (Standard Window)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "180\" (Grand Slider)" })]
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-semibold mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Height / Drop (Inches):" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[#2E473A] font-bold",
												children: [
													height,
													"\" (",
													(height / 12).toFixed(1),
													" ft)"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "36",
											max: "144",
											step: "2",
											value: height,
											onChange: (e) => setHeight(Number(e.target.value)),
											className: "w-full accent-[#2E473A]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-[10px] text-muted-foreground mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "36\" (Sill Length)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "144\" (Floor to Ceiling)" })]
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white",
										children: "2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-xl font-bold text-foreground",
										children: "Select Luxury Fabric Type"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2",
									children: [
										{
											id: "blackout",
											name: "100% Blackout",
											desc: "Thermal & light blocking"
										},
										{
											id: "linen",
											name: "Belgian Flax Linen",
											desc: "Airy slub texture"
										},
										{
											id: "velvet",
											name: "Turkish Plush Velvet",
											desc: "Heavy luxury drape"
										},
										{
											id: "jacquard",
											name: "Damask Jacquard",
											desc: "Woven classic motifs"
										}
									].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setFabric(f.id),
										className: `rounded-2xl border p-4 text-left transition-all ${fabric === f.id ? "border-[#2E473A] bg-[#2E473A] text-white shadow-md" : "border-[#E8E2D8] bg-[#FAF9F6] text-foreground hover:bg-[#F4EFE6]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-serif font-bold text-sm",
											children: f.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-[10px] mt-1 ${fabric === f.id ? "text-white/80" : "text-muted-foreground"}`,
											children: f.desc
										})]
									}, f.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-xl font-bold text-foreground",
										children: "Header & Pleat Style"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2",
									children: [
										{
											id: "pinch-pleat",
											name: "Pinch Pleat",
											desc: "Double tailor fold"
										},
										{
											id: "eyelet",
											name: "Eyelet (Ring)",
											desc: "Slide on metal rod"
										},
										{
											id: "wave-fold",
											name: "Wave Fold",
											desc: "Continuous S-curve"
										},
										{
											id: "rod-pocket",
											name: "Rod Pocket",
											desc: "Gathered header"
										}
									].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setPleat(p.id),
										className: `rounded-2xl border p-4 text-left transition-all ${pleat === p.id ? "border-[#2E473A] bg-[#2E473A] text-white shadow-md" : "border-[#E8E2D8] bg-[#FAF9F6] text-foreground hover:bg-[#F4EFE6]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-serif font-bold text-sm",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: `text-[10px] mt-1 ${pleat === p.id ? "text-white/80" : "text-muted-foreground"}`,
											children: p.desc
										})]
									}, p.id))
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sticky top-28 rounded-3xl border-2 border-[#D4A25A]/60 bg-white p-6 sm:p-8 shadow-xl space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold uppercase tracking-widest text-[#D4A25A]",
									children: "Live Estimate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif text-2xl font-bold text-[#1A1A1A] mt-1",
									children: "Bespoke Order Summary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 divide-y divide-[#E8E2D8] text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Dimensions:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-foreground",
												children: [
													width,
													"\" Width × ",
													height,
													"\" Drop"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Fabric Type:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground capitalize",
												children: fabric
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Header Style:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-foreground capitalize",
												children: pleat.replace("-", " ")
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Panels Included:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-foreground",
												children: [calc.panels, " Tailored Panel(s)"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Estimated Turnaround:"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-[#2E473A]",
												children: calc.estimatedDays
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-[#F4EFE6] p-4 border border-[#E8E2D8]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Total Handcrafted Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-serif text-3xl font-bold text-[#2E473A] mt-0.5",
											children: formatPriceBDT(calc.totalPrice)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "Includes all stitching, hooks, and free doorstep delivery."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleOrderCustom,
									className: "w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#1E3127] hover:scale-102",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-[#D4A25A]" }), added ? "Custom Drapery Added to Bag!" : "Add Custom Order to Bag"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2 text-[11px] text-muted-foreground space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "100% Perfect Fit Guarantee" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Free Nationwide Delivery Over ৳5,000" })]
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { CustomCurtainsPage as component };
