import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Check, Sparkles, Building2, Hotel, Home, Briefcase, Send } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/trade")({
  head: () => ({
    meta: [
      { title: "JNS Pro / Trade Program for Interior Designers & Architects" },
      { name: "description", content: "Exclusive wholesale trade pricing, bespoke manufacturing, and commercial project support for interior designers, architects, and hospitality in Bangladesh." },
    ],
  }),
  component: TradePage,
});

function TradePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    type: "Interior Designer",
    projectScope: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Header */}
      <section className="bg-[#1A1A1A] text-white py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A25A]/40 bg-[#D4A25A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5DFB3]">
            <Award className="h-3.5 w-3.5 text-[#D4A25A]" /> JNS Pro Partnership
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FAF9F6]">
            Furnishing for Spaces <br />
            <span className="italic text-[#EADCC8]">That Matter.</span>
          </h1>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            Dedicated trade pricing, custom drapery manufacturing, and fabric concierge for interior designers, architects, luxury resorts, and corporate developers.
          </p>
        </div>
      </section>

      {/* Trade Benefits */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">The JNS Pro Advantage</span>
            <h2 className="font-serif text-3xl font-medium text-foreground">Built for Design Professionals</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tiered Trade Pricing",
                desc: "Up to 30% discount off standard retail pricing on fabrics, custom drapery, and bedding with no minimum order requirements.",
                icon: Award,
              },
              {
                title: "Custom Atelier Production",
                desc: "Direct access to our Dhaka textile workshop for bespoke heights, specialty headers, motorized curtain tracks, and fire-retardant liners.",
                icon: Sparkles,
              },
              {
                title: "Complimentary Swatch Books",
                desc: "Receive full-size textile sample books containing our Belgian linen, Turkish velvet, and blackout weave collections for client presentations.",
                icon: Briefcase,
              },
            ].map((b) => (
              <div key={b.title} className="rounded-3xl border border-[#E8E2D8] bg-white p-8 space-y-4 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2E473A] text-[#D4A25A]">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Sectors */}
      <section className="bg-[#F4EFE6] py-20 px-6 lg:px-8 border-y border-[#E8E2D8]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Residential Interiors", desc: "Turnkey luxury apartments & villas", icon: Home },
              { name: "Hotels & Resorts", desc: "Bespoke blackout suites & bedding", icon: Hotel },
              { name: "Corporate Offices", desc: "Acoustic fabric wall panels & drapes", icon: Building2 },
              { name: "Restaurants & Cafés", desc: "High-rub seating upholstery & curtains", icon: Sparkles },
            ].map((sector) => (
              <div key={sector.name} className="rounded-2xl border border-[#E8E2D8] bg-white p-6 space-y-3">
                <sector.icon className="h-6 w-6 text-[#2E473A]" />
                <h4 className="font-serif font-bold text-base text-foreground">{sector.name}</h4>
                <p className="text-xs text-muted-foreground">{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#E8E2D8] bg-white p-8 sm:p-12 shadow-xl">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">Membership Application</span>
            <h2 className="font-serif text-3xl font-bold text-foreground">Apply for a Trade Account</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Submit your studio or business credentials for approval within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl bg-[#2E473A] p-8 text-center text-white space-y-3">
              <Sparkles className="h-8 w-8 text-[#D4A25A] mx-auto" />
              <h3 className="font-serif text-2xl font-bold">Application Received</h3>
              <p className="text-xs text-[#EADCC8] max-w-md mx-auto">
                Thank you for applying to the JNS Pro Program. A trade concierge specialist will contact you shortly with your account activation and digital sample catalogs.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architect Sarah Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Firm / Studio Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Studio Arc Dhaka"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@studioarc.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground">Contact Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700-000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Professional Discipline</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                >
                  <option>Interior Designer</option>
                  <option>Architectural Practice</option>
                  <option>Hospitality / Hotel Developer</option>
                  <option>Real Estate Turnkey Stager</option>
                  <option>General Contractor</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground">Active Project Scope / Details</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your upcoming project location, estimated window count, or fabric yardage requirements..."
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all shadow-md mt-2"
              >
                Submit Trade Partner Application <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
