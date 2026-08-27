import { useSession } from "@tanstack/react-start/server";

export type AdminSession = { username?: string };

export function getSessionConfig() {
  const password =
    process.env.SESSION_SECRET ||
    "jns_furnishing_super_secure_session_secret_key_32_characters_long_2026";
  return {
    password,
    name: "sanvogue-admin",
    maxAge: 60 * 60 * 24 * 7,
    cookie: {
      sameSite: "lax" as const,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  };
}

export async function getAdminSession() {
  return useSession<AdminSession>(getSessionConfig());
}

export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin123";
export const VALID_ADMIN_PASSWORDS = ["admin123", "sanvogue2026", "admin"];
