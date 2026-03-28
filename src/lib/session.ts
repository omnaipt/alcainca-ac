import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET || "dev-secret-change-me");

export type DirectorUser = {
  id: string;
  nome: string;
  cargo: string;
  password: string;
};

/** List of directors — loaded from env var CAIXA_USERS */
export function getUsers(): DirectorUser[] {
  try {
    return JSON.parse(process.env.CAIXA_USERS || "[]");
  } catch {
    return [];
  }
}

/** Returns user list without passwords (safe for client) */
export function getUsersSafe(): Omit<DirectorUser, "password">[] {
  return getUsers().map(({ password: _, ...rest }) => rest);
}

// --- Generic session helpers ---

async function createSessionCookie(
  cookieName: string,
  payload: Record<string, unknown>
) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

async function verifySessionCookie(
  cookieName: string
): Promise<{ id: string; nome: string; cargo: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
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

async function deleteSessionCookie(cookieName: string) {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

// --- Eventos session ---

const EVENTOS_COOKIE = "eventos_session";

export async function createEventosSession(user: { id: string; nome: string; cargo: string }) {
  await createSessionCookie(EVENTOS_COOKIE, { id: user.id, nome: user.nome, cargo: user.cargo });
}

export async function verifyEventosSession() {
  return verifySessionCookie(EVENTOS_COOKIE);
}

export async function deleteEventosSession() {
  await deleteSessionCookie(EVENTOS_COOKIE);
}

// --- Caixa session ---

const CAIXA_COOKIE = "caixa_session";

export async function createCaixaSession(user: { id: string; nome: string; cargo: string }) {
  await createSessionCookie(CAIXA_COOKIE, { id: user.id, nome: user.nome, cargo: user.cargo });
}

export async function verifyCaixaSession() {
  return verifySessionCookie(CAIXA_COOKIE);
}

export async function deleteCaixaSession() {
  await deleteSessionCookie(CAIXA_COOKIE);
}
