import { r as __toESM } from "../_runtime.mjs";
import { a as useQueryClient, o as require_jsx_runtime, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as LoaderCircle, C as Pencil, E as Menu, G as ChartColumn, I as ExternalLink, L as DollarSign, M as Image, R as Copy, W as Check, _ as Save, a as Trash2, b as Printer, d as ShoppingBag, i as TrendingUp, k as LogOut, m as Search, o as Tag, s as Star, t as X, w as Package, x as Plus, z as CloudUpload } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { E as listProductsFn, a as adminDeleteReviewFn, c as adminLogoutFn, d as deleteProductFn, f as updateProductFn, o as adminListReviewsFn, p as uploadProductImageFn, u as createProductFn } from "./router-BoUir8eE.mjs";
import { n as Route$2 } from "./router-BoUir8eE2.mjs";
import { a as updateOrderStatusFn, t as listOrdersFn } from "./orders.functions-DQfHp6Jg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-XT6M79ZI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY = {
	slug: "",
	name: "",
	brand: "JNS Furnishing",
	price: "৳2,490",
	img: "/products/curtain-blackout-charcoal.jpg",
	tag: "Bespoke",
	notes: "",
	category: "fragrance",
	description: "",
	details: "",
	how_to_use: "",
	shipping_text: "Free Nationwide Shipping Over ৳5,000",
	authenticity_text: "Handcrafted in Dhaka Atelier",
	returns_text: "7-Day Fit Guarantee",
	ugc_videos: []
};
function AdminDashboard() {
	const { username } = Route$2.useLoaderData();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const logout = useServerFn(adminLogoutFn);
	useServerFn(listProductsFn);
	const createFn = useServerFn(createProductFn);
	const updateFn = useServerFn(updateProductFn);
	const deleteFn = useServerFn(deleteProductFn);
	const listOrders = useServerFn(listOrdersFn);
	const updateStatus = useServerFn(updateOrderStatusFn);
	const listReviews = useServerFn(adminListReviewsFn);
	const deleteReview = useServerFn(adminDeleteReviewFn);
	const [tab, setTab] = (0, import_react.useState)("analytics");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [orderStatusFilter, setOrderStatusFilter] = (0, import_react.useState)("all");
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const [productCategoryFilter, setProductCategoryFilter] = (0, import_react.useState)("all");
	const [selectedInvoiceOrder, setSelectedInvoiceOrder] = (0, import_react.useState)(null);
	const [copiedOrderId, setCopiedOrderId] = (0, import_react.useState)(null);
	const [promos, setPromos] = (0, import_react.useState)([
		{
			code: "DHAKALUXE10",
			discount: "10% OFF",
			type: "percent",
			minSpend: "৳5,000",
			active: true
		},
		{
			code: "EID2026",
			discount: "৳500 OFF",
			type: "fixed",
			minSpend: "৳3,000",
			active: true
		},
		{
			code: "CURTAINVIP",
			discount: "15% OFF",
			type: "percent",
			minSpend: "৳10,000",
			active: true
		}
	]);
	const [newPromoCode, setNewPromoCode] = (0, import_react.useState)("");
	const [newPromoDiscount, setNewPromoDiscount] = (0, import_react.useState)("");
	const { data: products = [], isLoading, refetch } = useQuery({
		queryKey: ["admin-products"],
		queryFn: () => listProductsFn()
	});
	const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
		queryKey: ["admin-orders"],
		queryFn: () => listOrders()
	});
	const { data: reviews = [], isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
		queryKey: ["admin-reviews"],
		queryFn: () => listReviews()
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const uploadImage = useServerFn(uploadProductImageFn);
	const [uploadingMain, setUploadingMain] = (0, import_react.useState)(false);
	const [uploadingGallery, setUploadingGallery] = (0, import_react.useState)(null);
	const [previewMain, setPreviewMain] = (0, import_react.useState)(null);
	const [previewGallery, setPreviewGallery] = (0, import_react.useState)([
		null,
		null,
		null
	]);
	const handleFileUpload = async (file, target) => {
		if (!file || !editing) return;
		if (target === "main") setUploadingMain(true);
		else setUploadingGallery(target);
		try {
			const reader = new FileReader();
			const base64Data = await new Promise((resolve, reject) => {
				reader.onload = () => {
					const res = reader.result;
					if (target === "main") setPreviewMain(res);
					else setPreviewGallery((prev) => {
						const copy = [...prev];
						copy[target] = res;
						return copy;
					});
					resolve(res);
				};
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});
			const res = await uploadImage({ data: {
				filename: file.name,
				base64Data,
				contentType: file.type || "image/jpeg"
			} });
			if (res?.url) {
				if (target === "main") setEditing({
					...editing,
					product: {
						...editing.product,
						img: res.url
					}
				});
				else {
					const gallery = [...editing.product.ugc_videos || []];
					gallery[target] = res.url;
					setEditing({
						...editing,
						product: {
							...editing.product,
							ugc_videos: gallery
						}
					});
				}
			}
		} catch (err) {
			alert(err?.message || "Failed to upload image to S3 bucket");
		} finally {
			setUploadingMain(false);
			setUploadingGallery(null);
		}
	};
	async function refreshAll() {
		await refetch();
		queryClient.invalidateQueries({ queryKey: ["products"] });
		queryClient.invalidateQueries({ queryKey: ["product"] });
	}
	async function handleSave() {
		if (!editing) return;
		setSaving(true);
		setError(null);
		try {
			const p = { ...editing.product };
			if (!p.name?.trim()) p.name = "Bespoke Furnishing Item";
			if (!p.brand?.trim()) p.brand = "JNS Furnishing";
			if (!p.tag?.trim()) p.tag = "Bespoke";
			if (!p.price?.trim() || p.price === "৳") p.price = "৳2,490";
			if (!p.img?.trim()) p.img = previewMain || "/products/curtain-blackout-charcoal.jpg";
			if (!p.slug?.trim()) p.slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
			if (editing.mode === "create") await createFn({ data: p });
			else await updateFn({ data: {
				...p,
				originalSlug: editing.originalSlug
			} });
			setEditing(null);
			setPreviewMain(null);
			setPreviewGallery([
				null,
				null,
				null
			]);
			await refreshAll();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Save failed. Please check all fields.");
		} finally {
			setSaving(false);
		}
	}
	async function handleDelete(p) {
		if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
		await deleteFn({ data: { slug: p.slug } });
		await refreshAll();
	}
	async function handleDeleteReview(id) {
		if (!confirm("Delete this review? This cannot be undone.")) return;
		await deleteReview({ data: { id } });
		await refetchReviews();
		queryClient.invalidateQueries({ queryKey: ["reviews"] });
		queryClient.invalidateQueries({ queryKey: ["review-stats"] });
	}
	async function handleLogout() {
		await logout();
		navigate({ to: "/admin/login" });
	}
	const copyCourierData = (o) => {
		const text = `Name: ${o.customer_name}\nPhone: ${o.phone}\nAddress: ${o.address}, ${o.city}\nAmount to Collect: ৳${o.total}\nOrder: ${o.order_number}`;
		navigator.clipboard.writeText(text);
		setCopiedOrderId(o.order_number);
		setTimeout(() => setCopiedOrderId(null), 2500);
	};
	const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (Number(o.total) || 0), 0);
	const aov = orders.length ? Math.round(totalRevenue / orders.length) : 0;
	const pendingOrders = orders.filter((o) => o.status === "pending").length;
	const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
	const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
	const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "5.0";
	const filteredOrders = orders.filter((o) => {
		if (orderStatusFilter === "all") return true;
		return o.status === orderStatusFilter;
	});
	const filteredProducts = products.filter((p) => {
		const matchCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
		const matchSearch = !productSearch.trim() || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.slug.toLowerCase().includes(productSearch.toLowerCase()) || p.brand.toLowerCase().includes(productSearch.toLowerCase());
		return matchCat && matchSearch;
	});
	const navItems = [
		{
			key: "analytics",
			label: "Analytics",
			icon: ChartColumn,
			count: orders.length
		},
		{
			key: "orders",
			label: "Live Orders",
			icon: ShoppingBag,
			count: orders.length
		},
		{
			key: "products",
			label: "Catalog Items",
			icon: Package,
			count: products.length
		},
		{
			key: "discounts",
			label: "Discount Vouchers",
			icon: Tag,
			count: promos.length
		},
		{
			key: "reviews",
			label: "Reviews",
			icon: Star,
			count: reviews.length
		}
	];
	function selectTab(t) {
		setTab(t);
		setSidebarOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6] text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-[#E8E2D8] bg-white/95 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSidebarOpen(true),
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D8] md:hidden hover:bg-[#F4EFEA]",
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.25em] text-[#D4A25A] font-bold block",
								children: "JNS Furnishing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate text-base sm:text-xl font-extrabold text-[#141715]",
								children: "Admin Management Portal"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/",
								target: "_blank",
								rel: "noreferrer",
								className: "hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-1.5 text-xs font-bold text-[#141715] hover:bg-white transition-colors",
								children: "View Storefront ↗"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden text-xs text-[#7A766F] md:inline",
								children: ["User: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-[#141715]",
									children: username
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleLogout,
								className: "flex items-center gap-1.5 rounded-sm border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-bold text-[#141715] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign out" })
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-7xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden w-60 shrink-0 border-r border-[#E8E2D8] bg-white md:block min-h-[calc(100vh-68px)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "sticky top-[69px] p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
								items: navItems,
								tab,
								onSelect: selectTab
							})
						})
					}),
					sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fixed inset-0 z-40 md:hidden",
						onClick: () => setSidebarOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "absolute inset-y-0 left-0 w-64 max-w-[85vw] bg-white p-4 shadow-xl border-r border-[#E8E2D8]",
							onClick: (e) => e.stopPropagation(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between border-b border-[#E8E2D8] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold text-sm text-[#141715]",
									children: "Admin Navigation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSidebarOpen(false),
									className: "flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {
								items: navItems,
								tab,
								onSelect: selectTab
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
						className: "min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 text-left",
						children: [
							tab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
										title: "Business Performance & Revenue",
										subtitle: "Live financial metrics, order conversion, and fulfillment velocity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[#7A766F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] uppercase tracking-wider font-bold",
															children: "Gross Sales"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-[#D4A25A]" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
														children: ["৳", totalRevenue.toLocaleString("en-BD")]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs inline-block",
														children: "+18.4% this month"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[#7A766F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] uppercase tracking-wider font-bold",
															children: "Total Orders"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 text-[#141715]" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
														children: orders.length
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-[#7A766F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
															className: "text-amber-600",
															children: pendingOrders
														}), " pending fulfillment"]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[#7A766F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] uppercase tracking-wider font-bold",
															children: "Average Order"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4 text-[#2E473A]" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
														children: ["৳", aov.toLocaleString("en-BD")]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-[#7A766F]",
														children: "Per completed basket"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[#7A766F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] uppercase tracking-wider font-bold",
															children: "Satisfaction"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-amber-500 fill-amber-500" })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
														children: [
															avgRating,
															" ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs text-[#7A766F] font-normal",
																children: "/ 5.0"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[10px] text-[#7A766F]",
														children: [
															"From ",
															reviews.length,
															" verified ratings"
														]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-5 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[#141715] uppercase tracking-wider",
												children: "Fulfillment Status"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-xs font-bold text-[#141715] mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⏳ Pending Confirmation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															pendingOrders,
															" (",
															orders.length ? Math.round(pendingOrders / orders.length * 100) : 0,
															"%)"
														] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-2 rounded-full bg-[#F4EFEA] overflow-hidden",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-amber-500 rounded-full",
															style: { width: `${orders.length ? pendingOrders / orders.length * 100 : 0}%` }
														})
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-xs font-bold text-[#141715] mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓ Atelier Tailoring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															confirmedOrders,
															" (",
															orders.length ? Math.round(confirmedOrders / orders.length * 100) : 0,
															"%)"
														] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-2 rounded-full bg-[#F4EFEA] overflow-hidden",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-indigo-500 rounded-full",
															style: { width: `${orders.length ? confirmedOrders / orders.length * 100 : 0}%` }
														})
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between text-xs font-bold text-[#141715] mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✅ Successfully Delivered" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															deliveredOrders,
															" (",
															orders.length ? Math.round(deliveredOrders / orders.length * 100) : 0,
															"%)"
														] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "h-2 rounded-full bg-[#F4EFEA] overflow-hidden",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-emerald-500 rounded-full",
															style: { width: `${orders.length ? deliveredOrders / orders.length * 100 : 0}%` }
														})
													})] })
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-5 space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[#141715] uppercase tracking-wider",
												children: "Atelier Operations"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-2.5 pt-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setTab("orders"),
													className: "rounded-sm border border-[#E8E2D8] bg-white p-3 text-left hover:bg-[#F4EFEA] transition-colors cursor-pointer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-[#141715]",
														children: "Process Live Orders"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-[#7A766F] mt-0.5",
														children: "Print invoices & dispatch"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setEditing({
															mode: "create",
															product: EMPTY
														});
														setTab("products");
													},
													className: "rounded-sm border border-[#E8E2D8] bg-white p-3 text-left hover:bg-[#F4EFEA] transition-colors cursor-pointer",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-bold text-[#141715]",
														children: "Add New Furnishing"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-[#7A766F] mt-0.5",
														children: "Upload S3 photos & fabrics"
													})]
												})]
											})]
										})]
									})
								]
							}),
							tab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
									title: "Live Orders & Dispatch",
									subtitle: "Cash-on-delivery & bKash dispatch requests from the storefront",
									action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => refetchOrders(),
											className: "rounded-sm border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer",
											children: "Refresh"
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-1.5 overflow-x-auto pb-3 text-xs font-bold scrollbar-none",
									children: [
										{
											id: "all",
											label: `All (${orders.length})`
										},
										{
											id: "pending",
											label: `⏳ Pending (${orders.filter((o) => o.status === "pending").length})`
										},
										{
											id: "confirmed",
											label: `✓ Confirmed (${orders.filter((o) => o.status === "confirmed").length})`
										},
										{
											id: "shipped",
											label: `🚚 Shipped (${orders.filter((o) => o.status === "shipped").length})`
										},
										{
											id: "delivered",
											label: `✅ Delivered (${orders.filter((o) => o.status === "delivered").length})`
										}
									].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setOrderStatusFilter(st.id),
										className: `rounded-sm px-3 py-1.5 shrink-0 transition-colors cursor-pointer ${orderStatusFilter === st.id ? "bg-[#141715] text-white" : "bg-white border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715]"}`,
										children: st.label
									}, st.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full min-w-[760px] text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-[#F4EFEA] text-left text-[10px] uppercase tracking-wider text-[#7A766F] font-bold border-b border-[#E8E2D8]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Order Ref"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Customer & Contact"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Items & Tailoring"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Total"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Status & Dispatch"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4 text-right",
													children: "Actions"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
											className: "divide-y divide-[#E8E2D8]",
											children: [
												ordersLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 6,
													className: "p-8 text-center text-xs text-[#7A766F]",
													children: "Loading live orders..."
												}) }),
												!ordersLoading && filteredOrders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 6,
													className: "p-8 text-center text-xs text-[#7A766F]",
													children: "No orders found for this status."
												}) }),
												filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "align-top hover:bg-[#FAF9F6]/80 transition-colors",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5 sm:p-4",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "font-bold text-xs text-[#141715]",
																	children: o.order_number
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "inline-block mt-1 rounded-xs bg-[#F4EFEA] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#D4A25A] border border-[#E8E2D8]",
																	children: "COD"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[10px] text-[#7A766F] mt-1",
																	children: new Date(o.created_at).toLocaleDateString("en-GB", {
																		day: "numeric",
																		month: "short"
																	})
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5 sm:p-4",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "font-bold text-xs text-[#141715]",
																	children: o.customer_name
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																	href: `tel:${o.phone}`,
																	className: "text-xs font-medium text-[#2E473A] hover:underline block mt-0.5",
																	children: o.phone
																}),
																o.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "text-[11px] text-[#7A766F]",
																	children: o.email
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "mt-1 text-xs text-[#141715] bg-[#FAF9F6] p-2 rounded-xs border border-[#E8E2D8] leading-relaxed",
																	children: [
																		"📍 ",
																		o.address,
																		", ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																			className: "text-[#141715]",
																			children: o.city
																		})
																	]
																}),
																o.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "mt-1 text-[11px] italic text-[#7A766F]",
																	children: [
																		"Note: “",
																		o.notes,
																		"”"
																	]
																})
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
																className: "space-y-1.5 text-xs text-[#141715]",
																children: o.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
																	className: "flex items-center gap-1.5 font-medium",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "h-5 w-5 rounded-full bg-[#141715] text-white flex items-center justify-center text-[10px] font-bold shrink-0",
																		children: i.qty
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "line-clamp-1",
																		children: i.name
																	})]
																}, i.slug))
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5 sm:p-4 font-extrabold text-sm text-[#141715]",
															children: ["৳", Number(o.total).toLocaleString("en-BD", { maximumFractionDigits: 0 })]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																value: o.status,
																onChange: async (e) => {
																	await updateStatus({ data: {
																		order_number: o.order_number,
																		status: e.target.value
																	} });
																	await refetchOrders();
																},
																className: `rounded-sm border px-2.5 py-1.5 text-xs font-bold cursor-pointer outline-none ${o.status === "delivered" ? "bg-emerald-50 border-emerald-300 text-emerald-800" : o.status === "cancelled" ? "bg-red-50 border-red-300 text-red-700" : o.status === "shipped" ? "bg-blue-50 border-blue-300 text-blue-700" : o.status === "confirmed" ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "bg-amber-50 border-amber-300 text-amber-800"}`,
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "pending",
																		children: "⏳ Pending"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "confirmed",
																		children: "✓ Confirmed"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "shipped",
																		children: "🚚 Shipped"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "delivered",
																		children: "✅ Delivered"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "cancelled",
																		children: "✕ Cancelled"
																	})
																]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5 sm:p-4 text-right space-y-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																onClick: () => setSelectedInvoiceOrder(o),
																className: "inline-flex items-center gap-1 rounded-sm border border-[#E8E2D8] bg-white px-2.5 py-1 text-[11px] font-bold text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3 w-3 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Invoice" })]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => copyCourierData(o),
																className: "inline-flex items-center gap-1 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-2.5 py-1 text-[10px] font-bold text-[#141715] hover:bg-white transition-colors cursor-pointer block w-full justify-center",
																children: copiedOrderId === o.order_number ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-emerald-600",
																	children: "Copied!"
																})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3 text-[#7A766F]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Courier Data" })] })
															})]
														})
													]
												}, o.order_number))
											]
										})]
									})
								})
							] }),
							tab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
									title: "Furnishing Products",
									subtitle: `${products.length} active drapery & bedding items stored in Neon Postgres`,
									action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setPreviewMain(null);
											setPreviewGallery([
												null,
												null,
												null
											]);
											setEditing({
												mode: "create",
												product: EMPTY
											});
										},
										className: "flex items-center gap-2 rounded-sm bg-[#141715] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#2E473A] cursor-pointer shadow-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " New product"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex-1 max-w-md",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A766F]" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: productSearch,
												onChange: (e) => setProductSearch(e.target.value),
												placeholder: "Search by name, slug, or brand...",
												className: "w-full rounded-sm border border-[#E8E2D8] bg-white pl-9 pr-3 py-2 text-xs font-medium outline-none focus:border-[#141715]"
											}),
											productSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setProductSearch(""),
												className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7A766F] hover:text-[#141715]",
												children: "✕"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 overflow-x-auto text-xs font-bold scrollbar-none",
										children: [
											{
												id: "all",
												label: "All Items"
											},
											{
												id: "fragrance",
												label: "Curtains"
											},
											{
												id: "body",
												label: "Bedding"
											},
											{
												id: "skin",
												label: "Sofa Covers"
											}
										].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setProductCategoryFilter(cat.id),
											className: `rounded-sm px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${productCategoryFilter === cat.id ? "bg-[#141715] text-white" : "bg-white border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715]"}`,
											children: cat.label
										}, cat.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white shadow-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full min-w-[680px] text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "bg-[#F4EFEA] text-left text-[10px] uppercase tracking-wider text-[#7A766F] font-bold border-b border-[#E8E2D8]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Image"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Name & Slug"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Brand"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Category"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4",
													children: "Price"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 sm:p-4 text-right",
													children: "Actions"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
											className: "divide-y divide-[#E8E2D8]",
											children: [
												isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 6,
													className: "p-8 text-center text-xs text-[#7A766F]",
													children: "Loading catalog items..."
												}) }),
												!isLoading && filteredProducts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 6,
													className: "p-8 text-center text-xs text-[#7A766F]",
													children: "No items match your search."
												}) }),
												filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-[#FAF9F6]/80 transition-colors",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: p.img,
																alt: p.name,
																className: "h-12 w-12 rounded-sm border border-[#E8E2D8] bg-[#F4EFEA] object-cover",
																onError: (e) => {
																	e.currentTarget.src = "/products/curtain-blackout-charcoal.jpg";
																}
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5 sm:p-4",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-bold text-xs text-[#141715]",
																children: p.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-[11px] text-[#7A766F] font-mono",
																children: p.slug
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4 text-xs text-[#7A766F]",
															children: p.brand
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-xs bg-[#F4EFEA] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#141715] border border-[#E8E2D8]",
																children: p.category
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4 font-bold text-xs text-[#141715]",
															children: p.price
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 sm:p-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex justify-end gap-1.5",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																		href: `/product/${p.slug}`,
																		target: "_blank",
																		rel: "noreferrer",
																		className: "flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715] hover:bg-[#F4EFEA] transition-colors",
																		title: "View on Storefront",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => {
																			setPreviewMain(null);
																			setPreviewGallery([
																				null,
																				null,
																				null
																			]);
																			setEditing({
																				mode: "edit",
																				product: p,
																				originalSlug: p.slug
																			});
																		},
																		className: "flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer",
																		"aria-label": `Edit ${p.name}`,
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => handleDelete(p),
																		className: "flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-red-600 hover:bg-red-50 transition-colors cursor-pointer",
																		"aria-label": `Delete ${p.name}`,
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
																	})
																]
															})
														})
													]
												}, p.slug))
											]
										})]
									})
								})
							] }),
							tab === "discounts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
										title: "Discount Vouchers & Promos",
										subtitle: "Manage campaign discount codes and promotional vouchers"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-xs font-bold uppercase tracking-wider text-[#141715]",
											children: "Create New Promo Code"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:flex-row gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: newPromoCode,
													onChange: (e) => setNewPromoCode(e.target.value.toUpperCase()),
													placeholder: "Coupon Code (e.g. DHAKA20)",
													className: "flex-1 rounded-sm border border-[#E8E2D8] px-3.5 py-2 text-xs font-bold font-mono uppercase outline-none focus:border-[#141715]"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: newPromoDiscount,
													onChange: (e) => setNewPromoDiscount(e.target.value),
													placeholder: "Discount (e.g. 10% OFF or ৳500 OFF)",
													className: "flex-1 rounded-sm border border-[#E8E2D8] px-3.5 py-2 text-xs font-bold outline-none focus:border-[#141715]"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														if (!newPromoCode.trim()) return;
														setPromos([...promos, {
															code: newPromoCode.trim(),
															discount: newPromoDiscount.trim() || "10% OFF",
															type: "percent",
															minSpend: "৳3,000",
															active: true
														}]);
														setNewPromoCode("");
														setNewPromoDiscount("");
													},
													className: "rounded-sm bg-[#141715] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors shrink-0 cursor-pointer",
													children: "Add Coupon"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
										children: promos.map((pr, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-sm border border-[#E8E2D8] bg-white p-4 space-y-3 relative",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-sm font-extrabold text-[#141715] bg-[#F4EFEA] px-2.5 py-1 rounded-xs border border-[#E8E2D8]",
														children: pr.code
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs",
														children: "Active"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-lg font-extrabold text-[#D4A25A]",
													children: pr.discount
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-[#7A766F]",
													children: ["Min spend: ", pr.minSpend]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														const copy = [...promos];
														copy.splice(idx, 1);
														setPromos(copy);
													},
													className: "text-[11px] font-bold text-red-600 hover:underline block pt-1 cursor-pointer",
													children: "Delete Voucher"
												})
											]
										}, pr.code))
									})
								]
							}),
							tab === "reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
								title: "Reviews",
								subtitle: `${reviews.length} customer review${reviews.length === 1 ? "" : "s"}`,
								action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => refetchReviews(),
									className: "rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted",
									children: "Refresh"
								})
							}), reviewsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Loading…"
							}) : reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground",
								children: "No reviews yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4",
								children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl border border-border bg-background p-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center gap-0.5",
															children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}` }, i))
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-xs text-muted-foreground",
															children: ["by ", r.user_name]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs text-muted-foreground",
															children: "·"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-widest",
															children: r.product_slug
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-2 font-display text-lg",
													children: r.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm text-muted-foreground",
													children: r.body
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-[11px] text-muted-foreground",
													children: new Date(r.created_at).toLocaleString()
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleDeleteReview(r.id),
											className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-destructive transition-colors hover:bg-destructive/10",
											"aria-label": "Delete review",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})
								}, r.id))
							})] })
						]
					})
				]
			}),
			selectedInvoiceOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4",
				onClick: () => setSelectedInvoiceOrder(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-2xl rounded-md border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-2xl space-y-6 text-left",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between border-b border-[#E8E2D8] pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D4A25A] block",
									children: "JNS FURNISHING ATELIER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-extrabold text-[#141715]",
									children: "Dispatch Invoice & Packing Slip"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[#7A766F] mt-0.5",
									children: ["Order Ref: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-[#141715] font-mono",
										children: selectedInvoiceOrder.order_number
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => window.print(),
									className: "inline-flex items-center gap-1.5 rounded-sm bg-[#141715] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Print Slip" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelectedInvoiceOrder(null),
									className: "flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] hover:bg-[#FAF9F6] cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold uppercase tracking-wider text-[#7A766F] block text-[10px]",
										children: "Customer Recipient:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold text-sm text-[#141715]",
										children: selectedInvoiceOrder.customer_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-[#141715]",
										children: selectedInvoiceOrder.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[#7A766F] leading-relaxed",
										children: [
											"📍 ",
											selectedInvoiceOrder.address,
											", ",
											selectedInvoiceOrder.city
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1 sm:text-right",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold uppercase tracking-wider text-[#7A766F] block text-[10px]",
										children: "Payment & Dispatch:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-[#141715]",
										children: "Cash on Delivery (COD)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[#7A766F]",
										children: ["Date: ", new Date(selectedInvoiceOrder.created_at).toLocaleDateString("en-GB")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[#D4A25A] font-bold",
										children: ["Status: ", selectedInvoiceOrder.status.toUpperCase()]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border border-[#E8E2D8] rounded-sm overflow-hidden text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-[#F4EFEA] text-[10px] font-bold uppercase tracking-wider text-[#7A766F] border-b border-[#E8E2D8]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2.5",
												children: "Item Description"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2.5 text-center",
												children: "Qty"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2.5 text-right",
												children: "Unit Price"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-2.5 text-right",
												children: "Subtotal"
											})
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-[#E8E2D8]",
										children: selectedInvoiceOrder.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2.5 font-bold text-[#141715]",
												children: it.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-2.5 text-center font-semibold",
												children: it.qty
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5 text-right",
												children: ["৳", it.price.toLocaleString("en-BD")]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-2.5 text-right font-extrabold text-[#141715]",
												children: ["৳", (it.price * it.qty).toLocaleString("en-BD")]
											})
										] }, it.slug))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
										className: "bg-[#FAF9F6] border-t border-[#E8E2D8] font-bold text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 3,
											className: "p-2.5 text-right uppercase tracking-wider",
											children: "Total Payable (COD):"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-2.5 text-right text-sm font-extrabold text-[#141715]",
											children: ["৳", Number(selectedInvoiceOrder.total).toLocaleString("en-BD")]
										})] })
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-[#E8E2D8] pt-3 flex items-center justify-between text-[11px] text-[#7A766F]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "JNS Furnishing Atelier · Dhaka, Bangladesh" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hotline: +880 1700-000000" })]
						})
					]
				})
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-h-[95vh] w-full max-w-2xl flex-col rounded-t-2xl bg-background shadow-xl sm:rounded-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate font-display text-xl sm:text-2xl",
								children: editing.mode === "create" ? "New product" : `Edit ${editing.originalSlug}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditing(null),
								className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6",
							children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-bold",
								children: ["⚠️ ", error]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Slug",
										value: editing.product.slug,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												slug: v
											}
										}),
										placeholder: "e.g. belgian-flax-linen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										value: editing.product.name,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												name: v
											}
										}),
										placeholder: "e.g. Belgian Flax Linen Curtain"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Brand",
										value: editing.product.brand,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												brand: v
											}
										}),
										placeholder: "JNS Furnishing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Price (display)",
										value: editing.product.price,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												price: v
											}
										}),
										placeholder: "৳2,490"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Tag",
										value: editing.product.tag,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												tag: v
											}
										}),
										placeholder: "e.g. 100% Blackout"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs uppercase tracking-widest text-muted-foreground",
										children: "Category"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: editing.product.category,
										onChange: (e) => setEditing({
											...editing,
											product: {
												...editing.product,
												category: e.target.value
											}
										}),
										className: "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "fragrance",
												children: "Curtains & Drapery"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "body",
												children: "Bedding & Linens"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "skin",
												children: "Sofa & Living Covers"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "hair",
												children: "Fabrics by Yard"
											})
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-bold uppercase tracking-wider text-[#141715]",
												children: "Primary Thumbnail Photo (S3 Bucket)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold text-[#D4A25A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs",
												children: "Bucket: brnnd"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col sm:flex-row items-start sm:items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-20 w-20 shrink-0 rounded-sm border border-[#E8E2D8] bg-white overflow-hidden flex items-center justify-center",
												children: previewMain || editing.product.img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: previewMain || editing.product.img,
													alt: "Thumbnail preview",
													className: "h-full w-full object-cover",
													onError: (e) => {
														if (previewMain) e.currentTarget.src = previewMain;
													}
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-8 w-8 text-[#7A766F]" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 space-y-2 w-full",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
														className: "inline-flex items-center gap-1.5 rounded-sm bg-[#141715] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors cursor-pointer shrink-0",
														children: [uploadingMain ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Uploading to S3..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Photo to S3" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "file",
															accept: "image/*",
															className: "hidden",
															disabled: uploadingMain,
															onChange: (e) => {
																const file = e.target.files?.[0];
																if (file) handleFileUpload(file, "main");
															}
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] text-[#7A766F]",
														children: "Direct push to S3 CDN"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: editing.product.img,
													onChange: (e) => setEditing({
														...editing,
														product: {
															...editing.product,
															img: e.target.value
														}
													}),
													placeholder: "https://content.zambic.com/products/... or /products/...",
													className: "w-full rounded-sm border border-[#E8E2D8] bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-[#141715]"
												})]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center justify-between",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-xs font-bold uppercase tracking-wider text-[#141715]",
												children: "3 Additional Gallery Showcase Photos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[#7A766F]",
												children: "Upload 3 high-res angles (Texture Macro, Room Staging, Pleat Detail) to S3."
											})] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1",
											children: [
												0,
												1,
												2
											].map((slotIdx) => {
												const galleryItems = editing.product.ugc_videos || [];
												const slotUrl = galleryItems[slotIdx] || "";
												const localPreview = previewGallery[slotIdx];
												const activeSrc = localPreview || slotUrl;
												const isUploading = uploadingGallery === slotIdx;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-sm border border-[#E8E2D8] bg-white p-3 space-y-2 text-left",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[11px] font-bold text-[#141715]",
																children: [
																	"1. Texture Macro",
																	"2. Room Staging",
																	"3. Drape Angle"
																][slotIdx]
															}), activeSrc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => {
																	const updated = [...galleryItems];
																	updated.splice(slotIdx, 1);
																	setPreviewGallery((prev) => {
																		const copy = [...prev];
																		copy[slotIdx] = null;
																		return copy;
																	});
																	setEditing({
																		...editing,
																		product: {
																			...editing.product,
																			ugc_videos: updated
																		}
																	});
																},
																className: "text-[10px] text-red-600 hover:underline font-bold",
																children: "Remove"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-28 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] overflow-hidden flex items-center justify-center relative",
															children: activeSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: activeSrc,
																alt: `Gallery slot ${slotIdx + 1}`,
																className: "h-full w-full object-cover",
																onError: (e) => {
																	if (localPreview) e.currentTarget.src = localPreview;
																}
															}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "text-center p-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-6 w-6 text-[#7A766F] mx-auto mb-1 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] text-[#7A766F] block",
																	children: ["Empty Slot ", slotIdx + 1]
																})]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "flex items-center justify-center gap-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] hover:bg-[#F4EFEA] py-1.5 text-[11px] font-bold text-[#141715] transition-colors cursor-pointer",
															children: [isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pushing S3..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3 w-3 text-[#D4A25A]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeSrc ? "Replace" : "Upload to S3" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "file",
																accept: "image/*",
																className: "hidden",
																disabled: isUploading,
																onChange: (e) => {
																	const file = e.target.files?.[0];
																	if (file) handleFileUpload(file, slotIdx);
																}
															})]
														})
													]
												}, slotIdx);
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs uppercase tracking-widest text-muted-foreground",
											children: "Notes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: editing.product.notes,
											onChange: (e) => setEditing({
												...editing,
												product: {
													...editing.product,
													notes: e.target.value
												}
											}),
											rows: 2,
											className: "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										label: "Description",
										value: editing.product.description ?? "",
										rows: 4,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												description: v
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										label: "Details",
										value: editing.product.details ?? "",
										rows: 4,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												details: v
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
										label: "How to use",
										value: editing.product.how_to_use ?? "",
										rows: 3,
										onChange: (v) => setEditing({
											...editing,
											product: {
												...editing.product,
												how_to_use: v
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:col-span-2 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Shipping card",
												value: editing.product.shipping_text ?? "",
												onChange: (v) => setEditing({
													...editing,
													product: {
														...editing.product,
														shipping_text: v
													}
												}),
												placeholder: "Over ৳5,000"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Authenticity card",
												value: editing.product.authenticity_text ?? "",
												onChange: (v) => setEditing({
													...editing,
													product: {
														...editing.product,
														authenticity_text: v
													}
												}),
												placeholder: "Sourced direct"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Returns card",
												value: editing.product.returns_text ?? "",
												onChange: (v) => setEditing({
													...editing,
													product: {
														...editing.product,
														returns_text: v
													}
												}),
												placeholder: "No questions"
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center justify-between gap-3 border-t border-[#E8E2D8] bg-[#FAF9F6] px-5 py-4 sm:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-left min-w-0 flex-1",
								children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-red-600 font-bold truncate",
									children: ["⚠️ ", error]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setEditing(null);
										setPreviewMain(null);
										setPreviewGallery([
											null,
											null,
											null
										]);
									},
									className: "rounded-sm border border-[#E8E2D8] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleSave,
									disabled: saving,
									className: "flex items-center gap-2 rounded-sm bg-[#141715] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors disabled:opacity-60 cursor-pointer shadow-xs",
									children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saving ? "Saving..." : "Save Product" })]
								})]
							})]
						})
					]
				})
			})
		]
	});
}
function SidebarNav({ items, tab, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1.5",
		children: items.map((it) => {
			const Icon = it.icon;
			const active = tab === it.key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onSelect(it.key),
				className: `flex w-full items-center justify-between gap-2 rounded-sm px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${active ? "bg-[#141715] text-white shadow-xs" : "text-[#7A766F] hover:bg-[#F4EFEA] hover:text-[#141715]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: it.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `shrink-0 rounded-xs px-2 py-0.5 text-[10px] font-extrabold ${active ? "bg-white/20 text-white" : "bg-[#F4EFEA] text-[#141715]"}`,
					children: it.count
				})]
			}) }, it.key);
		})
	});
}
function SectionHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#E8E2D8] pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl sm:text-2xl font-extrabold text-[#141715]",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-[#7A766F]",
				children: subtitle
			})]
		}), action]
	});
}
function Field({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "block text-xs uppercase tracking-widest text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		className: "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
	})] });
}
function TextArea({ label, value, onChange, rows = 3, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sm:col-span-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "block text-xs uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			rows,
			placeholder,
			className: "mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
		})]
	});
}
//#endregion
export { AdminDashboard as component };
