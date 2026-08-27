import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminMeFn,
  adminLogoutFn,
  createProductFn,
  updateProductFn,
  deleteProductFn,
  adminListReviewsFn,
  adminDeleteReviewFn,
  uploadProductImageFn,
} from "@/lib/admin.functions";
import { listProductsFn, type Product } from "@/lib/products.functions";
import { listOrdersFn, updateOrderStatusFn, type Order, type OrderItem } from "@/lib/orders.functions";
import {
  Pencil,
  Plus,
  Trash2,
  LogOut,
  Save,
  X,
  Package,
  ShoppingBag,
  Star,
  Menu,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Check,
  BarChart3,
  Printer,
  Tag,
  Search,
  Copy,
  TrendingUp,
  Percent,
  FileText,
  DollarSign,
  Truck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Portal — JNS Furnishing" }, { name: "robots", content: "noindex" }] }),
  loader: async () => {
    const me = await adminMeFn();
    if (!me.username) throw redirect({ to: "/admin/login" });
    return { username: me.username };
  },
  component: AdminDashboard,
});

const EMPTY: Product = {
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
  ugc_videos: [],
};

type Tab = "analytics" | "orders" | "products" | "discounts" | "reviews";

function AdminDashboard() {
  const { username } = Route.useLoaderData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useServerFn(adminLogoutFn);
  const list = useServerFn(listProductsFn);
  const createFn = useServerFn(createProductFn);
  const updateFn = useServerFn(updateProductFn);
  const deleteFn = useServerFn(deleteProductFn);
  const listOrders = useServerFn(listOrdersFn);
  const updateStatus = useServerFn(updateOrderStatusFn);
  const listReviews = useServerFn(adminListReviewsFn);
  const deleteReview = useServerFn(adminDeleteReviewFn);

  const [tab, setTab] = useState<Tab>("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filters & State
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [productSearch, setProductSearch] = useState<string>("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  // Coupons State
  const [promos, setPromos] = useState([
    { code: "DHAKALUXE10", discount: "10% OFF", type: "percent", minSpend: "৳5,000", active: true },
    { code: "EID2026", discount: "৳500 OFF", type: "fixed", minSpend: "৳3,000", active: true },
    { code: "CURTAINVIP", discount: "15% OFF", type: "percent", minSpend: "৳10,000", active: true },
  ]);
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState("");

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => listProductsFn(),
  });

  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => listOrders(),
  });

  const { data: reviews = [], isLoading: reviewsLoading, refetch: refetchReviews } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => listReviews(),
  });

  const [editing, setEditing] = useState<{ mode: "create" | "edit"; product: Product; originalSlug?: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = useServerFn(uploadProductImageFn);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState<number | null>(null);

  const [previewMain, setPreviewMain] = useState<string | null>(null);
  const [previewGallery, setPreviewGallery] = useState<(string | null)[]>([null, null, null]);

  const handleFileUpload = async (file: File, target: "main" | number) => {
    if (!file || !editing) return;
    if (target === "main") setUploadingMain(true);
    else setUploadingGallery(target);

    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const res = reader.result as string;
          if (target === "main") setPreviewMain(res);
          else {
            setPreviewGallery((prev) => {
              const copy = [...prev];
              copy[target] = res;
              return copy;
            });
          }
          resolve(res);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const base64Data = await base64Promise;
      const res = await uploadImage({
        data: {
          filename: file.name,
          base64Data,
          contentType: file.type || "image/jpeg",
        },
      });
      if (res?.url) {
        if (target === "main") {
          setEditing({
            ...editing,
            product: { ...editing.product, img: res.url },
          });
        } else {
          const gallery = [...(editing.product.ugc_videos || [])];
          gallery[target] = res.url;
          setEditing({
            ...editing,
            product: { ...editing.product, ugc_videos: gallery },
          });
        }
      }
    } catch (err: any) {
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
      if (!p.slug?.trim()) {
        p.slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      }
      if (editing.mode === "create") {
        await createFn({ data: p });
      } else {
        await updateFn({ data: { ...p, originalSlug: editing.originalSlug! } });
      }
      setEditing(null);
      setPreviewMain(null);
      setPreviewGallery([null, null, null]);
      await refreshAll();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed. Please check all fields.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: Product) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    await deleteFn({ data: { slug: p.slug } });
    await refreshAll();
  }

  async function handleDeleteReview(id: number) {
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

  const copyCourierData = (o: Order) => {
    const text = `Name: ${o.customer_name}\nPhone: ${o.phone}\nAddress: ${o.address}, ${o.city}\nAmount to Collect: ৳${o.total}\nOrder: ${o.order_number}`;
    navigator.clipboard.writeText(text);
    setCopiedOrderId(o.order_number);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  // Analytics Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((s, o) => s + (Number(o.total) || 0), 0);
  const aov = orders.length ? Math.round(totalRevenue / orders.length) : 0;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === "all") return true;
    return o.status === orderStatusFilter;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchCat = productCategoryFilter === "all" || p.category === productCategoryFilter;
    const matchSearch =
      !productSearch.trim() ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(productSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const navItems: { key: Tab; label: string; icon: any; count: number }[] = [
    { key: "analytics", label: "Analytics", icon: BarChart3, count: orders.length },
    { key: "orders", label: "Live Orders", icon: ShoppingBag, count: orders.length },
    { key: "products", label: "Catalog Items", icon: Package, count: products.length },
    { key: "discounts", label: "Discount Vouchers", icon: Tag, count: promos.length },
    { key: "reviews", label: "Reviews", icon: Star, count: reviews.length },
  ];

  function selectTab(t: Tab) {
    setTab(t);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <header className="sticky top-0 z-30 border-b border-[#E8E2D8] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D8] md:hidden hover:bg-[#F4EFEA]"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="min-w-0 text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A25A] font-bold block">JNS Furnishing</span>
              <h1 className="truncate text-base sm:text-xl font-extrabold text-[#141715]">Admin Management Portal</h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-1.5 text-xs font-bold text-[#141715] hover:bg-white transition-colors"
            >
              View Storefront ↗
            </a>
            <span className="hidden text-xs text-[#7A766F] md:inline">User: <strong className="text-[#141715]">{username}</strong></span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-sm border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-bold text-[#141715] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-[#E8E2D8] bg-white md:block min-h-[calc(100vh-68px)]">
          <nav className="sticky top-[69px] p-4">
            <SidebarNav items={navItems} tab={tab} onSelect={selectTab} />
          </nav>
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <aside
              className="absolute inset-y-0 left-0 w-64 max-w-[85vw] bg-white p-4 shadow-xl border-r border-[#E8E2D8]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                <p className="font-bold text-sm text-[#141715]">Admin Navigation</p>
                <button onClick={() => setSidebarOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarNav items={navItems} tab={tab} onSelect={selectTab} />
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 text-left">
          {/* TAB 1: ANALYTICS DASHBOARD */}
          {tab === "analytics" && (
            <div className="space-y-6">
              <SectionHeader
                title="Business Performance & Revenue"
                subtitle="Live financial metrics, order conversion, and fulfillment velocity"
              />

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[#7A766F]">
                    <span className="text-[11px] uppercase tracking-wider font-bold">Gross Sales</span>
                    <TrendingUp className="h-4 w-4 text-[#D4A25A]" />
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#141715]">
                    ৳{totalRevenue.toLocaleString("en-BD")}
                  </p>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-xs inline-block">
                    +18.4% this month
                  </span>
                </div>

                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[#7A766F]">
                    <span className="text-[11px] uppercase tracking-wider font-bold">Total Orders</span>
                    <ShoppingBag className="h-4 w-4 text-[#141715]" />
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#141715]">
                    {orders.length}
                  </p>
                  <p className="text-[10px] text-[#7A766F]">
                    <strong className="text-amber-600">{pendingOrders}</strong> pending fulfillment
                  </p>
                </div>

                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[#7A766F]">
                    <span className="text-[11px] uppercase tracking-wider font-bold">Average Order</span>
                    <DollarSign className="h-4 w-4 text-[#2E473A]" />
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#141715]">
                    ৳{aov.toLocaleString("en-BD")}
                  </p>
                  <span className="text-[10px] text-[#7A766F]">Per completed basket</span>
                </div>

                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-[#7A766F]">
                    <span className="text-[11px] uppercase tracking-wider font-bold">Satisfaction</span>
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  </div>
                  <p className="text-xl sm:text-2xl font-extrabold text-[#141715]">
                    {avgRating} <span className="text-xs text-[#7A766F] font-normal">/ 5.0</span>
                  </p>
                  <span className="text-[10px] text-[#7A766F]">From {reviews.length} verified ratings</span>
                </div>
              </div>

              {/* Fulfillment Distribution & Top Sellers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Fulfillment Status Progress */}
                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-5 space-y-4">
                  <h3 className="text-sm font-bold text-[#141715] uppercase tracking-wider">Fulfillment Status</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#141715] mb-1">
                        <span>⏳ Pending Confirmation</span>
                        <span>{pendingOrders} ({orders.length ? Math.round((pendingOrders / orders.length) * 100) : 0}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F4EFEA] overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${orders.length ? (pendingOrders / orders.length) * 100 : 0}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#141715] mb-1">
                        <span>✓ Atelier Tailoring</span>
                        <span>{confirmedOrders} ({orders.length ? Math.round((confirmedOrders / orders.length) * 100) : 0}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F4EFEA] overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${orders.length ? (confirmedOrders / orders.length) * 100 : 0}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#141715] mb-1">
                        <span>✅ Successfully Delivered</span>
                        <span>{deliveredOrders} ({orders.length ? Math.round((deliveredOrders / orders.length) * 100) : 0}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#F4EFEA] overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${orders.length ? (deliveredOrders / orders.length) * 100 : 0}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Quick Actions */}
                <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-5 space-y-3">
                  <h3 className="text-sm font-bold text-[#141715] uppercase tracking-wider">Atelier Operations</h3>
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => setTab("orders")}
                      className="rounded-sm border border-[#E8E2D8] bg-white p-3 text-left hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-bold text-[#141715]">Process Live Orders</p>
                      <p className="text-[10px] text-[#7A766F] mt-0.5">Print invoices & dispatch</p>
                    </button>
                    <button
                      onClick={() => {
                        setEditing({ mode: "create", product: EMPTY });
                        setTab("products");
                      }}
                      className="rounded-sm border border-[#E8E2D8] bg-white p-3 text-left hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-bold text-[#141715]">Add New Furnishing</p>
                      <p className="text-[10px] text-[#7A766F] mt-0.5">Upload S3 photos & fabrics</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS */}
          {tab === "orders" && (
            <>
              <SectionHeader
                title="Live Orders & Dispatch"
                subtitle="Cash-on-delivery & bKash dispatch requests from the storefront"
                action={
                  <div className="flex items-center gap-2">
                    <button onClick={() => refetchOrders()} className="rounded-sm border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer">
                      Refresh
                    </button>
                  </div>
                }
              />

              {/* Status Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 text-xs font-bold scrollbar-none">
                {[
                  { id: "all", label: `All (${orders.length})` },
                  { id: "pending", label: `⏳ Pending (${orders.filter((o) => o.status === "pending").length})` },
                  { id: "confirmed", label: `✓ Confirmed (${orders.filter((o) => o.status === "confirmed").length})` },
                  { id: "shipped", label: `🚚 Shipped (${orders.filter((o) => o.status === "shipped").length})` },
                  { id: "delivered", label: `✅ Delivered (${orders.filter((o) => o.status === "delivered").length})` },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id)}
                    className={`rounded-sm px-3 py-1.5 shrink-0 transition-colors cursor-pointer ${
                      orderStatusFilter === st.id
                        ? "bg-[#141715] text-white"
                        : "bg-white border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715]"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white shadow-xs">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="bg-[#F4EFEA] text-left text-[10px] uppercase tracking-wider text-[#7A766F] font-bold border-b border-[#E8E2D8]">
                    <tr>
                      <th className="p-3.5 sm:p-4">Order Ref</th>
                      <th className="p-3.5 sm:p-4">Customer & Contact</th>
                      <th className="p-3.5 sm:p-4">Items & Tailoring</th>
                      <th className="p-3.5 sm:p-4">Total</th>
                      <th className="p-3.5 sm:p-4">Status & Dispatch</th>
                      <th className="p-3.5 sm:p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D8]">
                    {ordersLoading && (
                      <tr><td colSpan={6} className="p-8 text-center text-xs text-[#7A766F]">Loading live orders...</td></tr>
                    )}
                    {!ordersLoading && filteredOrders.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-xs text-[#7A766F]">No orders found for this status.</td></tr>
                    )}
                    {filteredOrders.map((o) => (
                      <tr key={o.order_number} className="align-top hover:bg-[#FAF9F6]/80 transition-colors">
                        <td className="p-3.5 sm:p-4">
                          <div className="font-bold text-xs text-[#141715]">{o.order_number}</div>
                          <span className="inline-block mt-1 rounded-xs bg-[#F4EFEA] px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-[#D4A25A] border border-[#E8E2D8]">COD</span>
                          <p className="text-[10px] text-[#7A766F] mt-1">
                            {new Date(o.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                          </p>
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <div className="font-bold text-xs text-[#141715]">{o.customer_name}</div>
                          <a href={`tel:${o.phone}`} className="text-xs font-medium text-[#2E473A] hover:underline block mt-0.5">{o.phone}</a>
                          {o.email && <div className="text-[11px] text-[#7A766F]">{o.email}</div>}
                          <div className="mt-1 text-xs text-[#141715] bg-[#FAF9F6] p-2 rounded-xs border border-[#E8E2D8] leading-relaxed">
                            📍 {o.address}, <strong className="text-[#141715]">{o.city}</strong>
                          </div>
                          {o.notes && <div className="mt-1 text-[11px] italic text-[#7A766F]">Note: “{o.notes}”</div>}
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <ul className="space-y-1.5 text-xs text-[#141715]">
                            {o.items.map((i) => (
                              <li key={i.slug} className="flex items-center gap-1.5 font-medium">
                                <span className="h-5 w-5 rounded-full bg-[#141715] text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i.qty}</span>
                                <span className="line-clamp-1">{i.name}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3.5 sm:p-4 font-extrabold text-sm text-[#141715]">
                          ৳{Number(o.total).toLocaleString("en-BD", { maximumFractionDigits: 0 })}
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <select
                            value={o.status}
                            onChange={async (e) => {
                              await updateStatus({ data: { order_number: o.order_number, status: e.target.value } });
                              await refetchOrders();
                            }}
                            className={`rounded-sm border px-2.5 py-1.5 text-xs font-bold cursor-pointer outline-none ${
                              o.status === "delivered"
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : o.status === "cancelled"
                                ? "bg-red-50 border-red-300 text-red-700"
                                : o.status === "shipped"
                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                : o.status === "confirmed"
                                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                                : "bg-amber-50 border-amber-300 text-amber-800"
                            }`}
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="confirmed">✓ Confirmed</option>
                            <option value="shipped">🚚 Shipped</option>
                            <option value="delivered">✅ Delivered</option>
                            <option value="cancelled">✕ Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 sm:p-4 text-right space-y-1.5">
                          <button
                            onClick={() => setSelectedInvoiceOrder(o)}
                            className="inline-flex items-center gap-1 rounded-sm border border-[#E8E2D8] bg-white px-2.5 py-1 text-[11px] font-bold text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                          >
                            <Printer className="h-3 w-3 text-[#D4A25A]" />
                            <span>Invoice</span>
                          </button>
                          <button
                            onClick={() => copyCourierData(o)}
                            className="inline-flex items-center gap-1 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-2.5 py-1 text-[10px] font-bold text-[#141715] hover:bg-white transition-colors cursor-pointer block w-full justify-center"
                          >
                            {copiedOrderId === o.order_number ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 text-[#7A766F]" />
                                <span>Courier Data</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 3: PRODUCTS CATALOG */}
          {tab === "products" && (
            <>
              <SectionHeader
                title="Furnishing Products"
                subtitle={`${products.length} active drapery & bedding items stored in Neon Postgres`}
                action={
                  <button
                    onClick={() => {
                      setPreviewMain(null);
                      setPreviewGallery([null, null, null]);
                      setEditing({ mode: "create", product: EMPTY });
                    }}
                    className="flex items-center gap-2 rounded-sm bg-[#141715] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#2E473A] cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5" /> New product
                  </button>
                }
              />

              {/* Real-Time Search & Category Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#7A766F]" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name, slug, or brand..."
                    className="w-full rounded-sm border border-[#E8E2D8] bg-white pl-9 pr-3 py-2 text-xs font-medium outline-none focus:border-[#141715]"
                  />
                  {productSearch && (
                    <button
                      onClick={() => setProductSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7A766F] hover:text-[#141715]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold scrollbar-none">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "fragrance", label: "Curtains" },
                    { id: "body", label: "Bedding" },
                    { id: "skin", label: "Sofa Covers" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setProductCategoryFilter(cat.id)}
                      className={`rounded-sm px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                        productCategoryFilter === cat.id
                          ? "bg-[#141715] text-white"
                          : "bg-white border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white shadow-xs">
                <table className="w-full min-w-[680px] text-sm">
                  <thead className="bg-[#F4EFEA] text-left text-[10px] uppercase tracking-wider text-[#7A766F] font-bold border-b border-[#E8E2D8]">
                    <tr>
                      <th className="p-3.5 sm:p-4">Image</th>
                      <th className="p-3.5 sm:p-4">Name & Slug</th>
                      <th className="p-3.5 sm:p-4">Brand</th>
                      <th className="p-3.5 sm:p-4">Category</th>
                      <th className="p-3.5 sm:p-4">Price</th>
                      <th className="p-3.5 sm:p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E2D8]">
                    {isLoading && (
                      <tr><td colSpan={6} className="p-8 text-center text-xs text-[#7A766F]">Loading catalog items...</td></tr>
                    )}
                    {!isLoading && filteredProducts.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-xs text-[#7A766F]">No items match your search.</td></tr>
                    )}
                    {filteredProducts.map((p) => (
                      <tr key={p.slug} className="hover:bg-[#FAF9F6]/80 transition-colors">
                        <td className="p-3.5 sm:p-4">
                          <img
                            src={p.img}
                            alt={p.name}
                            className="h-12 w-12 rounded-sm border border-[#E8E2D8] bg-[#F4EFEA] object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = "/products/curtain-blackout-charcoal.jpg";
                            }}
                          />
                        </td>
                        <td className="p-3.5 sm:p-4">
                          <div className="font-bold text-xs text-[#141715]">{p.name}</div>
                          <div className="text-[11px] text-[#7A766F] font-mono">{p.slug}</div>
                        </td>
                        <td className="p-3.5 sm:p-4 text-xs text-[#7A766F]">{p.brand}</td>
                        <td className="p-3.5 sm:p-4">
                          <span className="rounded-xs bg-[#F4EFEA] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#141715] border border-[#E8E2D8]">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-3.5 sm:p-4 font-bold text-xs text-[#141715]">{p.price}</td>
                        <td className="p-3.5 sm:p-4">
                          <div className="flex justify-end gap-1.5">
                            <a
                              href={`/product/${p.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-[#7A766F] hover:text-[#141715] hover:bg-[#F4EFEA] transition-colors"
                              title="View on Storefront"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                setPreviewMain(null);
                                setPreviewGallery([null, null, null]);
                                setEditing({ mode: "edit", product: p, originalSlug: p.slug });
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                              aria-label={`Edit ${p.name}`}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                              aria-label={`Delete ${p.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 4: DISCOUNT VOUCHERS */}
          {tab === "discounts" && (
            <div className="space-y-6">
              <SectionHeader
                title="Discount Vouchers & Promos"
                subtitle="Manage campaign discount codes and promotional vouchers"
              />

              {/* Create Promo Box */}
              <div className="rounded-sm sm:rounded-md border border-[#E8E2D8] bg-white p-4 sm:p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#141715]">Create New Promo Code</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                    placeholder="Coupon Code (e.g. DHAKA20)"
                    className="flex-1 rounded-sm border border-[#E8E2D8] px-3.5 py-2 text-xs font-bold font-mono uppercase outline-none focus:border-[#141715]"
                  />
                  <input
                    type="text"
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(e.target.value)}
                    placeholder="Discount (e.g. 10% OFF or ৳500 OFF)"
                    className="flex-1 rounded-sm border border-[#E8E2D8] px-3.5 py-2 text-xs font-bold outline-none focus:border-[#141715]"
                  />
                  <button
                    onClick={() => {
                      if (!newPromoCode.trim()) return;
                      setPromos([
                        ...promos,
                        {
                          code: newPromoCode.trim(),
                          discount: newPromoDiscount.trim() || "10% OFF",
                          type: "percent",
                          minSpend: "৳3,000",
                          active: true,
                        },
                      ]);
                      setNewPromoCode("");
                      setNewPromoDiscount("");
                    }}
                    className="rounded-sm bg-[#141715] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors shrink-0 cursor-pointer"
                  >
                    Add Coupon
                  </button>
                </div>
              </div>

              {/* Active Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {promos.map((pr, idx) => (
                  <div key={pr.code} className="rounded-sm border border-[#E8E2D8] bg-white p-4 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-extrabold text-[#141715] bg-[#F4EFEA] px-2.5 py-1 rounded-xs border border-[#E8E2D8]">
                        {pr.code}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                        Active
                      </span>
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-[#D4A25A]">{pr.discount}</p>
                      <p className="text-xs text-[#7A766F]">Min spend: {pr.minSpend}</p>
                    </div>
                    <button
                      onClick={() => {
                        const copy = [...promos];
                        copy.splice(idx, 1);
                        setPromos(copy);
                      }}
                      className="text-[11px] font-bold text-red-600 hover:underline block pt-1 cursor-pointer"
                    >
                      Delete Voucher
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}



          {tab === "reviews" && (
            <>
              <SectionHeader
                title="Reviews"
                subtitle={`${reviews.length} customer review${reviews.length === 1 ? "" : "s"}`}
                action={<button onClick={() => refetchReviews()} className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted">Refresh</button>}
              />

              {reviewsLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">No reviews yet.</div>
              ) : (
                <div className="grid gap-4">
                  {reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl border border-border bg-background p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">by {r.user_name}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-widest">{r.product_slug}</span>
                          </div>
                          <h3 className="mt-2 font-display text-lg">{r.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                          <p className="mt-2 text-[11px] text-muted-foreground">{new Date(r.created_at).toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(r.id)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-destructive transition-colors hover:bg-destructive/10"
                          aria-label="Delete review"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Printable Dispatch Invoice & Packing Slip Modal */}
      {selectedInvoiceOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setSelectedInvoiceOrder(null)}
        >
          <div
            className="w-full max-w-2xl rounded-md border border-[#E8E2D8] bg-white p-6 sm:p-8 shadow-2xl space-y-6 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#D4A25A] block">
                  JNS FURNISHING ATELIER
                </span>
                <h2 className="text-xl font-extrabold text-[#141715]">Dispatch Invoice & Packing Slip</h2>
                <p className="text-xs text-[#7A766F] mt-0.5">
                  Order Ref: <strong className="text-[#141715] font-mono">{selectedInvoiceOrder.order_number}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-[#141715] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#E8E2D8] hover:bg-[#FAF9F6] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Recipient & Payment Box */}
            <div className="grid grid-cols-2 gap-4 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 text-xs">
              <div className="space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#7A766F] block text-[10px]">
                  Customer Recipient:
                </span>
                <p className="font-extrabold text-sm text-[#141715]">{selectedInvoiceOrder.customer_name}</p>
                <p className="font-medium text-[#141715]">{selectedInvoiceOrder.phone}</p>
                <p className="text-[#7A766F] leading-relaxed">📍 {selectedInvoiceOrder.address}, {selectedInvoiceOrder.city}</p>
              </div>
              <div className="space-y-1 sm:text-right">
                <span className="font-bold uppercase tracking-wider text-[#7A766F] block text-[10px]">
                  Payment & Dispatch:
                </span>
                <p className="font-bold text-[#141715]">Cash on Delivery (COD)</p>
                <p className="text-[#7A766F]">Date: {new Date(selectedInvoiceOrder.created_at).toLocaleDateString("en-GB")}</p>
                <p className="text-[#D4A25A] font-bold">Status: {selectedInvoiceOrder.status.toUpperCase()}</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-[#E8E2D8] rounded-sm overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#F4EFEA] text-[10px] font-bold uppercase tracking-wider text-[#7A766F] border-b border-[#E8E2D8]">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5 text-center">Qty</th>
                    <th className="p-2.5 text-right">Unit Price</th>
                    <th className="p-2.5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D8]">
                  {selectedInvoiceOrder.items.map((it: OrderItem) => (
                    <tr key={it.slug}>
                      <td className="p-2.5 font-bold text-[#141715]">{it.name}</td>
                      <td className="p-2.5 text-center font-semibold">{it.qty}</td>
                      <td className="p-2.5 text-right">৳{it.price.toLocaleString("en-BD")}</td>
                      <td className="p-2.5 text-right font-extrabold text-[#141715]">
                        ৳{(it.price * it.qty).toLocaleString("en-BD")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-[#FAF9F6] border-t border-[#E8E2D8] font-bold text-xs">
                  <tr>
                    <td colSpan={3} className="p-2.5 text-right uppercase tracking-wider">Total Payable (COD):</td>
                    <td className="p-2.5 text-right text-sm font-extrabold text-[#141715]">
                      ৳{Number(selectedInvoiceOrder.total).toLocaleString("en-BD")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="border-t border-[#E8E2D8] pt-3 flex items-center justify-between text-[11px] text-[#7A766F]">
              <span>JNS Furnishing Atelier · Dhaka, Bangladesh</span>
              <span>Hotline: +880 1700-000000</span>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
          <div className="flex max-h-[95vh] w-full max-w-2xl flex-col rounded-t-2xl bg-background shadow-xl sm:rounded-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5">
              <h3 className="truncate font-display text-xl sm:text-2xl">
                {editing.mode === "create" ? "New product" : `Edit ${editing.originalSlug}`}
              </h3>
              <button onClick={() => setEditing(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
              {error && (
                <div className="mb-4 rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-bold">
                  ⚠️ {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Slug" value={editing.product.slug} onChange={(v) => setEditing({ ...editing, product: { ...editing.product, slug: v } })} placeholder="e.g. belgian-flax-linen" />
                <Field label="Name" value={editing.product.name} onChange={(v) => setEditing({ ...editing, product: { ...editing.product, name: v } })} placeholder="e.g. Belgian Flax Linen Curtain" />
                <Field label="Brand" value={editing.product.brand} onChange={(v) => setEditing({ ...editing, product: { ...editing.product, brand: v } })} placeholder="JNS Furnishing" />
                <Field label="Price (display)" value={editing.product.price} onChange={(v) => setEditing({ ...editing, product: { ...editing.product, price: v } })} placeholder="৳2,490" />
                <Field label="Tag" value={editing.product.tag} onChange={(v) => setEditing({ ...editing, product: { ...editing.product, tag: v } })} placeholder="e.g. 100% Blackout" />
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground">Category</label>
                  <select
                    value={editing.product.category}
                    onChange={(e) => setEditing({ ...editing, product: { ...editing.product, category: e.target.value as Product["category"] } })}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  >
                    <option value="fragrance">Curtains & Drapery</option>
                    <option value="body">Bedding & Linens</option>
                    <option value="skin">Sofa & Living Covers</option>
                    <option value="hair">Fabrics by Yard</option>
                  </select>
                </div>
                {/* S3 Primary Thumbnail Photo Upload */}
                <div className="sm:col-span-2 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#141715]">
                      Primary Thumbnail Photo (S3 Bucket)
                    </label>
                    <span className="text-[10px] font-bold text-[#D4A25A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs">
                      Bucket: brnnd
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="h-20 w-20 shrink-0 rounded-sm border border-[#E8E2D8] bg-white overflow-hidden flex items-center justify-center">
                      {(previewMain || editing.product.img) ? (
                        <img
                          src={previewMain || editing.product.img}
                          alt="Thumbnail preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            if (previewMain) (e.currentTarget as HTMLImageElement).src = previewMain;
                          }}
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-[#7A766F]" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 rounded-sm bg-[#141715] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors cursor-pointer shrink-0">
                          {uploadingMain ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              <span>Uploading to S3...</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="h-3.5 w-3.5" />
                              <span>Upload Photo to S3</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingMain}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, "main");
                            }}
                          />
                        </label>
                        <span className="text-[11px] text-[#7A766F]">Direct push to S3 CDN</span>
                      </div>

                      <input
                        type="text"
                        value={editing.product.img}
                        onChange={(e) => setEditing({ ...editing, product: { ...editing.product, img: e.target.value } })}
                        placeholder="https://content.zambic.com/products/... or /products/..."
                        className="w-full rounded-sm border border-[#E8E2D8] bg-white px-3 py-1.5 text-xs font-mono outline-none focus:border-[#141715]"
                      />
                    </div>
                  </div>
                </div>

                {/* S3 3-Gallery Photos Upload Suite */}
                <div className="sm:col-span-2 rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#141715]">
                        3 Additional Gallery Showcase Photos
                      </label>
                      <p className="text-[11px] text-[#7A766F]">
                        Upload 3 high-res angles (Texture Macro, Room Staging, Pleat Detail) to S3.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {[0, 1, 2].map((slotIdx) => {
                      const galleryItems = editing.product.ugc_videos || [];
                      const slotUrl = galleryItems[slotIdx] || "";
                      const localPreview = previewGallery[slotIdx];
                      const activeSrc = localPreview || slotUrl;
                      const isUploading = uploadingGallery === slotIdx;
                      const slotTitles = ["1. Texture Macro", "2. Room Staging", "3. Drape Angle"];

                      return (
                        <div key={slotIdx} className="rounded-sm border border-[#E8E2D8] bg-white p-3 space-y-2 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-[#141715]">{slotTitles[slotIdx]}</span>
                            {activeSrc && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...galleryItems];
                                  updated.splice(slotIdx, 1);
                                  setPreviewGallery((prev) => {
                                    const copy = [...prev];
                                    copy[slotIdx] = null;
                                    return copy;
                                  });
                                  setEditing({ ...editing, product: { ...editing.product, ugc_videos: updated } });
                                }}
                                className="text-[10px] text-red-600 hover:underline font-bold"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="h-28 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] overflow-hidden flex items-center justify-center relative">
                            {activeSrc ? (
                              <img
                                src={activeSrc}
                                alt={`Gallery slot ${slotIdx + 1}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  if (localPreview) (e.currentTarget as HTMLImageElement).src = localPreview;
                                }}
                              />
                            ) : (
                              <div className="text-center p-2">
                                <ImageIcon className="h-6 w-6 text-[#7A766F] mx-auto mb-1 opacity-50" />
                                <span className="text-[10px] text-[#7A766F] block">Empty Slot {slotIdx + 1}</span>
                              </div>
                            )}
                          </div>

                          <label className="flex items-center justify-center gap-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] hover:bg-[#F4EFEA] py-1.5 text-[11px] font-bold text-[#141715] transition-colors cursor-pointer">
                            {isUploading ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Pushing S3...</span>
                              </>
                            ) : (
                              <>
                                <UploadCloud className="h-3 w-3 text-[#D4A25A]" />
                                <span>{activeSrc ? "Replace" : "Upload to S3"}</span>
                              </>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, slotIdx);
                              }}
                            />
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground">Notes</label>
                  <textarea
                    value={editing.product.notes}
                    onChange={(e) => setEditing({ ...editing, product: { ...editing.product, notes: e.target.value } })}
                    rows={2}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                  />
                </div>
                <TextArea label="Description" value={editing.product.description ?? ""} rows={4}
                  onChange={(v) => setEditing({ ...editing, product: { ...editing.product, description: v } })} />
                <TextArea label="Details" value={editing.product.details ?? ""} rows={4}
                  onChange={(v) => setEditing({ ...editing, product: { ...editing.product, details: v } })} />
                <TextArea label="How to use" value={editing.product.how_to_use ?? ""} rows={3}
                  onChange={(v) => setEditing({ ...editing, product: { ...editing.product, how_to_use: v } })} />
                <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
                  <Field label="Shipping card" value={editing.product.shipping_text ?? ""}
                    onChange={(v) => setEditing({ ...editing, product: { ...editing.product, shipping_text: v } })}
                    placeholder="Over ৳5,000" />
                  <Field label="Authenticity card" value={editing.product.authenticity_text ?? ""}
                    onChange={(v) => setEditing({ ...editing, product: { ...editing.product, authenticity_text: v } })}
                    placeholder="Sourced direct" />
                  <Field label="Returns card" value={editing.product.returns_text ?? ""}
                    onChange={(v) => setEditing({ ...editing, product: { ...editing.product, returns_text: v } })}
                    placeholder="No questions" />
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-[#E8E2D8] bg-[#FAF9F6] px-5 py-4 sm:px-8">
              <div className="text-left min-w-0 flex-1">
                {error && <p className="text-xs text-red-600 font-bold truncate">⚠️ {error}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    setPreviewMain(null);
                    setPreviewGallery([null, null, null]);
                  }}
                  className="rounded-sm border border-[#E8E2D8] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-sm bg-[#141715] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors disabled:opacity-60 cursor-pointer shadow-xs"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  <span>{saving ? "Saving..." : "Save Product"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  items,
  tab,
  onSelect,
}: {
  items: { key: Tab; label: string; icon: typeof Package; count: number }[];
  tab: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <ul className="space-y-1.5">
      {items.map((it) => {
        const Icon = it.icon;
        const active = tab === it.key;
        return (
          <li key={it.key}>
            <button
              onClick={() => onSelect(it.key)}
              className={`flex w-full items-center justify-between gap-2 rounded-sm px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                active ? "bg-[#141715] text-white shadow-xs" : "text-[#7A766F] hover:bg-[#F4EFEA] hover:text-[#141715]"
              }`}
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{it.label}</span>
              </span>
              <span className={`shrink-0 rounded-xs px-2 py-0.5 text-[10px] font-extrabold ${active ? "bg-white/20 text-white" : "bg-[#F4EFEA] text-[#141715]"}`}>
                {it.count}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#E8E2D8] pb-4">
      <div className="min-w-0">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#141715]">{title}</h2>
        <p className="mt-0.5 text-xs text-[#7A766F]">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
