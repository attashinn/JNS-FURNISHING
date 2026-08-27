import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Ruler,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Truck,
  Phone,
  Calendar,
  Layers,
  HelpCircle,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/hooks/use-cart";
import { calculateCustomCurtainPrice, formatPriceBDT } from "@/lib/jns-helpers";
import type { Product } from "@/lib/products.functions";

export const Route = createFileRoute("/custom")({
  head: () => ({
    meta: [
      { title: "Custom Sizing & Bespoke Window Concierge — JNS Furnishing" },
      { name: "description", content: "Design and order bespoke custom curtains tailored to your exact window height and width. Doorstep measurements in Dhaka." },
    ],
  }),
  component: CustomCurtainsPage,
});

function CustomCurtainsPage() {
  const { addItem } = useCart();
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(90);
  const [fabric, setFabric] = useState<"blackout" | "linen" | "velvet" | "jacquard">("blackout");
  const [lining, setLining] = useState<"standard" | "thermal" | "blackout">("thermal");
  const [pleat, setPleat] = useState<"eyelet" | "pinch-pleat" | "rod-pocket" | "wave-fold">("pinch-pleat");
  const [color, setColor] = useState("Warm Oatmeal");
  const [added, setAdded] = useState(false);

  const calc = calculateCustomCurtainPrice({
    widthInches: width,
    heightInches: height,
    fabricType: fabric,
    lining,
    pleatStyle: pleat,
  });

  const handleOrderCustom = () => {
    const customProduct: Product = {
      slug: `custom-curtain-${Date.now()}`,
      name: `Custom Tailored Drapery (${width}"W x ${height}"L)`,
      brand: "JNS Bespoke",
      price: `৳${calc.totalPrice}`,
      img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      tag: "Custom Sizing",
      notes: `${fabric.toUpperCase()} · ${pleat.toUpperCase()} · ${lining.toUpperCase()} Lining · ${color}`,
      category: "fragrance",
    };

    addItem(customProduct, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Header */}
      <section className="bg-[#2E473A] text-white py-16 px-6 lg:px-8 border-b border-[#1E3127]">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A25A]">
            <Ruler className="h-3.5 w-3.5" /> Bespoke Window Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#FAF9F6]">
            Designed Around Your Space.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Every window is unique. Input your custom dimensions below to instantly calculate price, select luxury fabrics and pleat headers, and order bespoke curtains handcrafted in Dhaka.
          </p>
        </div>
      </section>

      {/* 5-Step Process Explainer */}
      <section className="border-b border-[#E8E2D8] bg-[#F4EFE6] py-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Window Dimensions", desc: "Specify width & height in inches" },
              { step: "02", title: "Select Fabric", desc: "Linen, blackout, velvet, or jacquard" },
              { step: "03", title: "Choose Pleat", desc: "Pinch pleat, eyelet, or wave fold" },
              { step: "04", title: "We Handcraft It", desc: "Tailored by master Dhaka artisans" },
              { step: "05", title: "Delivered & Ready", desc: "Doorstep delivery in 5 to 7 days" },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-[#E8E2D8] bg-white p-4 text-center">
                <span className="font-mono text-xs font-bold text-[#D4A25A]">{s.step}</span>
                <h4 className="font-serif font-semibold text-sm text-[#1A1A1A] mt-1">{s.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Customizer Workspace */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Configurator */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Measurements */}
            <div className="rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white">1</span>
                <h3 className="font-serif text-xl font-bold text-foreground">Window Measurements</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Width (Inches):</span>
                    <span className="text-[#2E473A] font-bold">{width}" ({(width / 12).toFixed(1)} ft)</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="180"
                    step="2"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-[#2E473A]"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>24" (Standard Window)</span>
                    <span>180" (Grand Slider)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Height / Drop (Inches):</span>
                    <span className="text-[#2E473A] font-bold">{height}" ({(height / 12).toFixed(1)} ft)</span>
                  </div>
                  <input
                    type="range"
                    min="36"
                    max="144"
                    step="2"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-[#2E473A]"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>36" (Sill Length)</span>
                    <span>144" (Floor to Ceiling)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Fabric Material */}
            <div className="rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white">2</span>
                <h3 className="font-serif text-xl font-bold text-foreground">Select Luxury Fabric Type</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { id: "blackout", name: "100% Blackout", desc: "Thermal & light blocking" },
                  { id: "linen", name: "Belgian Flax Linen", desc: "Airy slub texture" },
                  { id: "velvet", name: "Turkish Plush Velvet", desc: "Heavy luxury drape" },
                  { id: "jacquard", name: "Damask Jacquard", desc: "Woven classic motifs" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFabric(f.id as any)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      fabric === f.id
                        ? "border-[#2E473A] bg-[#2E473A] text-white shadow-md"
                        : "border-[#E8E2D8] bg-[#FAF9F6] text-foreground hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <p className="font-serif font-bold text-sm">{f.name}</p>
                    <p className={`text-[10px] mt-1 ${fabric === f.id ? "text-white/80" : "text-muted-foreground"}`}>{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pleat & Header Style */}
            <div className="rounded-3xl border border-[#E8E2D8] bg-white p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2E473A] text-xs font-bold text-white">3</span>
                <h3 className="font-serif text-xl font-bold text-foreground">Header & Pleat Style</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { id: "pinch-pleat", name: "Pinch Pleat", desc: "Double tailor fold" },
                  { id: "eyelet", name: "Eyelet (Ring)", desc: "Slide on metal rod" },
                  { id: "wave-fold", name: "Wave Fold", desc: "Continuous S-curve" },
                  { id: "rod-pocket", name: "Rod Pocket", desc: "Gathered header" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPleat(p.id as any)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      pleat === p.id
                        ? "border-[#2E473A] bg-[#2E473A] text-white shadow-md"
                        : "border-[#E8E2D8] bg-[#FAF9F6] text-foreground hover:bg-[#F4EFE6]"
                    }`}
                  >
                    <p className="font-serif font-bold text-sm">{p.name}</p>
                    <p className={`text-[10px] mt-1 ${pleat === p.id ? "text-white/80" : "text-muted-foreground"}`}>{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Summary Card */}
          <div className="space-y-6">
            <div className="sticky top-28 rounded-3xl border-2 border-[#D4A25A]/60 bg-white p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4A25A]">Live Estimate</span>
                <h3 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">Bespoke Order Summary</h3>
              </div>

              <div className="space-y-3 divide-y divide-[#E8E2D8] text-xs">
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-bold text-foreground">{width}" Width × {height}" Drop</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Fabric Type:</span>
                  <span className="font-bold text-foreground capitalize">{fabric}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Header Style:</span>
                  <span className="font-bold text-foreground capitalize">{pleat.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Panels Included:</span>
                  <span className="font-bold text-foreground">{calc.panels} Tailored Panel(s)</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Estimated Turnaround:</span>
                  <span className="font-bold text-[#2E473A]">{calc.estimatedDays}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F4EFE6] p-4 border border-[#E8E2D8]">
                <span className="text-xs text-muted-foreground">Total Handcrafted Price</span>
                <p className="font-serif text-3xl font-bold text-[#2E473A] mt-0.5">{formatPriceBDT(calc.totalPrice)}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Includes all stitching, hooks, and free doorstep delivery.</p>
              </div>

              <button
                type="button"
                onClick={handleOrderCustom}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-[#1E3127] hover:scale-102"
              >
                <Sparkles className="h-4 w-4 text-[#D4A25A]" />
                {added ? "Custom Drapery Added to Bag!" : "Add Custom Order to Bag"}
              </button>

              <div className="pt-2 text-[11px] text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4A25A]" />
                  <span>100% Perfect Fit Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-[#D4A25A]" />
                  <span>Free Nationwide Delivery Over ৳5,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
