import { NextResponse } from "next/server";
import { verifyCaixaSession } from "@/lib/caixa-session";
import { getMovimentos, addMovimento, initSheet } from "@/lib/google";

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
    const mov = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      data: body.data,
      tipo: body.tipo,
      categoria: `${body.seccao} > ${body.subcategoria}`,
      descricao: body.descricao || "",
      valor: parseFloat(body.valor),
      lancadoPor: user.nome,
      cargo: user.cargo,
      documento: body.documento || "",
      dataLancamento: new Date().toISOString(),
    };

    await addMovimento(mov);
    return NextResponse.json(mov, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
