import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageSquare, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Showroom Concierge — JNS Furnishing" },
      { name: "description", content: "Visit our Dhaka studio or connect with our drapery consultation team for window measurements and custom orders." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      {/* Hero Header */}
      <section className="bg-[#1A1A1A] text-white py-16 px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto max-w-4xl text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">Connect with JNS</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#FAF9F6]">
            Showroom & Consultations
          </h1>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Book an in-person fabric consultation at our studio or request doorstep measurements for your home in Dhaka.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4A25A]">Client Services</span>
              <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mt-1">We're Here to Help</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Whether you have questions about fabric durability, curtain hardware compatibility, or placing bulk hospitality orders, our textile specialists are at your disposal.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4">
                <MapPin className="h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Dhaka Showroom & Studio</p>
                  <p className="text-muted-foreground mt-0.5">House 42, Road 11, Block D, Banani / Gulshan-2, Dhaka 1213, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4">
                <Phone className="h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Hotline & WhatsApp Consultation</p>
                  <p className="text-muted-foreground mt-0.5">+880 1700-000000 · +880 1800-000000</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4">
                <Mail className="h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Email Inquiries</p>
                  <p className="text-muted-foreground mt-0.5">concierge@jnsfurnishing.com · trade@jnsfurnishing.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white p-4">
                <Clock className="h-5 w-5 text-[#2E473A] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Showroom Hours</p>
                  <p className="text-muted-foreground mt-0.5">Saturday – Thursday: 10:00 AM – 8:30 PM (Friday by appointment)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-[#E8E2D8] bg-white p-8 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-[#1A1A1A]">Send a Message</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-6">Our concierge team typically responds within 2 hours.</p>

            {sent ? (
              <div className="rounded-2xl bg-[#2E473A] p-8 text-center text-white space-y-2">
                <Sparkles className="h-8 w-8 text-[#D4A25A] mx-auto" />
                <h4 className="font-serif text-xl font-bold">Message Sent Successfully</h4>
                <p className="text-xs text-[#EADCC8]">
                  Thank you for reaching out. A JNS textile specialist will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Your Name *</label>
                  <input
                    required
                    placeholder="e.g. Tanzim Ahmed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="tanzim@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Phone / WhatsApp</label>
                    <input
                      placeholder="+880 1700-000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">How can we assist you? *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your window sizes, fabric questions, or showroom visit preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-[#2E473A] py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127] transition-all shadow-md"
                >
                  Send Inquiry <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}