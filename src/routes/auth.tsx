import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { requestCodeFn, verifyCodeFn, userMeFn } from "@/lib/auth.functions";

type Search = { redirect?: string };

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In & Client Access — JNS Furnishing" },
      { name: "description", content: "Sign in to your JNS Furnishing account to track custom curtain orders and manage your saved bespoke furnishings." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/auth" });
  const qc = useQueryClient();
  const requestCode = useServerFn(requestCodeFn);
  const verifyCode = useServerFn(verifyCodeFn);

  const [step, setStep] = useState<"identify" | "verify">("identify");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userMeFn().then((r) => {
      if (r.user) navigate({ to: redirect || "/dashboard" });
    });
  }, [navigate, redirect]);

  async function submitIdentify(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await requestCode({ data: { name, email } });
      setStep("verify");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }

  async function submitVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setLoading(true);
    try {
      await verifyCode({ data: { email, code } });
      await qc.invalidateQueries({ queryKey: ["me"] });
      navigate({ to: redirect || "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto flex max-w-sm flex-col px-6 py-20">
        <h1 className="font-display text-3xl">
          {step === "identify" ? "Sign in" : "Enter code"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === "identify"
            ? "We'll email you a 6-digit code."
            : `Sent to ${email}.`}
        </p>

        {step === "identify" ? (
          <form onSubmit={submitIdentify} className="mt-8 space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={80}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
            {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground disabled:opacity-60"
            >
              {loading ? "Sending…" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={submitVerify} className="mt-8 space-y-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required inputMode="numeric" pattern="\d{6}" maxLength={6} autoFocus
              placeholder="000000"
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-xl tracking-[0.4em] outline-none focus:border-primary"
            />
            {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm text-primary-foreground disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify"}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => { setStep("identify"); setCode(""); setError(null); }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Use a different email
            </button>
          </form>
        )}

        {step === "identify" && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-foreground underline underline-offset-4 hover:text-primary">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
