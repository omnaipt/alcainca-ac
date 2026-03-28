import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "eventos_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-secret-change-me-in-production");

export async function encrypt(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession() {
  const token = await encrypt({ role: "admin", ts: Date.now() });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await decrypt(token);
  return payload !== null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
