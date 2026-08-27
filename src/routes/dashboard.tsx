import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Package, LogOut, User as UserIcon } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { userMeFn, userLogoutFn } from "@/lib/auth.functions";
import { myOrdersFn } from "@/lib/orders.functions";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "My Orders & Client Account — JNS Furnishing" },
      { name: "description", content: "Manage your JNS bespoke orders, reviews, and delivery status." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function DashboardPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const logout = useServerFn(userLogoutFn);

  const { data: me, isLoading: meLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => userMeFn(),
  });

  useEffect(() => {
    if (!meLoading && !me?.user) navigate({ to: "/auth" });
  }, [meLoading, me, navigate]);

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => myOrdersFn(),
    enabled: !!me?.user,
  });

  async function handleLogout() {
    await logout();
    await qc.invalidateQueries({ queryKey: ["me"] });
    navigate({ to: "/" });
  }

  if (!me?.user) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="mx-auto max-w-md px-6 py-32 text-center text-sm text-muted-foreground">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
              {me.user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
              <h1 className="font-display text-4xl">{me.user.name}</h1>
              <p className="text-sm text-muted-foreground">{me.user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-muted">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>

        <div className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl">Your orders</h2>
          </div>

          {ordersLoading ? (
            <p className="text-sm text-muted-foreground">Loading your orders…</p>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>
              <Link to="/shop" className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-xs uppercase tracking-widest text-primary-foreground">
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="rounded-2xl border border-border p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Order</p>
                      <p className="font-mono text-sm">{o.order_number}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Placed</p>
                      <p className="text-sm">{new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Total</p>
                      <p className="text-sm font-medium">৳{Number(o.total).toLocaleString("en-IN")}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-widest ${STATUS_COLORS[o.status] ?? "bg-muted text-muted-foreground"}`}>
                      {o.status}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {o.items.map((it) => (
                      <div key={it.slug} className="flex items-center gap-4">
                        <img src={it.img} alt={it.name} className="h-14 w-14 rounded-lg bg-muted object-contain" />
                        <div className="flex-1">
                          <Link to="/product/$slug" params={{ slug: it.slug }} className="text-sm hover:text-primary">
                            {it.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">Qty {it.qty} · ৳{Math.round(it.price).toLocaleString("en-IN")}</p>
                        </div>
                        <Link to="/product/$slug" params={{ slug: it.slug }}
                          className="rounded-full border border-border px-3 py-1.5 text-[10px] uppercase tracking-widest hover:bg-muted">
                          Review
                        </Link>
                      </div>
                    ))}
                  </div>
                  <ProgressTrack status={o.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ProgressTrack({ status }: { status: string }) {
  if (status === "cancelled") return null;
  const steps = ["pending", "confirmed", "shipped", "delivered"];
  const idx = steps.indexOf(status);
  return (
    <div className="mt-6 flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-2">
          <div className={`h-2 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />
          <span className={`text-[10px] uppercase tracking-widest ${i <= idx ? "text-foreground" : "text-muted-foreground"}`}>
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}