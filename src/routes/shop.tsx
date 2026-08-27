import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import {
  Star,
  ShoppingBag,
  Search,
  Heart,
  SlidersHorizontal,
  X,
  Check,
  RotateCcw,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { listProductsFn, type Product } from "@/lib/products.functions";
import { listReviewStatsFn, type ReviewStat } from "@/lib/reviews.functions";
import { useCart } from "@/hooks/use-cart";
import { formatPriceBDT, parsePriceNumber } from "@/lib/jns-helpers";

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProductsFn(),
});

const reviewStatsQueryOptions = queryOptions({
  queryKey: ["review-stats"],
  queryFn: () => listReviewStatsFn(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category?: string; room?: string } => {
    return {
      category: (search.category as string) || "all",
      room: (search.room as string) || "",
    };
  },
  head: () => ({
    meta: [
      { title: "Catalog & Collections — JNS Furnishing" },
      { name: "description", content: "Explore the complete JNS Furnishing collection — bespoke curtains, Egyptian cotton bedding, stretch sofa covers, and luxury upholstery fabrics." },
      { property: "og:title", content: "Catalog & Collections — JNS Furnishing" },
      { property: "og:description", content: "Explore bespoke curtains, Egyptian cotton bedding, stretch sofa covers, and luxury upholstery fabrics in Bangladesh." },
    ],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQueryOptions);
    context.queryClient.ensureQueryData(reviewStatsQueryOptions);
  },
  component: Shop,
});

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
              // Fallback to high-res drape photo if image link fails
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

type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

function Shop() {
  const searchParams = useSearch({ from: "/shop" });
  const { data: products } = useSuspenseQuery(productsQueryOptions);

  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.category || "all");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams.category) {
      setSelectedCategory(searchParams.category);
    }
  }, [searchParams.category]);

  const categories = [
    { key: "all", label: "All Textiles" },
    { key: "fragrance", label: "Curtains & Drapery" },
    { key: "body", label: "Bedding & Linens" },
    { key: "skin", label: "Sofa Covers & Living" },
    { key: "hair", label: "Table Linen & Fabrics" },
  ];

  const materials = [
    { key: "all", label: "All Materials" },
    { key: "blackout", label: "100% Blackout Weave" },
    { key: "linen", label: "Belgian Flax Linen" },
    { key: "cotton", label: "Egyptian Cotton" },
    { key: "velvet", label: "Plush Velvet" },
    { key: "jacquard", label: "Stretch Jacquard" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedMaterial !== "all") {
      const q = selectedMaterial.toLowerCase();
      list = list.filter((p) =>
        p.notes.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") {
      list.sort((a, b) => parsePriceNumber(a.price) - parsePriceNumber(b.price));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => parsePriceNumber(b.price) - parsePriceNumber(a.price));
    }

    return list;
  }, [products, selectedCategory, selectedMaterial, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedMaterial("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Banner Header */}
      <div className="border-b border-[#E8E2D8] bg-[#F4EFE6] py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-3">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#2E473A] font-semibold">Catalog</span>
            {selectedCategory !== "all" && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">
                  {categories.find((c) => c.key === selectedCategory)?.label}
                </span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1A1A1A]">
                The Textile Showroom
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Explore tailored blackout drapes, pure flax linen sheers, Egyptian cotton bed sets, and architectural upholstery textiles.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-white px-4 py-2 text-xs font-semibold text-[#2E473A] shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#D4A25A]" /> Showing {filteredProducts.length} Premium Items
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Products */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Controls Bar for mobile & search */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by fabric, style, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#E8E2D8] bg-white pl-10 pr-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded-full border border-[#E8E2D8] bg-white px-4 py-2 text-xs font-semibold text-foreground hover:bg-[#F4EFE6]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#D4A25A]" /> Filters
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-[#E8E2D8] bg-white px-4 py-2 text-xs font-medium outline-none focus:border-[#D4A25A]"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 pr-4">
            <div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider text-xs">
                Categories
              </h3>
              <div className="mt-3 space-y-1">
                {categories.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setSelectedCategory(c.key)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      selectedCategory === c.key
                        ? "bg-[#2E473A] text-white font-semibold"
                        : "text-foreground/80 hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <span>{c.label}</span>
                    {selectedCategory === c.key && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-[#1A1A1A] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider text-xs">
                Material & Texture
              </h3>
              <div className="mt-3 space-y-1">
                {materials.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setSelectedMaterial(m.key)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      selectedMaterial === m.key
                        ? "bg-[#2E473A] text-white font-semibold"
                        : "text-foreground/80 hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <span>{m.label}</span>
                    {selectedMaterial === m.key && <Check className="h-3.5 w-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Concierge Promo Card in Sidebar */}
            <div className="rounded-2xl border border-[#D4A25A]/40 bg-[#2E473A] p-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A25A]">Bespoke Order</span>
              <h4 className="font-serif text-lg font-bold mt-1 text-[#FAF9F6]">Need Custom Sizing?</h4>
              <p className="mt-2 text-xs text-[#EADCC8] leading-relaxed">
                Use our interactive curtain calculator to tailor drapes to your exact window specifications.
              </p>
              <Link
                to="/custom"
                className="mt-4 block text-center rounded-full bg-[#D4A25A] py-2 text-xs font-bold text-[#1A1A1A] hover:bg-[#E5BE78]"
              >
                Launch Calculator
              </Link>
            </div>

            {(selectedCategory !== "all" || selectedMaterial !== "all" || searchQuery) && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 w-full rounded-full border border-[#E8E2D8] bg-white py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset All Filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#E8E2D8] bg-white p-12 text-center">
                <Search className="h-10 w-10 text-muted-foreground mx-auto" />
                <h3 className="font-serif text-xl font-semibold mt-3 text-foreground">No matching furnishings</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Try relaxing your search terms or resetting filters to explore our full collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-6 py-2 text-xs font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#E8E2D8] bg-[#FAF9F6] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
              <h3 className="font-serif text-lg font-bold text-foreground">Filter Catalog</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E2D8]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#D4A25A]">Category</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelectedCategory(c.key)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium text-left ${
                        selectedCategory === c.key
                          ? "border-[#2E473A] bg-[#2E473A] text-white"
                          : "border-[#E8E2D8] bg-white text-foreground"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#D4A25A]">Material</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {materials.map((m) => (
                    <button
                      key={m.key}
                      onClick={() => setSelectedMaterial(m.key)}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium text-left ${
                        selectedMaterial === m.key
                          ? "border-[#2E473A] bg-[#2E473A] text-white"
                          : "border-[#E8E2D8] bg-white text-foreground"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#E8E2D8]">
                <button
                  onClick={resetFilters}
                  className="flex-1 rounded-full border border-[#E8E2D8] py-2.5 text-xs font-semibold"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-full bg-[#2E473A] py-2.5 text-xs font-bold text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
