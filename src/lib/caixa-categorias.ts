/** Categorias baseadas no Relatório e Contas do AAC */
/** Setores: Sede, Futebol, Patinagem */

export const SETORES = ["Sede", "Futebol", "Patinagem"] as const;
export type Setor = (typeof SETORES)[number];

export type TipoMovimento = "Entrada" | "Saída";
export type FormaPagamento = "Dinheiro" | "Bancário";
export type EstadoMovimento = "Pendente" | "Aprovado";

/** Sub-categorias por setor (receitas) */
export const SUBCATEGORIAS_RECEITAS: Record<Setor, string[]> = {
  "Sede": [
    "Bar",
    "Quotas de sócios",
    "Bailes",
    "Aniversário",
    "Protocolo C.M. Mafra (escolas)",
    "Protocolo Desporto C.M. Mafra",
    "C.M. Mafra - Apoio",
    "C.M. Mafra - Deslocações",
    "IPDJ",
    "União de Freguesias (UFMSA)",
    "Futebol diário",
    "Jiu Jitsu",
    "Aluguer Ginásio",
    "Outros Alugueres",
    "Abóbras (Luz e água)",
    "Donativos",
    "Diversos",
  ],
  "Futebol": [
    "Bar",
    "Protocolo CDM",
    "Bilheteira",
    "Equipamentos e Merchandising",
    "Donativos",
    "Diversos",
    "Alugueres",
    "Eventos",
  ],
  "Patinagem": [
    "Equipamentos, Merchandising e Fatos",
    "Inscrições / Testes / Exames / Seguros",
    "Donativos",
    "Mensalidades",
  ],
};

/** Sub-categorias por setor (gastos) */
export const SUBCATEGORIAS_GASTOS: Record<Setor, string[]> = {
  "Sede": [
    "Bar",
    "Água",
    "Eletricidade",
    "Gás",
    "Bailes",
    "Aniversário",
    "I.C. / IRC / I.S.",
    "Seguros",
    "Comunicação",
    "Limpeza e Higiene",
    "Ferramentas e utensílios",
    "Despesas de representação",
    "Conservação e Reparação - Sede",
    "Conservação e Reparação - Campo Futebol",
    "Central Fotovoltaica - Sede",
    "Central Fotovoltaica - Campo Futebol",
    "Diversos",
  ],
  "Futebol": [
    "Água",
    "Eletricidade",
    "Gás",
    "Equipamentos e Merchandising",
    "Policiamento",
    "Refeições",
    "Equipa Técnica",
    "AFL",
    "Exames médicos e medicamentos",
    "Deslocações",
    "Ferramentas e utensílios",
    "Despesas de representação",
    "Limpeza e Higiene",
    "Eventos",
  ],
  "Patinagem": [
    "APL",
    "Inscrições / Exames médicos",
    "Equipamentos, Merchandising e Fatos",
    "Treinadores",
  ],
};

export function getSubcategorias(tipo: TipoMovimento, setor: Setor): string[] {
  const map = tipo === "Entrada" ? SUBCATEGORIAS_RECEITAS : SUBCATEGORIAS_GASTOS;
  return map[setor] || [];
}
