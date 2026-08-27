import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminLoginFn, adminMeFn } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Login — JNS Furnishing" }, { name: "robots", content: "noindex" }] }),
  loader: async () => {
    try {
      const me = await adminMeFn();
      if (me?.username) {
        throw redirect({ to: "/admin" });
      }
    } catch (err: any) {
      if (err?.isRedirect || (err && typeof err === "object" && "to" in err)) {
        throw err;
      }
      return null;
    }
    return null;
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useServerFn(adminLoginFn);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ data: { username, password } });
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F6] px-4 sm:px-6">
      <div className="w-full max-w-sm rounded-md sm:rounded-lg bg-white p-6 sm:p-8 shadow-xl border border-[#E8E2D8] text-left">
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4A25A] font-bold block">Internal Concierge</span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#141715] mt-1">JNS Admin Portal</h1>
          <p className="text-xs text-[#7A766F] mt-1">Store catalogue, live orders & customer reviews</p>
        </div>

        <div className="mb-5 rounded-sm bg-[#F4EFEA] border border-[#E8E2D8] p-3 text-xs text-[#7A766F]">
          <p className="font-bold text-[#141715] mb-0.5">Admin Demo Credentials:</p>
          <div className="flex items-center justify-between text-[11px]">
            <span>User: <strong className="text-[#141715]">admin</strong></span>
            <span>Pass: <strong className="text-[#141715]">admin123</strong></span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#141715]">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#141715]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D8] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium outline-none focus:border-[#141715]"
            />
          </div>

          {error && <p className="rounded-sm bg-red-50 border border-red-200 p-2.5 text-xs text-red-600 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading || !hydrated}
            className="w-full rounded-sm bg-[#141715] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A] transition-all shadow-md disabled:opacity-60 cursor-pointer"
          >
            {!hydrated ? "Loading..." : loading ? "Signing in..." : "Sign into Dashboard →"}
          </button>
        </form>
      </div>
    </div>
  );
}
