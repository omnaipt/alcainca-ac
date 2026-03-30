import { NextResponse } from "next/server";
import { verifyCaixaSession } from "@/lib/session";

export async function GET() {
  const user = await verifyCaixaSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  return NextResponse.json({ id: user.id, nome: user.nome, cargo: user.cargo });
}
