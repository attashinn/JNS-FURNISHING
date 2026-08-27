import { useSession } from "@tanstack/react-start/server";

export type UserSession = { userId?: number; email?: string; name?: string };

export function getUserSessionConfig() {
  const password =
    process.env.SESSION_SECRET ||
    "jns_furnishing_super_secure_session_secret_key_32_characters_long_2026";
  return {
    password,
    name: "sanvogue-user",
    maxAge: 60 * 60 * 24 * 30,
    cookie: {
      sameSite: "lax" as const,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    },
  };
}

export async function getUserSession() {
  return useSession<UserSession>(getUserSessionConfig());
}