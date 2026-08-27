import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useMemo, useRef, useState, useEffect } from "react";
import { queryOptions, useSuspenseQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  Minus,
  Plus,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Pencil,
  Ruler,
  Check,
  Sparkles,
  Info,
  ChevronRight,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { listProductsFn, getProductFn, type Product } from "@/lib/products.functions";
import { listReviewsFn, submitReviewFn } from "@/lib/reviews.functions";
import { userMeFn } from "@/lib/auth.functions";
import { useCart } from "@/hooks/use-cart";
import { formatPriceBDT, parsePriceNumber, calculateCustomCurtainPrice } from "@/lib/jns-helpers";

const productQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: () => getProductFn({ data: { slug } }),
  });

const allProductsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProductsFn(),
});

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params, context }) => {
    const product = await context.queryClient.ensureQueryData(productQueryOptions(params.slug));
    if (!product) throw notFound();
    context.queryClient.ensureQueryData(allProductsQueryOptions);
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — JNS Furnishing` },
      { property: "og:title", content: `${params.slug} — JNS Furnishing` },
    ],
  }),
  notFoundComponent: ProductNotFound,
  errorComponent: ProductError,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl text-foreground">Furnishing Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The item you are looking for may have been archived or moved.</p>
        <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white">
          Back to Catalog
        </Link>
      </div>
      <SiteFooter />
    </div>
  );
}

function ProductError({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <SiteHeader />
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <p className="text-xl font-bold text-[#141715]">Something went wrong loading this product.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-4 rounded-sm bg-[#141715] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A]"
        >
          Try Again
        </button>
      </div>
      <SiteFooter />
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();
  const [isSaved, setIsSaved] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(p, 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  return (
    <div className="group relative flex flex-col text-left">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="block overflow-hidden relative rounded-sm sm:rounded-md border border-[#E8E2D8]/80 bg-[#F3EFEA]">
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img
            src={p.img || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"}
            alt={p.name}
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80";
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {p.tag && (
            <span className="absolute left-2 top-2 sm:left-3 sm:top-3 bg-[#141715] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-white rounded-xs">
              {p.tag}
            </span>
          )}
          <button
            type="button"
            aria-label="Save to Wishlist"
            onClick={handleSave}
            className={`absolute right-2 top-2 sm:right-3 sm:top-3 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/95 text-foreground shadow-xs transition-all hover:scale-110 ${
              isSaved ? "text-red-500 fill-red-500" : "text-[#7A766F] hover:text-[#141715]"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSaved ? "fill-current" : ""}`} strokeWidth={1.5} />
          </button>
        </div>
      </Link>

      <div className="pt-2.5 sm:pt-3.5 space-y-1 sm:space-y-1.5">
        <Link
          to="/product/$slug"
          params={{ slug: p.slug }}
          className="block font-bold text-xs sm:text-base text-[#141715] hover:text-[#D4A25A] transition-colors leading-snug line-clamp-1"
        >
          {p.name}
        </Link>
        <p className="text-[11px] sm:text-[13px] text-[#7A766F] line-clamp-1">{p.notes || `${p.brand} · ${p.category}`}</p>
        
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm sm:text-lg font-extrabold text-[#141715]">{formatPriceBDT(p.price)}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#141715] text-white hover:bg-[#2E473A] transition-colors cursor-pointer"
            title="Add to Bag"
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const COLOR_SWATCHES = [
  { name: "Oatmeal Beige", hex: "#E8DFC8" },
  { name: "Forest Olive", hex: "#3D4A3A" },
  { name: "Champagne Gold", hex: "#D4A25A" },
  { name: "Slate Charcoal", hex: "#2B2E2C" },
  { name: "Pure Ivory", hex: "#F7F5EE" },
];

const PLEAT_STYLES = [
  { id: "eyelet", name: "Eyelet (Grommet)", desc: "Modern wave fold on rod" },
  { id: "pinch-pleat", name: "Double Pinch Pleat", desc: "Classic tailored hotel drape" },
  { id: "wave-fold", name: "S-Fold Wave", desc: "Contemporary architectural fold" },
  { id: "rod-pocket", name: "Rod Pocket", desc: "Casual gathered style" },
];

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQueryOptions(slug));
  const { data: allProducts } = useSuspenseQuery(allProductsQueryOptions);
  const { addItem } = useCart();
  const queryClient = useQueryClient();

  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[0].name);
  const [selectedPleat, setSelectedPleat] = useState("eyelet");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customWidth, setCustomWidth] = useState(52);
  const [customHeight, setCustomHeight] = useState(84);
  const [added, setAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "shipping">("details");
  const [selectedImage, setSelectedImage] = useState<string>(product?.img || "");

  useEffect(() => {
    if (product?.img) {
      setSelectedImage(product.img);
    }
  }, [product?.img]);

  // Review Form
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  const { data: userMe } = useQuery({ queryKey: ["me"], queryFn: () => userMeFn() });
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", slug],
    queryFn: () => listReviewsFn({ data: { slug } }),
  });

  const submitReview = useServerFn(submitReviewFn);

  if (!product) return <ProductNotFound />;

  const isCurtain = product.category === "fragrance" || product.slug.includes("curtain") || product.slug.includes("drape");
  const baseUnitPrice = parsePriceNumber(product.price);

  const uploadedGallery = Array.isArray(product.ugc_videos)
    ? product.ugc_videos.filter((s) => typeof s === "string" && s.trim().length > 0)
    : [];

  const galleryImages = [
    product.img,
    ...(uploadedGallery.length > 0
      ? uploadedGallery
      : [
          "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&w=1200&q=85",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
        ]),
  ].slice(0, 4);

  const customCalc = useMemo(() => {
    return calculateCustomCurtainPrice({
      widthInches: customWidth,
      heightInches: customHeight,
      pleatStyle: selectedPleat as any,
    });
  }, [customWidth, customHeight, selectedPleat]);

  const effectiveUnitPrice = isCustomMode ? customCalc.totalPrice : baseUnitPrice;
  const totalPrice = effectiveUnitPrice * qty;

  const handleAddToCart = () => {
    const customDetails = isCustomMode
      ? `Custom ${customWidth}"W x ${customHeight}"L · ${selectedPleat} · ${selectedColor}`
      : `${selectedColor} · ${selectedPleat}`;

    const cartProduct: Product = {
      ...product,
      name: `${product.name} (${selectedColor})`,
      price: `৳${effectiveUnitPrice}`,
    };

    addItem(cartProduct, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    setSubmittingReview(true);
    try {
      await submitReview({
        data: {
          slug,
          rating: reviewRating,
          title: reviewTitle,
          body: reviewBody,
        },
      });
      setShowReviewModal(false);
      setReviewTitle("");
      setReviewBody("");
      queryClient.invalidateQueries({ queryKey: ["reviews", slug] });
    } catch (err: any) {
      setReviewError(err?.message || "Please sign in to submit a review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const recommendations = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8E2D8] bg-white/60 py-2.5 px-3.5 sm:px-8 lg:px-12 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="text-foreground font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="mx-auto max-w-7xl px-3.5 sm:px-8 lg:px-12 py-5 sm:py-10">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
          
          {/* Left Column: Product Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#F4EFEA] shadow-xs">
              <img
                src={selectedImage || product.img}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {product.tag && (
                <span className="absolute left-3 top-3 rounded-xs bg-[#141715] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail preview row with Interactive Selection */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {galleryImages.map((imgSrc, idx) => {
                const isCurrent = (selectedImage || product.img) === imgSrc;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgSrc)}
                    className={`aspect-square rounded-sm sm:rounded-md overflow-hidden bg-[#F4EFEA] transition-all cursor-pointer ${
                      isCurrent
                        ? "border-2 border-[#141715] ring-2 ring-[#141715]/20 opacity-100"
                        : "border border-[#E8E2D8] opacity-75 hover:opacity-100 hover:border-[#141715]"
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Details & Customizers */}
          <div className="space-y-4 sm:space-y-6 text-left">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4A25A]">{product.brand}</span>
                <div className="flex items-center gap-1">
                  <div className="flex text-[#D4A25A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold ml-1">5.0</span>
                  <span className="text-xs text-muted-foreground">({reviews.length + 8})</span>
                </div>
              </div>

              <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#141715] leading-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#7A766F] leading-relaxed">
                {product.description || "Masterfully tailored home textile woven with premier quality yarns and finished for durability, effortless drape, and lasting comfort."}
              </p>
            </div>

            {/* Price Display */}
            <div className="rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 sm:p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground block">{isCustomMode ? "Custom Size Price" : "Standard Price"}</span>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#141715]">{formatPriceBDT(effectiveUnitPrice)}</p>
              </div>
              <span className="rounded-xs bg-[#141715] px-2.5 py-1 text-[10px] sm:text-xs font-bold text-white">
                In Stock · Atelier Crafted
              </span>
            </div>

            {/* Custom Sizing Mode Toggle (for curtains / textiles) */}
            {isCurtain && (
              <div className="rounded-md sm:rounded-lg border border-[#D4A25A]/60 bg-white p-3.5 sm:p-5 space-y-3 sm:space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4.5 w-4.5 text-[#D4A25A]" />
                    <span className="font-bold text-sm sm:text-base text-[#141715]">Bespoke Window Sizing</span>
                  </div>
                  <button
                    onClick={() => setIsCustomMode(!isCustomMode)}
                    className={`rounded-sm px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isCustomMode
                        ? "bg-[#141715] text-white"
                        : "border border-[#E8E2D8] bg-[#FAF9F6] text-[#141715] hover:bg-[#F4EFEA]"
                    }`}
                  >
                    {isCustomMode ? "Custom Mode: Active" : "Enable Custom Sizing"}
                  </button>
                </div>

                {isCustomMode ? (
                  <div className="space-y-3 pt-2 border-t border-[#E8E2D8]">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-[#141715]">Width (Inches)</label>
                        <input
                          type="number"
                          min="24"
                          max="200"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(Number(e.target.value) || 24)}
                          className="mt-1 w-full rounded-sm border border-[#E8E2D8] px-3 py-1.5 text-sm font-semibold outline-none focus:border-[#141715]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#141715]">Height (Inches)</label>
                        <input
                          type="number"
                          min="36"
                          max="160"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(Number(e.target.value) || 36)}
                          className="mt-1 w-full rounded-sm border border-[#E8E2D8] px-3 py-1.5 text-sm font-semibold outline-none focus:border-[#141715]"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <Info className="h-3.5 w-3.5 text-[#D4A25A] shrink-0" /> Sizing estimated for {customCalc.panels} full drape panel(s). Ready in {customCalc.estimatedDays}.
                    </p>
                  </div>
                ) : (
                  <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                    Standard dimension: 52" Width x 84" Length (2 Panels included). Toggle custom mode to specify exact window height & width.
                  </p>
                )}
              </div>
            )}

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#141715]">
                  Color Shade: <span className="font-semibold text-[#D4A25A]">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3">
                {COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedColor(swatch.name)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-105 cursor-pointer ${
                      selectedColor === swatch.name ? "border-[#141715] ring-2 ring-[#D4A25A]" : "border-[#E8E2D8]"
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                    aria-label={`Select ${swatch.name}`}
                  >
                    {selectedColor === swatch.name && (
                      <Check className="h-3.5 w-3.5 text-white drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pleat / Header Style */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#141715]">Header / Pleat Style</span>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {PLEAT_STYLES.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedPleat(style.id)}
                    className={`rounded-sm sm:rounded-md border p-2.5 sm:p-3 text-left transition-all cursor-pointer ${
                      selectedPleat === style.id
                        ? "border-[#141715] bg-[#141715] text-white"
                        : "border-[#E8E2D8] bg-white text-[#141715] hover:bg-[#FAF9F6]"
                    }`}
                  >
                    <p className="font-bold text-xs">{style.name}</p>
                    <p className={`text-[10px] mt-0.5 ${selectedPleat === style.id ? "text-[#EADCC8]" : "text-muted-foreground"}`}>{style.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Responsive Quantity & Add to Bag Bar */}
            <div className="flex items-center gap-2 sm:gap-3 pt-3 border-t border-[#E8E2D8]">
              {/* Stepper */}
              <div className="flex items-center rounded-sm border border-[#E8E2D8] bg-white h-11 shrink-0">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-11 w-9 items-center justify-center text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center font-bold text-xs sm:text-sm text-[#141715]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex h-11 w-9 items-center justify-center text-[#141715] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-[#141715] h-11 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2E473A] cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-[#D4A25A]" />
                <span className="truncate">{added ? "Added to Bag!" : `Add to Bag · ${formatPriceBDT(totalPrice)}`}</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D8] bg-white transition-colors cursor-pointer ${
                  isSaved ? "text-red-500 fill-red-500" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#E8E2D8] text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#D4A25A] shrink-0" />
                <span>100% Quality Assured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-[#D4A25A] shrink-0" />
                <span>Free Delivery Over ৳5k</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-[#D4A25A] shrink-0" />
                <span>7-Day Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#D4A25A] shrink-0" />
                <span>Free Swatch in Dhaka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specifications & Customer Reviews */}
        <div className="mt-14 sm:mt-20 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left">
          <div className="flex gap-6 sm:gap-8 border-b border-[#E8E2D8] pb-3 overflow-x-auto whitespace-nowrap scrollbar-none">
            <button
              onClick={() => setActiveTab("details")}
              className={`text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${
                activeTab === "details" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Product Details & Fabric
            </button>
            <button
              onClick={() => setActiveTab("care")}
              className={`text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${
                activeTab === "care" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Care & Maintenance
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`text-sm sm:text-base font-bold transition-colors pb-2 -mb-3 cursor-pointer ${
                activeTab === "shipping" ? "text-[#141715] border-b-2 border-[#141715]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Shipping & Installation
            </button>
          </div>

          <div className="py-6 sm:py-8 max-w-3xl text-xs sm:text-sm leading-relaxed text-[#141715]">
            {activeTab === "details" && (
              <div className="space-y-4">
                <p>{product.details || "Handcrafted using dense woven yarn with precision reinforced seams. Tested to maintain structural integrity and color luster across years of everyday use."}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-md border border-[#E8E2D8] bg-white p-4 text-xs">
                  <div>
                    <span className="font-bold text-[#141715]">Composition:</span>
                    <p className="text-[#7A766F] mt-0.5">{product.notes}</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#141715]">Origin & Craft:</span>
                    <p className="text-[#7A766F] mt-0.5">Handcrafted in JNS Atelier, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="space-y-4">
                <p>{product.how_to_use || "Machine wash gentle in cold water using mild, bleach-free detergent. For best results, hang dry naturally or low-heat vertical steaming."}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#7A766F]">
                  <li>Do not use chlorine bleach or harsh chemical spot removers.</li>
                  <li>Iron on reverse side on low-medium synthetic/linen setting.</li>
                  <li>For velvet fabrics, vertical garment steam or professional dry clean is recommended.</li>
                </ul>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <p>{product.shipping_text || "We ship to all 64 districts in Bangladesh via verified insured courier services (Pathao, Steadfast, RedX)."}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-md border border-[#E8E2D8] bg-white p-4">
                    <span className="font-bold text-[#141715]">Dhaka City:</span>
                    <p className="text-[#7A766F] mt-1">2 - 3 business days (Home delivery: ৳80 or Free over ৳5,000).</p>
                  </div>
                  <div className="rounded-md border border-[#E8E2D8] bg-white p-4">
                    <span className="font-bold text-[#141715]">Outside Dhaka:</span>
                    <p className="text-[#7A766F] mt-1">3 - 5 business days (Doorstep courier: ৳150).</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-12 sm:mt-16 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#141715]">Verified Client Reviews</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Direct feedback from homeowners across Bangladesh.</p>
            </div>
            <button
              onClick={() => {
                if (!userMe?.user) {
                  alert("Please sign in to write a review");
                  return;
                }
                setShowReviewModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#141715] bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#141715] hover:text-white transition-all cursor-pointer w-full sm:w-auto"
            >
              <Pencil className="h-3.5 w-3.5" /> Write a Review
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E8E2D8] bg-white p-8 text-center md:col-span-2">
                <Star className="h-8 w-8 text-[#D4A25A] mx-auto" />
                <p className="font-serif text-lg font-semibold mt-2">Be the first to review this furnishing</p>
                <p className="text-xs text-muted-foreground mt-1">Share your experience with quality, sizing, and drape.</p>
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="rounded-2xl border border-[#E8E2D8] bg-white p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-foreground">{rev.user_name}</span>
                    <div className="flex text-[#D4A25A]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground mt-2">{rev.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rev.body}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        {recommendations.length > 0 && (
          <div className="mt-14 sm:mt-20 border-t border-[#E8E2D8] pt-8 sm:pt-12 text-left space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#141715]">
              Complete the Look
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
              {recommendations.map((rec) => (
                <ProductCard key={rec.slug} p={rec} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[#E8E2D8] bg-[#FAF9F6] p-6 shadow-2xl">
            <h3 className="font-serif text-2xl font-bold text-foreground">Write a Review</h3>
            <p className="text-xs text-muted-foreground mt-1">Reviewing: {product.name}</p>

            {reviewError && (
              <div className="mt-3 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600">
                {reviewError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Rating</label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setReviewRating(num)}
                      className={`p-1.5 rounded-lg border ${
                        reviewRating >= num ? "border-[#D4A25A] text-[#D4A25A]" : "border-[#E8E2D8] text-muted-foreground"
                      }`}
                    >
                      <Star className="h-5 w-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Blackout Quality & Drape"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Your Experience</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about the fabric softness, sizing accuracy, stitching..."
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-white px-3.5 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="rounded-full border border-[#E8E2D8] px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="rounded-full bg-[#2E473A] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#1E3127] disabled:opacity-50"
                >
                  {submittingReview ? "Submitting..." : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
