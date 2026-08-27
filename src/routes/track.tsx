import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Search, Package, Clock, CheckCircle2, Truck, Scissors, ArrowRight, ShieldCheck, Phone } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { trackOrderFn, type Order } from "@/lib/orders.functions";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Your Order — JNS Furnishing" },
      { name: "description", content: "Track your live custom curtain, bedding, or sofa cover order progress in real-time." },
    ],
  }),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const track = useServerFn(trackOrderFn);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await track({ data: { query: query.trim() } });
      setOrder(res);
    } catch (err: any) {
      setError(err?.message || "Failed to search order");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case "pending":
        return 0;
      case "confirmed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { title: "Order Confirmed", desc: "Tailoring details & fit verified", icon: CheckCircle2 },
    { title: "Atelier Tailoring", desc: "Fabric cut & pleated by master craftsmen", icon: Scissors },
    { title: "Out for Delivery", desc: "Courier dispatched for doorstep fitting", icon: Truck },
    { title: "Delivered & Inspected", desc: "Completed with 7-day fit warranty", icon: Package },
  ];

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-14 text-left">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#D4A25A]">
            Real-Time Concierge Tracking
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#141715]">
            Track Your Furnishing Order
          </h1>
          <p className="text-xs sm:text-sm text-[#7A766F] leading-relaxed">
            Enter your order reference number (e.g. <strong className="text-[#141715]">SV-260828-...</strong>) or phone number to see live tailoring and delivery status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 sm:mt-8 max-w-lg mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A766F]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. SV-260828-1943 or 01700-000000"
              required
              className="w-full rounded-sm border border-[#E8E2D8] bg-white pl-10 pr-4 py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#141715] shadow-xs"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-sm bg-[#141715] px-5 sm:px-7 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all disabled:opacity-60 cursor-pointer shrink-0"
          >
            {loading ? "Tracking..." : "Track Status"}
          </button>
        </form>

        {error && (
          <div className="mt-6 max-w-lg mx-auto rounded-sm bg-red-50 border border-red-200 p-3 text-xs text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {searched && !loading && !order && !error && (
          <div className="mt-8 rounded-sm sm:rounded-md border border-dashed border-[#E8E2D8] bg-white p-8 sm:p-12 text-center max-w-lg mx-auto">
            <Package className="h-10 w-10 text-[#7A766F] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#141715]">No order found</h3>
            <p className="text-xs text-[#7A766F] mt-1">
              We couldn't locate an order matching "{query}". Please check the reference number from your confirmation SMS or call our concierge.
            </p>
          </div>
        )}

        {/* Order Details Display */}
        {order && (
          <div className="mt-8 sm:mt-10 rounded-md sm:rounded-lg border border-[#E8E2D8] bg-white p-5 sm:p-8 shadow-sm space-y-8 animate-in fade-in-0 duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D8] pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#7A766F] uppercase tracking-wider font-bold">Order Number:</span>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-[#141715]">{order.order_number}</span>
                </div>
                <p className="text-xs text-[#7A766F] mt-1">
                  Placed on {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {order.city}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7A766F]">Status:</span>
                <span
                  className={`rounded-sm px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                    order.status === "delivered"
                      ? "bg-emerald-100 text-emerald-800"
                      : order.status === "cancelled"
                      ? "bg-red-100 text-red-800"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "confirmed"
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            {order.status !== "cancelled" ? (
              <div className="py-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
                  {steps.map((st, idx) => {
                    const Icon = st.icon;
                    const isDone = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div key={st.title} className="relative flex flex-col items-center text-center space-y-2">
                        <div
                          className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all ${
                            isDone
                              ? "bg-[#141715] border-[#141715] text-white shadow-sm"
                              : "bg-[#FAF9F6] border-[#E8E2D8] text-[#7A766F]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${isCurrent ? "text-[#D4A25A]" : isDone ? "text-[#141715]" : "text-[#7A766F]"}`}>
                            {st.title}
                          </p>
                          <p className="text-[10px] text-[#7A766F] leading-tight mt-0.5 max-w-[140px] mx-auto">
                            {st.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-sm bg-red-50 border border-red-200 p-4 text-center text-xs text-red-700 font-medium">
                This order was marked as cancelled. Please contact our support if you believe this was in error.
              </div>
            )}

            {/* Order Items List */}
            <div className="border-t border-[#E8E2D8] pt-6 space-y-4">
              <h3 className="text-sm font-bold text-[#141715] uppercase tracking-wider">Itemized Furnishings</h3>
              <div className="divide-y divide-[#E8E2D8] rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] p-4">
                {order.items.map((it) => (
                  <div key={it.slug} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={it.img} alt={it.name} className="h-10 w-10 rounded-sm object-cover bg-white" />
                      <div>
                        <p className="font-bold text-[#141715]">{it.name}</p>
                        <p className="text-[11px] text-[#7A766F]">Quantity: {it.qty}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#141715]">
                      ৳{(it.price * it.qty).toLocaleString("en-BD")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recipient & Total */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E8E2D8] pt-6 text-xs">
              <div className="space-y-1 text-[#7A766F]">
                <span className="font-bold text-[#141715] uppercase tracking-wider block">Delivery Recipient</span>
                <p className="font-semibold text-[#141715]">{order.customer_name}</p>
                <p>{order.phone}</p>
                <p className="text-[#141715] font-medium leading-relaxed">📍 {order.address}, {order.city}</p>
              </div>

              <div className="space-y-2 sm:text-right text-[#7A766F]">
                <div className="flex justify-between sm:justify-end gap-4">
                  <span>Payment Mode:</span>
                  <strong className="text-[#141715] uppercase">Cash on Delivery / bKash</strong>
                </div>
                <div className="flex justify-between sm:justify-end gap-4 text-sm font-bold pt-1 border-t sm:border-t-0 border-[#E8E2D8]">
                  <span className="text-[#141715]">Total Payable:</span>
                  <span className="text-lg font-extrabold text-[#141715]">
                    ৳{Number(order.total).toLocaleString("en-BD")}
                  </span>
                </div>
              </div>
            </div>

            {/* Need adjustments help */}
            <div className="rounded-sm bg-[#F4EFEA] border border-[#E8E2D8] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#D4A25A]" />
                <span className="text-[#141715] font-medium">Need to modify window measurements or change delivery timing?</span>
              </div>
              <a
                href="https://wa.me/8801700000000?text=Hi%20JNS%20Furnishing,%20I%20would%20like%20to%20inquire%20about%20my%20order"
                target="_blank"
                rel="noreferrer"
                className="rounded-sm bg-[#141715] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-colors shrink-0"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
