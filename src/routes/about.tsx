import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, ShieldCheck, Ruler, Award, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story & Heritage — JNS Furnishing" },
      { name: "description", content: "Learn the story behind JNS Furnishing — handcrafted luxury custom curtains, Belgian linen, Egyptian cotton bedding, and tailored upholstery in Bangladesh." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Header */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-[#D4A25A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5DFB3]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4A25A]" /> The JNS Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FAF9F6]">
            Curate. Customize. Comfort.
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Founded with a passion for architectural textile aesthetics, JNS Furnishing exists to bring bespoke tailoring, organic natural fibers, and luxury comfort to homes across Bangladesh.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">The Beginning</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A]">
              Beyond Generic Drapery
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For too long, homeowners in Bangladesh had to choose between cheap ready-made polyester curtains from local markets or complicated unguided tailoring. JNS Furnishing was established to bridge that divide with a seamless, design-led experience.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We source premier organic flax linen from Europe, high-rub velvets from Turkey, and long-staple cotton, crafting every piece with master artisans in our dedicated Dhaka atelier.
            </p>
            <div className="pt-2">
              <Link
                to="/custom"
                className="inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127]"
              >
                Experience Custom Sizing <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-xl bg-[#F4EFE6]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
              alt="JNS Atelier Workshop"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pillars of Excellence */}
      <section className="bg-[#F4EFE6] py-20 px-6 lg:px-8 border-y border-[#E8E2D8]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">Our Guiding Principles</span>
            <h2 className="font-serif text-3xl font-medium text-foreground">Why Discerning Clients Choose JNS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Curate",
                desc: "We handpick only the highest density weaves, breathable flax linens, and durable sateen textiles that age gracefully over time.",
              },
              {
                num: "02",
                title: "Customize",
                desc: "Every window, bed, and sofa is unique. Our custom measurement technology ensures precise fits without compromise.",
              },
              {
                num: "03",
                title: "Comfort",
                desc: "True luxury is felt. From the silky glide of 400TC sheets to total 100% blackout restful darkness in the bedroom.",
              },
            ].map((p) => (
              <div key={p.num} className="rounded-3xl border border-[#E8E2D8] bg-white p-8 space-y-4 shadow-xs">
                <span className="font-serif text-3xl font-bold text-[#D4A25A]">{p.num}</span>
                <h3 className="font-serif text-2xl font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}