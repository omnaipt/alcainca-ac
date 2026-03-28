import { NextResponse } from "next/server";
import { deleteCaixaSession } from "@/lib/caixa-session";

export async function POST() {
  await deleteCaixaSession();
  return NextResponse.json({ ok: true });
}
