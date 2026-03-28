import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!process.env.EVENTOS_PASSWORD) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  if (password !== process.env.EVENTOS_PASSWORD) {
    return NextResponse.json({ error: "Password incorreta" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
