import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "caixa_session";
const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-secret-change-me");

export type CaixaUser = {
  id: string;
  nome: string;
  cargo: string;
  password: string;
};

/** List of directors — loaded from env var CAIXA_USERS */
export function getUsers(): CaixaUser[] {
  try {
    return JSON.parse(process.env.CAIXA_USERS || "[]");
  } catch {
    return [];
  }
}

/** Returns user list without passwords (safe for client) */
export function getUsersSafe(): Omit<CaixaUser, "password">[] {
  return getUsers().map(({ password: _, ...rest }) => rest);
}

export async function createCaixaSession(user: { id: string; nome: string; cargo: string }) {
  const token = await new SignJWT({ id: user.id, nome: user.nome, cargo: user.cargo })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function verifyCaixaSession(): Promise<{ id: string; nome: string; cargo: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return {
      id: payload.id as string,
      nome: payload.nome as string,
      cargo: payload.cargo as string,
    };
  } catch {
    return null;
  }
}

export async function deleteCaixaSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
