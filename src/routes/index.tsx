import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Star,
  Sparkles,
  Heart,
  ShoppingBag,
  Ruler,
  Check,
  ShieldCheck,
  Truck,
  Award,
  ChevronRight,
  Send,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/hooks/use-cart";
import { listProductsFn, type Product } from "@/lib/products.functions";
import { listReviewStatsFn, type ReviewStat } from "@/lib/reviews.functions";
import { formatPriceBDT } from "@/lib/jns-helpers";

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProductsFn(),
});

const reviewStatsQueryOptions = queryOptions({
  queryKey: ["review-stats"],
  queryFn: () => listReviewStatsFn(),
  staleTime: 60_000,
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQueryOptions);
    context.queryClient.ensureQueryData(reviewStatsQueryOptions);
  },
  component: Index,
});

function useStatFor(slug: string) {
  const { data } = useQuery(reviewStatsQueryOptions);
  const s = (data ?? []).find((r: ReviewStat) => r.slug === slug);
  return s ? { avg: s.avg, count: s.count } : { avg: 5.0, count: 12 };
}

// Category Cards (Clean Regal/IKEA Circular Category Style)
const categoryCards = [
  {
    name: "Curtains & Drapes",
    sub: "Blackout & Linen",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    categoryKey: "fragrance",
  },
  {
    name: "Bedding Sets",
    sub: "400TC Egyptian Cotton",
    img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=400&q=80",
    categoryKey: "body",
  },
  {
    name: "Sofa Covers",
    sub: "Stretch & Jacquard",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=400&q=80",
    categoryKey: "skin",
  },
  {
    name: "Cushions & Throws",
    sub: "Plush Velvet & Linen",
    img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80",
    categoryKey: "skin",
  },
  {
    name: "Dining & Table",
    sub: "Organic Flax Linens",
    img: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80",
    categoryKey: "hair",
  },
  {
    name: "Custom Sizing",
    sub: "Doorstep Tailoring",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80",
    categoryKey: "fragrance",
  },
];

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

