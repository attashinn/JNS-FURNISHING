import { Link, useNavigate } from "@tanstack/react-router";
import {
  Menu,
  X,
  ShoppingCart,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  User,
  Search,
  Heart,
  Scale,
  ChevronDown,
  Sparkles,
  MapPin,
  Ruler,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/use-cart";
import { userMeFn } from "@/lib/auth.functions";
import { BrandLogo } from "./brand-logo";
import { formatPriceBDT } from "@/lib/jns-helpers";
import { listProductsFn } from "@/lib/products.functions";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center transition-opacity hover:opacity-90 ${className}`} aria-label="JNS Furnishing">
      <BrandLogo size="md" variant="light" />
    </Link>
  );
}

function UserAccountIcon() {
  const { data } = useQuery({ queryKey: ["me"], queryFn: () => userMeFn(), staleTime: 30_000 });
  const to = data?.user ? "/dashboard" : "/auth";
  const label = data?.user ? `Account: ${data.user.name}` : "Sign in";
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]"
    >
      <User className="h-5 w-5" strokeWidth={1.5} />
      {data?.user && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#D4A25A] ring-2 ring-white" />
      )}
    </Link>
  );
}

function InlineSearchBar() {
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () => listProductsFn(),
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = (products ?? []).filter((p) => {
    if (!term.trim()) return false;
    const q = term.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q) ||
      p.notes.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
    );
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      setIsFocused(false);
      navigate({ to: "/shop", search: { category: "all", room: term.trim() } });
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-xl mx-2 sm:mx-4">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="pointer-events-none absolute left-3.5 flex items-center text-[#7A766F]">
          <Search className="h-4 w-4" strokeWidth={2} />
        </div>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search curtains, bedding, sofa covers..."
          className="h-10 w-full rounded-md bg-[#F4EFEA]/70 hover:bg-[#F4EFEA] focus:bg-white pl-10 pr-9 text-xs sm:text-[13px] font-medium text-[#141715] transition-all border border-[#E8E2D8] focus:border-[#141715] outline-none placeholder:text-[#8C887F]"
        />
        {term && (
          <button
            type="button"
            onClick={() => setTerm("")}
            className="absolute right-3 flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[#7A766F] hover:bg-black/20 text-xs"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </form>

      {/* Live Clean Search Dropdown */}
      {isFocused && (
        <div className="absolute left-0 top-full mt-1.5 w-full rounded-md border border-[#E8E2D8] bg-white p-4 shadow-xl z-50 animate-in fade-in-0 duration-100 text-left">
          {term.trim() === "" ? (
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C887F]">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Blackout Curtains", cat: "fragrance" },
                  { label: "Belgian Linen", cat: "fragrance" },
                  { label: "Egyptian Cotton Bedding", cat: "body" },
                  { label: "Sofa Slipcovers", cat: "skin" },
                  { label: "Custom Window Sizer", cat: "custom" },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      setIsFocused(false);
                      if (s.cat === "custom") {
                        navigate({ to: "/custom" });
                      } else {
                        navigate({ to: "/shop", search: { category: s.cat } });
                      }
                    }}
                    className="rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3 py-1 text-xs font-semibold text-[#141715] hover:border-[#141715] hover:bg-white transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-5 text-center text-xs text-[#7A766F]">
              No products found matching &ldquo;{term}&rdquo;.
            </div>
          ) : (
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C887F] pb-1">
                Products ({filtered.length})
              </div>
              {filtered.slice(0, 5).map((item) => (
                <Link
                  key={item.slug}
                  to="/product/$slug"
                  params={{ slug: item.slug }}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-[#FAF9F6] transition-colors border border-transparent hover:border-[#E8E2D8]"
                >
                  <img src={item.img} alt={item.name} className="h-11 w-11 rounded-sm object-cover bg-muted shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-[13px] font-bold text-[#141715] truncate">{item.name}</p>
                    <p className="text-[11px] text-[#7A766F] truncate">{item.notes || item.category}</p>
                  </div>
                  <span className="text-xs font-bold text-[#141715] shrink-0">{formatPriceBDT(item.price)}</span>
                </Link>
              ))}
              <Link
                to="/shop"
                search={{ category: "all", room: term }}
                onClick={() => setIsFocused(false)}
                className="mt-2 flex items-center justify-center gap-1.5 rounded-sm bg-[#FAF9F6] border border-[#E8E2D8] py-2 text-xs font-bold text-[#141715] hover:bg-[#141715] hover:text-white transition-colors"
              >
                <span>View all search results</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CartDrawer() {
  const { items, total, isOpen, setIsOpen, updateQty, removeItem } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
      <aside className="relative flex h-full w-full max-w-md flex-col justify-between border-l border-[#E8E2D8] bg-[#FAF9F6] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-[#D4A25A]" />
            <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-foreground">Your Shopping Bag</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-black/5"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40 stroke-1" />
            <p className="mt-4 font-serif text-lg font-medium text-foreground">Your bag is currently empty</p>
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              Explore our curated custom curtains, Egyptian bedding, and tailored living essentials.
            </p>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="mt-6 rounded-full bg-[#1A1A1A] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#D4A25A] hover:text-[#1A1A1A] transition-colors"
            >
              Discover Catalog
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 rounded-2xl border border-[#E8E2D8] bg-white p-3 shadow-xs">
                  <Link to="/product/$slug" params={{ slug: item.slug }} onClick={() => setIsOpen(false)}>
                    <img src={item.img} alt={item.name} className="h-18 w-18 rounded-xl object-cover bg-muted shrink-0" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/product/$slug"
                        params={{ slug: item.slug }}
                        onClick={() => setIsOpen(false)}
                        className="font-serif font-medium text-xs text-foreground hover:text-[#D4A25A] line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="text-muted-foreground hover:text-red-600 p-0.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center rounded-full border border-[#E8E2D8] bg-[#FAF9F6]">
                        <button
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center text-foreground hover:bg-[#EFEBE4] rounded-l-full"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center text-foreground hover:bg-[#EFEBE4] rounded-r-full"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                      <span className="font-bold text-xs text-[#2E473A]">{formatPriceBDT(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E2D8] pt-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-serif text-xl font-bold text-[#2E473A]">{formatPriceBDT(total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#2E473A] transition-all shadow-md"
              >
                Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { count, setIsOpen: setCartOpen } = useCart();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMegaOpen(true);
  };

  const handleLeave = () => {
    timerRef.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      {/* Top Haute Luxury Announcement Bar */}
      <div className="bg-[#141715] px-4 py-2 text-center text-[11px] font-medium tracking-[0.16em] text-[#FAF9F6] border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 sm:gap-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-[#D4A25A] font-semibold">
            <Sparkles className="h-3 w-3" />
            Free Nationwide Shipping Over ৳5,000
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline text-[#EADCC8]">Bespoke Window Sizing & Consultations</span>
          <span className="hidden md:inline text-white/30">•</span>
          <span className="hidden md:inline text-white/80">Showroom: Banani / Gulshan, Dhaka</span>
        </div>
      </div>

      {/* Main Reference-Style Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-[#E8E2D8]/80 bg-white/95 backdrop-blur-md transition-all shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)] w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-[68px] sm:h-[84px] gap-2">
          
          {/* Left Zone: Brand Logo + Desktop Nav with proper spacing */}
          <div className="flex items-center gap-3 sm:gap-6 xl:gap-9 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setMobileOpen(true)}
                className="flex xl:hidden h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-md text-[#1A1A1A] hover:bg-[#F4EFEA] active:scale-95 transition-all cursor-pointer"
                aria-label="Open menu"
                title="Open menu"
              >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2]" />
              </button>

              <Logo />
            </div>

            {/* Core Desktop Navigation Links (Products, Showroom, Custom Sizing, Lookbook) */}
            <nav className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium tracking-[0.02em] text-[#1A1A1A]/90 shrink-0">
              {/* Products Dropdown */}
              <div className="relative py-2" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <Link
                  to="/shop"
                  className="flex items-center gap-1 font-semibold text-[#1A1A1A] transition-colors hover:text-[#D4A25A]"
                >
                  <span>Products</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${megaOpen ? "rotate-180 text-[#D4A25A]" : ""}`} />
                </Link>

                {megaOpen && (
                  <div className="absolute left-0 top-full mt-1 w-[800px] rounded-md border border-[#E8E2D8] bg-white p-6 shadow-xl z-50 animate-in fade-in-0 duration-100 text-left">
                    <div className="grid grid-cols-4 gap-6">
                      
                      {/* Curtains Column */}
                      <div className="space-y-3">
                        <p className="text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider">
                          Curtains & Drapery
                        </p>
                        <ul className="space-y-2 text-[12.5px] font-medium text-[#5A574F]">
                          <li>
                            <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Triple-Weave Blackout
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Belgian Flax Linen Sheers
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Turkish Plush Velvet
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Artisan Damask Jacquard
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Bedding Column */}
                      <div className="space-y-3">
                        <p className="text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider">
                          Bedding & Linens
                        </p>
                        <ul className="space-y-2 text-[12.5px] font-medium text-[#5A574F]">
                          <li>
                            <Link to="/shop" search={{ category: "body" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              400TC Egyptian Cotton
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "body" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              French Washed Linen Sets
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "body" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Quilted Luxury Bedcovers
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Living Column */}
                      <div className="space-y-3">
                        <p className="text-[11px] font-extrabold text-[#141715] border-b border-[#E8E2D8] pb-2 uppercase tracking-wider">
                          Living & Covers
                        </p>
                        <ul className="space-y-2 text-[12.5px] font-medium text-[#5A574F]">
                          <li>
                            <Link to="/shop" search={{ category: "skin" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Jacquard Sofa Slipcovers
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "skin" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Velvet Cushion Trios
                            </Link>
                          </li>
                          <li>
                            <Link to="/shop" search={{ category: "hair" }} className="hover:text-[#141715] hover:font-bold transition-colors block">
                              Fabrics by Yard
                            </Link>
                          </li>
                        </ul>
                      </div>

                      {/* Featured Atelier Card */}
                      <div className="rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-4 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-[#8C887F] font-bold">
                            Dhaka Atelier
                          </span>
                          <h4 className="text-sm font-bold text-[#141715] leading-tight">
                            Doorstep Measurement
                          </h4>
                          <p className="text-xs text-[#7A766F] leading-relaxed">
                            Book expert window sizing & swatch consultation in Dhaka.
                          </p>
                        </div>
                        <Link
                          to="/custom"
                          className="inline-flex items-center justify-between rounded-sm bg-[#141715] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#2E473A] transition-colors"
                        >
                          <span>Launch Sizer</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="py-2 transition-colors hover:text-[#D4A25A]"
              >
                Showroom
              </Link>

              <Link
                to="/custom"
                className="py-2 transition-colors hover:text-[#D4A25A]"
              >
                Custom Sizing
              </Link>

              <Link
                to="/track"
                className="py-2 transition-colors hover:text-[#D4A25A] flex items-center gap-1.5"
              >
                <span>Track Order</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </Link>

              <Link
                to="/lookbook"
                className="py-2 transition-colors hover:text-[#D4A25A]"
              >
                Lookbook
              </Link>
            </nav>
          </div>

          {/* Center Prominent Search Bar */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl">
            <InlineSearchBar />
          </div>

          {/* Right Action Icons Suite matching reference (Account, Compare, Wishlist, Cart) */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0 pr-1">
            {/* User Profile / Account */}
            <UserAccountIcon />

            {/* Compare / Atelier Tool with badge (Desktop/Tablet) */}
            <Link
              to="/shop"
              className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]"
              title="Compare"
              aria-label="Compare"
            >
              <Scale className="h-5 w-5" strokeWidth={1.5} />
              <span className="absolute top-0 right-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#1A1A1A] text-[9px] font-bold text-white shadow-xs">
                0
              </span>
            </Link>

            {/* Wishlist with badge (Desktop/Tablet) */}
            <Link
              to="/shop"
              className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A]"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" strokeWidth={1.5} />
              <span className="absolute top-0 right-0 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#1A1A1A] text-[9px] font-bold text-white shadow-xs">
                0
              </span>
            </Link>

            {/* Shopping Cart with badge (Always Visible) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-[#1A1A1A]/85 transition-colors hover:bg-[#F4EFE6] hover:text-[#D4A25A] cursor-pointer"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#141715] text-[9px] font-bold text-white shadow-xs">
                {count}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Under header on mobile screens) */}
        <div className="flex md:hidden px-4 pb-3">
          <InlineSearchBar />
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Luxury E-Commerce Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-[85%] max-w-sm flex-col justify-between bg-white shadow-2xl z-10 overflow-y-auto">
            <div className="p-5 space-y-6">
              
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EFEA] text-[#141715] hover:bg-black/10 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* User Account Banner */}
              <div className="rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#141715] text-white">
                    <User className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#141715]">Welcome to JNS</p>
                    <p className="text-[11px] text-[#7A766F]">Curate. Customize. Comfort.</p>
                  </div>
                </div>
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xs bg-[#141715] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#D4A25A] hover:text-[#141715] transition-colors"
                >
                  Sign In
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-1 text-[13.5px] font-bold text-[#141715] text-left">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>Home</span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-[#7A766F]" />
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>All Products</span>
                  <span className="text-[11px] font-bold text-[#D4A25A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs">24 Items</span>
                </Link>

                {/* Subcategory Department List */}
                <div className="pl-3 py-1 space-y-1 border-l-2 border-[#E8E2D8] ml-2 text-xs font-semibold text-[#5A574F]">
                  <Link
                    to="/shop"
                    search={{ category: "fragrance" }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs"
                  >
                    🪟 Curtains & Drapery
                  </Link>
                  <Link
                    to="/shop"
                    search={{ category: "body" }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs"
                  >
                    🛏️ Bedding & Linens
                  </Link>
                  <Link
                    to="/shop"
                    search={{ category: "skin" }}
                    onClick={() => setMobileOpen(false)}
                    className="block py-1.5 px-2 hover:text-[#141715] hover:bg-[#FAF9F6] rounded-xs"
                  >
                    🛋️ Sofa & Living Covers
                  </Link>
                </div>
                     {/* Custom Sizer CTA Card in Mobile Drawer */}
                <div className="pt-2 space-y-2">
                  <Link
                    to="/custom"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-md bg-[#141715] p-3 text-white transition-all hover:bg-[#2E473A]"
                  >
                    <div>
                      <p className="text-xs font-bold">Window Sizer Atelier</p>
                      <p className="text-[10px] text-[#D4A25A]">Calculate Yardage & Panels</p>
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/track"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3 text-[#141715] transition-all hover:bg-[#F4EFEA]"
                  >
                    <div>
                      <p className="text-xs font-bold">Track Your Order</p>
                      <p className="text-[10px] text-[#7A766F]">Real-time tailoring & delivery</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#7A766F]" />
                  </Link>
                </div>

                <Link
                  to="/lookbook"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>Editorial Lookbook</span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-[#7A766F]" />
                </Link>

                <Link
                  to="/trade"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>Trade & B2B Concierge</span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-[#7A766F]" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>Banani Showroom</span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-[#7A766F]" />
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 rounded-sm hover:bg-[#FAF9F6] transition-colors"
                >
                  <span>About JNS Atelier</span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-[#7A766F]" />
                </Link>
              </nav>
            </div>

            {/* Bottom Atelier Support & Hotline */}
            <div className="border-t border-[#E8E2D8] bg-[#FAF9F6] p-4 text-xs text-[#7A766F] space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#141715]">Dhaka Atelier Concierge</span>
                <span className="text-[10px] font-bold text-[#2E473A] bg-[#FAF4EA] px-2 py-0.5 rounded-xs">Open 7 Days</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                House 42, Road 11, Block D, Banani / Gulshan, Dhaka
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-bold text-[#141715]">
                <span>Hotline: +880 1700-000000</span>
                <span className="text-[#D4A25A]">BDT ৳</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Global Floating WhatsApp Drapery Concierge */}
      <aside aria-label="Drapery Concierge Support" className="fixed bottom-4 sm:bottom-6 right-3.5 sm:right-6 z-40 flex flex-col items-end">
        <a
          href="https://wa.me/8801700000000?text=Hi%20JNS%20Furnishing,%20I%20would%20like%20to%20consult%20about%20custom%20curtain%20sizing"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2 rounded-full bg-[#141715] hover:bg-[#2E473A] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer"
          title="Chat with Drapery Expert"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold tracking-wide">Drapery Concierge</span>
        </a>
      </aside>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2A2E2B] bg-[#141715] text-[#FAF9F6] pt-12 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-12 text-left">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
        
        {/* Main 4-Column Footer Grid (2-col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Brand Col */}
          <div className="space-y-3.5 sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="dark" size="sm" />
            <p className="text-xs text-[#A8A49C] leading-relaxed max-w-sm font-medium">
              Curate. Customize. Comfort. Bespoke custom drapery, organic Belgian linens, and hotel-grade furnishings crafted with master Dhaka artisans.
            </p>
            <div className="pt-1 flex items-center gap-3 text-xs font-bold text-[#D4A25A]">
              <span>📍 Dhaka Atelier</span>
              <span>•</span>
              <span>Nationwide Delivery</span>
            </div>
          </div>

          {/* Col 1: Collections */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              Collections
            </p>
            <ul className="space-y-2 text-xs text-[#A8A49C]">
              <li>
                <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-white transition-colors block">
                  Blackout & Thermal Curtains
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "fragrance" }} className="hover:text-white transition-colors block">
                  Belgian Flax Linen Sheers
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "body" }} className="hover:text-white transition-colors block">
                  400TC Egyptian Cotton Bedding
                </Link>
              </li>
              <li>
                <Link to="/shop" search={{ category: "skin" }} className="hover:text-white transition-colors block">
                  Stretch Sofa Slipcovers
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-[#D4A25A] font-bold hover:underline transition-colors block">
                  Custom Window Sizer Atelier →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Client Care */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              Client Experience
            </p>
            <ul className="space-y-2 text-xs text-[#A8A49C]">
              <li>
                <Link to="/lookbook" className="hover:text-white transition-colors block">
                  Editorial Lookbook
                </Link>
              </li>
              <li>
                <Link to="/trade" className="hover:text-white transition-colors block">
                  Trade & B2B Concierge
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors block">
                  Showroom & Consultations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors block">
                  Our Story & Craft
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors block">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Dhaka Atelier */}
          <div className="space-y-3">
            <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              Dhaka Atelier
            </p>
            <div className="space-y-2 text-xs text-[#A8A49C]">
              <p className="text-white font-medium">House 42, Road 11, Block D, Banani / Gulshan, Dhaka</p>
              <p>Hotline: <span className="text-white font-bold">+880 1700-000000</span></p>
              <p>WhatsApp: <span className="text-[#D4A25A] font-bold">+880 1800-000000</span></p>
              <p className="text-[11px] text-[#7A766F]">Open Sat – Thu: 10:00 AM – 8:30 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Payment Methods, and Admin Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#2A2E2B] pt-6 text-[11px] text-[#7A766F] gap-3">
          <p>© {new Date().getFullYear()} JNS Furnishing Ltd. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#A8A49C]">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>bKash / Nagad</span>
            <span>·</span>
            <span>Nationwide 64 Districts</span>
            <span>·</span>
            <Link
              to="/admin/login"
              className="text-[#D4A25A] font-semibold hover:underline"
              title="Admin Panel Login"
            >
              Admin Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
