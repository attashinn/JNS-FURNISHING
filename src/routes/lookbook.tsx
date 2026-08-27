import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Eye, ShoppingBag } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook & Inspired Spaces — JNS Furnishing" },
      { name: "description", content: "Explore the JNS Furnishing editorial lookbook featuring bespoke residential, penthouse, and villa interiors in Dhaka." },
    ],
  }),
  component: LookbookPage,
});

const LOOKBOOK_ITEMS = [
  {
    title: "The Warm Neutral Living Gallery",
    location: "Gulshan-2 Penthouse",
    description: "Floor-to-ceiling Belgian flax linen sheers layered with custom blackout drapes in Oatmeal Beige. Accented with bouclé sofa slipcovers and jewel-tone velvet cushion trios.",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    products: [
      { name: "Belgian Linen Sheer Curtain", link: "/shop" },
      { name: "Nordic Bouclé Sofa Cover", link: "/shop" },
      { name: "Velvet Cushion Trio", link: "/shop" },
    ],
  },
  {
    title: "Sanctuary Master Suite",
    location: "Banani Residence",
    description: "A calming oasis styled with 400TC long-staple Egyptian cotton bedding, quilted sateen bedcovers, and double pinch pleat blackout drapery for deep restful sleep.",
    img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=85",
    products: [
      { name: "400TC Egyptian Cotton Bedding Set", link: "/shop" },
      { name: "Heritage Quilted Bedcover", link: "/shop" },
      { name: "Luxury Blackout Curtain", link: "/shop" },
    ],
  },
  {
    title: "Architectural Formal Dining Hall",
    location: "Baridhara Diplomatic Enclave",
    description: "Grand damask jacquard drapes with brushed brass eyelets paired with raw slub linen embroidered runners on a 10-seater walnut table.",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=85",
    products: [
      { name: "Artisan Damask Jacquard Curtain", link: "/shop" },
      { name: "Raw Linen Table Runner", link: "/shop" },
    ],
  },
  {
    title: "Executive Home Studio & Library",
    location: "Dhanmondi Modern Villa",
    description: "Acoustically lined heavyweight velvet drapes in Forest Olive, dampening ambient street sound and infusing an intellectual, timeless atmosphere.",
    img: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1400&q=85",
    products: [
      { name: "Royal Velvet Insulated Drape", link: "/shop" },
      { name: "Commercial Upholstery Fabric", link: "/shop" },
    ],
  },
];

function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Header */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-[#D4A25A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5DFB3]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A25A]" /> Volume IV · Curated Spaces
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FAF9F6]">
            The JNS Lookbook
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            A visual anthology of curated homes, villas, and suites styled exclusively with JNS custom drapes, bedding sets, and tactile furnishings.
          </p>
        </div>
      </section>

      {/* Lookbook Entries */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#E8E2D8] bg-[#F4EFE6] shadow-xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-[11px] font-semibold text-[#D4A25A] uppercase tracking-wider">
                    {item.location}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="font-mono text-xs font-bold text-[#D4A25A]">SPACE 0{idx + 1}</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A]">
                  {item.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-[#E8E2D8]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#2E473A] mb-3">Featured in this Space:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.products.map((p) => (
                      <Link
                        key={p.name}
                        to={p.link}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#E8E2D8] bg-white px-3.5 py-1.5 text-xs font-medium text-foreground hover:border-[#D4A25A] hover:text-[#D4A25A] transition-colors"
                      >
                        <ShoppingBag className="h-3 w-3 text-[#D4A25A]" /> {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#2E473A] text-white py-16 px-6 text-center">
        <div className="mx-auto max-w-2xl space-y-4">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold">Inspired to Reimagine Your Space?</h3>
          <p className="text-sm text-white/80">
            Book a complimentary fabric swatch kit or window measurement consultation with our design atelier.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              to="/custom"
              className="rounded-full bg-[#D4A25A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#E5BE78]"
            >
              Start Custom Sizing
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-[#1A1A1A]"
            >
              Contact Atelier
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
