import { NextResponse } from "next/server";
import { verifyCaixaSession } from "@/lib/session";
import { getMovimentos, addMovimento, aprovarMovimento, initSheet } from "@/lib/google";

const CARGO_TESOUREIRO = "Tesoureiro";

export async function GET() {
  const user = await verifyCaixaSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const movimentos = await getMovimentos();
    return NextResponse.json(movimentos);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await verifyCaixaSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    // Ensure sheet has headers
    await initSheet();

    const body = await req.json();
    const isTesoureiro = user.cargo === CARGO_TESOUREIRO;

    const mov = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      data: body.data,
      tipo: body.tipo,
      categoria: `${body.setor} > ${body.subcategoria}`,
      descricao: body.descricao || "",
      valor: parseFloat(body.valor),
      lancadoPor: user.nome,
      cargo: user.cargo,
      documento: body.documento || "",
      dataLancamento: new Date().toISOString(),
      formaPagamento: body.formaPagamento || "Dinheiro",
      estado: isTesoureiro ? "Aprovado" as const : "Pendente" as const,
      aprovadoPor: isTesoureiro ? user.nome : "",
    };

    await addMovimento(mov);
    return NextResponse.json(mov, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

/** PATCH — Tesoureiro approves a pending movement */
export async function PATCH(req: Request) {
  const user = await verifyCaixaSession();
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  if (user.cargo !== CARGO_TESOUREIRO) {
    return NextResponse.json({ error: "Apenas o Tesoureiro pode aprovar movimentos" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "ID em falta" }, { status: 400 });

    const ok = await aprovarMovimento(id, user.nome);
    if (!ok) return NextResponse.json({ error: "Movimento não encontrado" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
