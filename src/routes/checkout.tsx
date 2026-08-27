import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { useCart } from "@/hooks/use-cart";
import { placeOrderFn } from "@/lib/orders.functions";
import { userMeFn } from "@/lib/auth.functions";
import { formatPriceBDT } from "@/lib/jns-helpers";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout & Order Details — JNS Furnishing" },
      { name: "description", content: "Complete your bespoke home furnishing order with Cash on Delivery and bKash in Bangladesh." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, total, clearCart, setIsOpen } = useCart();
  const placeOrder = useServerFn(placeOrderFn);
  const navigate = useNavigate();
  const { data: me, isLoading: meLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => userMeFn(),
    staleTime: 30_000,
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (!meLoading && me && !me.user) {
      navigate({ to: "/auth", search: { redirect: "/checkout" } });
    }
  }, [me, meLoading, navigate]);

  const [form, setForm] = useState({
    customer_name: me?.user?.name || "",
    phone: "",
    email: me?.user?.email || "",
    address: "",
    city: "Dhaka",
    notes: "",
  });

  useEffect(() => {
    if (me?.user) {
      setForm((f) => ({
        ...f,
        customer_name: f.customer_name || me.user.name,
        email: f.email || me.user.email,
      }));
    }
  }, [me]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ order_number: string; total: number } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await placeOrder({
        data: {
          ...form,
          items: items.map((i) => ({ slug: i.slug, name: i.name, price: i.price, img: i.img, qty: i.qty })),
        },
      });
      setConfirmed({ order_number: res.order_number, total: res.total });
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-20 text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#2E473A] text-[#D4A25A]">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A25A]">Order Confirmed</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-[#1A1A1A]">Thank You for Your Order.</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Your home furnishing order has been received. Our concierge team will contact you shortly on your phone to confirm tailoring and dispatch details.
          </p>

          <div className="rounded-3xl border border-[#E8E2D8] bg-white p-8 text-left space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order Reference Number</span>
              <span className="font-mono text-base font-bold text-[#2E473A]">{confirmed.order_number}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payment Method</span>
              <span className="font-medium text-sm text-foreground">Cash on Delivery / bKash at Doorstep</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Amount</span>
              <span className="font-serif text-2xl font-bold text-[#2E473A]">{formatPriceBDT(confirmed.total)}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#2E473A] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#1E3127]"
            >
              Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8 py-6 sm:py-12 text-left">
        <div className="border-b border-[#E8E2D8] pb-4 sm:pb-6 mb-6 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4A25A]">Secure Checkout</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#141715] mt-1 leading-tight">Complete Your Order</h1>
        </div>

        {hydrated && items.length === 0 ? (
          <div className="rounded-md sm:rounded-lg border border-dashed border-[#E8E2D8] bg-white p-8 sm:p-12 text-center max-w-md mx-auto">
            <p className="text-base sm:text-lg font-bold text-[#141715]">Your shopping bag is empty.</p>
            <Link
              to="/shop"
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#141715] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-4 sm:p-7 space-y-5 sm:space-y-6 shadow-xs">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#141715] leading-snug">Delivery & Recipient Information</h2>
                <p className="text-[11.5px] sm:text-xs text-[#7A766F] mt-0.5">Please provide accurate contact details for courier dispatch.</p>
              </div>

              <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
                <Field label="Full Name *" value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} required />
                <Field label="Contact Phone / WhatsApp *" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+880 1700-000000" required />
                <Field label="Email Address *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <div>
                  <Label>City / District *</Label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]"
                  >
                    <option value="Dhaka">Dhaka City</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Outside Dhaka">Other Districts</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <Label>Detailed Delivery Address *</Label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                    rows={3}
                    className="mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs outline-none focus:border-[#141715]"
                    placeholder="Apartment / House number, Road, Sector / Area..."
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label>Order Notes / Special Tailoring Instructions (Optional)</Label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs outline-none focus:border-[#141715]"
                    placeholder="e.g. Ring eyelets in antique brass, leave with building reception..."
                  />
                </div>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#141715]">Payment Option</h2>
                <div className="mt-2.5 rounded-sm sm:rounded-md border border-[#E8E2D8] bg-[#FAF9F6] p-3.5 sm:p-4 flex items-center gap-3">
                  <input type="radio" checked readOnly className="h-4 w-4 accent-[#141715]" />
                  <div>
                    <p className="text-xs font-bold text-[#141715]">Cash on Delivery & bKash / Nagad</p>
                    <p className="text-[11px] text-[#7A766F] mt-0.5">Pay conveniently upon delivery or via mobile banking when verified.</p>
                  </div>
                </div>
              </div>

              {error && <p className="rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !hydrated}
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-[#141715] py-3.5 sm:py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all shadow-md disabled:opacity-60 cursor-pointer"
              >
                {submitting ? "Processing Order..." : `Place Order · ${formatPriceBDT(total)}`}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            {/* Sidebar Summary */}
            <aside className="rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-4 sm:p-6 space-y-5 h-fit shadow-xs">
              <h2 className="text-base sm:text-lg font-bold text-[#141715]">Your Selection</h2>
              <div className="divide-y divide-[#E8E2D8] max-h-96 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={i.slug} className="flex items-center gap-3 py-3">
                    <img src={i.img} alt={i.name} className="h-12 w-12 rounded-sm object-cover bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-[#141715] truncate">{i.name}</p>
                      <p className="text-[10px] text-[#7A766F]">Qty {i.qty}</p>
                    </div>
                    <span className="font-bold text-xs text-[#141715]">{formatPriceBDT(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8E2D8] pt-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-[#7A766F]">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#141715]">{formatPriceBDT(total)}</span>
                </div>
                <div className="flex justify-between text-[#7A766F]">
                  <span>Delivery:</span>
                  <span className="font-medium text-[#141715]">
                    {total >= 5000 ? <span className="text-[#2E473A] font-bold">Complimentary (Free)</span> : "Calculated upon dispatch"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#E8E2D8] pt-2 text-sm font-bold">
                  <span className="text-[#141715]">Total:</span>
                  <span className="text-xl font-extrabold text-[#141715]">{formatPriceBDT(total)}</span>
                </div>
              </div>

              <div className="rounded-sm bg-[#FAF9F6] border border-[#E8E2D8] p-3 text-[11px] text-[#7A766F] space-y-1.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D4A25A]" />
                  <span>100% Quality Fabric Assured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-[#D4A25A]" />
                  <span>Doorstep Inspection on Delivery</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-foreground">{children}</label>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full rounded-xl border border-[#E8E2D8] bg-[#FAF9F6] px-4 py-2.5 text-xs outline-none focus:border-[#D4A25A]"
      />
    </div>
  );
}