function Index() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      cta2Link: "/custom",
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
      cta2Link: "/shop",
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
      cta2Link: "/lookbook",
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const slide = heroSlides[currentSlide];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const bestSellingProducts = products.slice(0, 4);
  const newArrivalsProducts = products.slice(4, 8);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground font-sans">
      <SiteHeader />

      {/* SECTION 1 — FULL-WIDTH HIGH-IMPACT CAMPAIGN HERO BANNER (Regal / IKEA Style) */}
      <section className="bg-[#FAF9F6] pt-3 sm:pt-6 pb-8 sm:pb-12 px-3.5 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1440px]">
          
          <div className="relative overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#141715]">
            <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.4/1] min-h-[440px] sm:min-h-[540px] lg:min-h-[620px] w-full overflow-hidden">
              
              {heroSlides.map((s, idx) => (
                <div
                  key={s.title}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    idx === currentSlide
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-105 pointer-events-none z-0"
                  }`}
                >
                  {/* Crystal Clear High Quality Room Photo with ZERO ugly dark overlays */}
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover object-center"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />

                  {/* Luxury Editorial Placard Card (Zara Home / West Elm / IKEA Flagship Style) */}
                  <div className="absolute inset-0 flex items-end sm:items-center p-4 sm:p-10 lg:p-14 z-20 pointer-events-none">
                    <div className="w-full sm:max-w-md lg:max-w-lg rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white/95 backdrop-blur-md p-5 sm:p-8 lg:p-9 shadow-xl space-y-3 sm:space-y-4 text-left pointer-events-auto transition-all animate-in fade-in-0 duration-300">
                      
                      {/* Department Eyebrow Tag */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#D4A25A]">
                          {idx === 0 ? "Curtains & Drapery" : idx === 1 ? "Egyptian Bedding" : "Living & Slipcovers"}
                        </span>
                        <span className="text-[#E8E2D8]">•</span>
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#7A766F] uppercase tracking-wider">
                          Atelier 2026
                        </span>
                      </div>

                      {/* Crisp Deep Charcoal Headline in Manrope */}
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-[#141715] leading-snug">
                        {idx === 0
                          ? "Luxury Custom Curtains & Drapery"
                          : idx === 1
                          ? "400TC Egyptian Cotton Bedding"
                          : "Tailored Living & Sofa Covers"}
                      </h1>

                      {/* Editorial Description */}
                      <p className="text-xs sm:text-[13.5px] text-[#5A574F] font-medium leading-relaxed">
                        {idx === 0
                          ? "Triple-weave thermal blackout & Belgian flax linen sheers. Tailored to your exact window drop."
                          : idx === 1
                          ? "Ultra-soft sateen finish and breathable French linen sets for deep, restorative sleep."
                          : "Handcrafted made-to-measure sofa slipcovers and plush velvet cushions."}
                      </p>

                      {/* Price & Offer Bar */}
                      <div className="flex items-center justify-between border-t border-[#E8E2D8]/80 pt-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#8C887F] font-bold block">Starting From</span>
                          <span className="text-sm sm:text-base font-extrabold text-[#141715]">
                            {idx === 0 ? "৳1,850" : idx === 1 ? "৳3,200" : "৳1,650"}
                          </span>
                        </div>

                        {/* Solid Luxury Action CTA */}
                        <Link
                          to={s.cta1Link}
                          className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#141715] px-5 py-2.5 sm:px-6 sm:py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#2E473A]"
                        >
                          <span>{idx === 0 ? "Shop Curtains" : idx === 1 ? "Explore Bedding" : "Shop Living"}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                    </div>
                  </div>

                </div>
              ))}

              {/* Prev / Next Slider Arrows (Hidden on small touchscreens for clean view, visible on sm+) */}
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/80 transition-colors cursor-pointer text-lg"
                aria-label="Previous slide"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
                className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-xs hover:bg-black/80 transition-colors cursor-pointer text-lg"
                aria-label="Next slide"
              >
                ›
              </button>

              {/* Slider Progress Dots Pill */}
              <div className="absolute bottom-3 sm:bottom-6 right-4 sm:right-10 z-30 flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-xs px-3 py-1.5 shadow-md">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 sm:h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide ? "w-6 sm:w-8 bg-[#D4A25A]" : "w-1.5 sm:w-2 bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — ARCHITECTURAL EDITORIAL GRID (Zara Home / West Elm Style) */}
      <section className="py-12 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80 bg-[#FAF9F6]">
        <div className="mx-auto max-w-[1440px] space-y-8 sm:space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 text-left border-b border-[#E8E2D8] pb-4 sm:pb-6">
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]">
                The Atelier Catalogue
              </p>
              <h2 className="text-xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1 sm:mt-1.5">
                Curated Spaces & Collections
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-widest text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1.5"
            >
              <span>View Full Catalogue (24)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Large Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                num: "01",
                name: "Curtains & Drapery",
                desc: "Triple-weave thermal blackout, organic Belgian flax linen & Turkish velvet.",
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
                link: "/shop",
                search: { category: "fragrance" },
                tag: "Custom Sizing",
                cta: "Explore Curtains",
              },
              {
                num: "02",
                name: "Sanctuary Bedding",
                desc: "400TC long-staple Egyptian cotton sateen & French washed linen sets.",
                img: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=1200&q=85",
                link: "/shop",
                search: { category: "body" },
                tag: "Hotel Grade",
                cta: "Explore Bedding",
              },
              {
                num: "03",
                name: "Living & Sofa Covers",
                desc: "Stretch jacquard slipcovers, water-repellent fabrics & plush velvet cushions.",
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
                link: "/shop",
                search: { category: "skin" },
                tag: "Universal Fit",
                cta: "Explore Living",
              },
              {
                num: "04",
                name: "Custom Sizer Atelier",
                desc: "Doorstep measurements across Dhaka with fabric swatches & fitting guarantee.",
                img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
                link: "/custom",
                tag: "Free Doorstep Visit",
                cta: "Book Measurement",
              },
            ].map((dept) => (
              <Link
                key={dept.name}
                to={dept.link}
                search={dept.search}
                className="group relative aspect-[4/3] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-md sm:rounded-lg border border-[#E8E2D8] bg-[#141715] shadow-xs transition-all duration-500 hover:shadow-xl block text-left"
              >
                {/* Real High-Res Photography */}
                <img
                  src={dept.img}
                  alt={dept.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Deep atmospheric overlay for crisp typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-sm bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#141715] shadow-2xs">
                    {dept.tag}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 space-y-2 text-white">
                  <span className="font-mono text-xs font-bold text-[#D4A25A] tracking-wider">
                    {dept.num}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-tight">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-[#EADCC8] line-clamp-2 leading-relaxed">
                    {dept.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#D4A25A] transition-colors">
                    <span>{dept.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — BEST SELLING (Matching Regal Reference) */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80">
        <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-10">
          <div className="flex items-end justify-between text-left">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]">
              Best Selling
            </h2>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1 sm:hidden"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 2-Col Mobile / 4-Col Desktop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {bestSellingProducts.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>

          <div className="pt-2 text-left hidden sm:block">
            <Link
              to="/shop"
              className="inline-flex items-center rounded-sm bg-[#141715] px-7 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#2E473A] transition-colors"
            >
              View all offers
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3 — NEW ARRIVALS (Matching Regal Reference) */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 lg:px-14 border-b border-[#E8E2D8]/80">
        <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-10">
          <div className="flex items-end justify-between text-left">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]">
              New Arrivals
            </h2>
            <Link
              to="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1 sm:hidden"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* 2-Col Mobile / 4-Col Desktop Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {(newArrivalsProducts.length > 0 ? newArrivalsProducts : products.slice(0, 4)).map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — MORE IDEAS AND INSPIRATION (Matching Regal Filter Reference) */}
      <section className="py-10 sm:py-20 px-4 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1440px] space-y-6 sm:space-y-10">
          <div className="text-left space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#141715]">
              More ideas and inspiration
            </h2>

            {/* Regal-Style Pill Filter Row */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: "All", key: "all" },
                { label: "Curtains & Drapery", key: "fragrance" },
                { label: "Bedding", key: "body" },
                { label: "Sofa Covers", key: "skin" },
                { label: "Textiles by Yard", key: "hair" },
              ].map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => setActiveCategory(pill.key)}
                  className={`rounded-full px-4 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === pill.key
                      ? "bg-[#141715] text-white shadow-xs"
                      : "border border-[#E8E2D8] bg-white text-[#141715]/80 hover:border-[#141715] hover:text-[#141715]"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Col Mobile / 4-Col Desktop Filtered Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {filteredProducts.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-sm border border-[#141715] px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#141715] hover:text-white transition-all"
            >
              <span>Explore Full Collection ({products.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — AUTHENTIC STORE SERVICE PILLARS */}
      <section className="bg-[#FAF9F6] py-14 px-6 sm:px-10 lg:px-14 border-y border-[#E8E2D8]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]">
                <Ruler className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-bold text-[#141715]">Doorstep Sizing</h4>
                <p className="text-xs text-[#7A766F] leading-relaxed">
                  Expert measurement & fabric swatch consultation anywhere in Dhaka.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]">
                <Truck className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-bold text-[#141715]">Nationwide Delivery</h4>
                <p className="text-xs text-[#7A766F] leading-relaxed">
                  Fast, secure courier delivery across all 64 districts in Bangladesh.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]">
                <Award className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-bold text-[#141715]">Master Craftsmanship</h4>
                <p className="text-xs text-[#7A766F] leading-relaxed">
                  Certified Belgian linen, Turkish velvet & triple-weave thermal blackouts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-xl border border-[#E8E2D8] bg-white shadow-2xs">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FAF4EA] text-[#8C5E1A]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="text-sm font-bold text-[#141715]">Fitting Guarantee</h4>
                <p className="text-xs text-[#7A766F] leading-relaxed">
                  100% custom fit assurance and 7-day hassle-free exchange on ready sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SHOPPABLE LOOKBOOK (Inspired Spaces) */}
      <section className="py-16 sm:py-22 px-6 sm:px-10 lg:px-14 bg-white border-b border-[#E8E2D8]">
        <div className="mx-auto max-w-[1440px] space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-[#E8E2D8] pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]">
                Living Architecture
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1.5">
                Inspired Spaces & Real Homes
              </h2>
              <p className="text-xs sm:text-sm text-[#7A766F] mt-1">
                Explore how JNS bespoke textiles transform apartments and penthouses in Dhaka.
              </p>
            </div>
            <Link
              to="/lookbook"
              className="text-xs font-bold uppercase tracking-widest text-[#141715] hover:text-[#D4A25A] transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Lookbook</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9">
            {[
              {
                title: "Warm Minimal Living Space",
                location: "Gulshan Residence, Dhaka",
                img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
                featuredProducts: [
                  { name: "Triple-Weave Blackout Curtain", price: "৳2,490" },
                  { name: "Velvet Cushion Trio", price: "৳1,650" },
                ],
                link: "/shop",
                category: "fragrance",
              },
              {
                title: "Sanctuary Master Bedroom",
                location: "Banani Penthouse, Dhaka",
                img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
                featuredProducts: [
                  { name: "400TC Egyptian Cotton Bedding", price: "৳4,800" },
                  { name: "Belgian Flax Linen Sheers", price: "৳1,850" },
                ],
                link: "/shop",
                category: "body",
              },
              {
                title: "Serene Daylight Studio",
                location: "Dhanmondi Residence, Dhaka",
                img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
                featuredProducts: [
                  { name: "Plush Velvet Insulated Drape", price: "৳3,450" },
                  { name: "Jacquard Sofa Slipcover", price: "৳3,200" },
                ],
                link: "/shop",
                category: "skin",
              },
            ].map((look) => (
              <div
                key={look.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8E2D8] bg-[#FAF9F6] text-left transition-all duration-500 hover:shadow-xl"
              >
                {/* High Quality Room Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={look.img}
                    alt={look.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#141715]/85 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-xs">
                    {look.location}
                  </div>
                </div>

                {/* Shoppable Products Breakdown */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#141715] leading-snug">
                      {look.title}
                    </h3>

                    {/* Featured items inside this room */}
                    <div className="mt-3.5 space-y-2 border-t border-[#E8E2D8] pt-3">
                      {look.featuredProducts.map((prod) => (
                        <div key={prod.name} className="flex items-center justify-between text-xs">
                          <span className="text-[#5A574F] font-medium truncate mr-2">• {prod.name}</span>
                          <span className="font-bold text-[#141715] shrink-0">{prod.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shop this room action */}
                  <div className="pt-2">
                    <Link
                      to={look.link}
                      search={{ category: look.category }}
                      className="inline-flex items-center justify-between w-full rounded-md bg-white border border-[#E8E2D8] px-4 py-2.5 text-xs font-bold text-[#141715] hover:bg-[#141715] hover:text-white transition-all shadow-2xs"
                    >
                      <span>Shop This Room</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — B2B & TRADE CONCIERGE (Architectural Split Layout) */}
      <section className="bg-[#141715] text-white py-18 sm:py-24 px-6 sm:px-10 lg:px-14 border-y border-[#262B28]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4A25A]">
                  JNS Trade & Contract Atelier
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Furnishing for Hotels, Offices & Architecture.
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#D5CEBF] leading-relaxed max-w-xl">
                We partner with interior architects, boutique hospitality groups, corporate developers, and staging professionals across Bangladesh. Enjoy dedicated trade discounts, commercial fire-retardant fabrics, and turnkey measurement & installation.
              </p>

              {/* 4 Trade Sectors */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Interior Designers</h4>
                  <p className="text-xs text-[#A8A296]">Trade pricing & custom fabric yardage.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Boutique Hotels</h4>
                  <p className="text-xs text-[#A8A296]">Fire-retardant blackout suites.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Corporate Offices</h4>
                  <p className="text-xs text-[#A8A296]">Acoustic drapery & window fit-outs.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1">
                  <h4 className="text-sm font-bold text-white">Model Staging</h4>
                  <p className="text-xs text-[#A8A296]">Turnkey styling for penthouses.</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-5 pt-3">
                <Link
                  to="/trade"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#D4A25A] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#141715] hover:bg-[#E5BE78] transition-colors shadow-sm"
                >
                  <span>Apply for Trade Account</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/contact"
                  className="text-xs font-bold uppercase tracking-wider text-white border-b border-white/40 pb-0.5 hover:text-[#D4A25A] hover:border-[#D4A25A] transition-all"
                >
                  <span>Book Consultation →</span>
                </Link>
              </div>
            </div>

            {/* Right Architectural Image (6 Cols) */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85"
                alt="Hospitality Contract Fit-Out"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-xs border border-white/20 text-[11px] font-mono text-[#D4A25A]">
                JNS Contract · Dhaka
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 — CLIENT EXPERIENCES & REVIEWS */}
      <section className="py-18 sm:py-24 px-6 sm:px-10 lg:px-14 bg-[#FAF9F6] border-b border-[#E8E2D8]">
        <div className="mx-auto max-w-[1440px] space-y-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left border-b border-[#E8E2D8] pb-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8C887F]">
                Verified Client Stories
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141715] mt-1.5">
                What Homeowners Say
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#141715]">
              <div className="flex text-[#D4A25A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span>4.9 / 5.0 Star Average</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-9 text-left">
            {[
              {
                quote: "The custom triple-weave blackout curtains completely changed our master bedroom. No light leaks, and the pinch pleat finish feels like a 5-star hotel in Paris.",
                author: "Farzana Chowdhury",
                location: "Gulshan-2, Dhaka",
                item: "Custom Blackout Curtains",
                date: "Verified Order",
              },
              {
                quote: "I was skeptical about ordering made-to-measure window sizing online, but their team came to our apartment in Banani with full fabric books. Flawless installation.",
                author: "Tanvir Ahmed",
                location: "Banani, Dhaka",
                item: "Belgian Flax Linen Sheers",
                date: "Verified Order",
              },
              {
                quote: "The 400TC Egyptian cotton bedding set has such a smooth, cool luster. It gets softer with every wash. Hands down the finest home textiles in Bangladesh.",
                author: "Nusrat Jahan",
                location: "Dhanmondi, Dhaka",
                item: "400TC Egyptian Cotton Set",
                date: "Verified Order",
              },
            ].map((review) => (
              <div
                key={review.author}
                className="flex flex-col justify-between rounded-2xl border border-[#E8E2D8] bg-white p-7 shadow-2xs space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#D4A25A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-[#4A4740] leading-relaxed italic">
                    "{review.quote}"
                  </p>
                </div>

                <div className="border-t border-[#E8E2D8] pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#141715]">{review.author}</h4>
                    <p className="text-xs text-[#7A766F]">{review.location}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#2E473A] bg-[#FAF4EA] px-2.5 py-1 rounded-sm">
                    {review.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — VIP NEWSLETTER */}
      <section className="bg-[#FAF9F6] border-t border-[#E8E2D8] py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">Stay Inspired</span>
          <h2 className="font-serif text-3xl font-medium text-[#1A1A1A] sm:text-4xl">
            Join the JNS Inner Circle
          </h2>
          <p className="text-sm text-muted-foreground">
            Receive curated home styling guides, early access to new textile seasonal drops, and exclusive bespoke tailoring offers.
          </p>

          {subscribed ? (
            <div className="rounded-2xl bg-[#2E473A] p-6 text-white">
              <Sparkles className="h-6 w-6 text-[#D4A25A] mx-auto mb-2" />
              <h4 className="font-serif text-lg font-bold">Welcome to JNS Furnishing</h4>
              <p className="text-xs text-[#EADCC8] mt-1">Thank you for subscribing. We've sent an introductory gift to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 rounded-full border border-[#E8E2D8] bg-white px-5 py-3.5 text-sm outline-none focus:border-[#D4A25A]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2E473A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all"
              >
                Subscribe <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
