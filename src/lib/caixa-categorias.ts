/** Categorias baseadas no Relatório e Contas do AAC */

export const SECCOES_RECEITAS = [
  "Sede",
  "Pavilhão",
  "Subsídios",
  "Quotas",
  "Eventos",
  "Futebol",
  "Patinagem Artística",
  "Outros Proveitos",
] as const;

export const SECCOES_GASTOS = [
  "Sede",
  "Pavilhão",
  "Sede Antiga",
  "Eventos",
  "Futebol",
  "Patinagem Artística",
  "Impostos",
  "Outros Fornecimentos e Serviços",
  "Património",
] as const;

/** Sub-categorias por secção (receitas) */
export const SUBCATEGORIAS_RECEITAS: Record<string, string[]> = {
  "Sede": ["Bar"],
  "Pavilhão": ["Futebol diário", "Jiu Jitsu", "Aluguer Ginásio", "Donativos", "Outros Alugueres"],
  "Subsídios": ["Protocolo C.M. Mafra (escolas)", "Protocolo Desporto C.M. Mafra", "C.M. Mafra - Apoio", "C.M. Mafra - Deslocações", "IPDJ", "União de Freguesias (UFMSA)", "Outro"],
  "Quotas": ["Quotas de sócios"],
  "Eventos": ["Bailes", "Aniversário", "Outro"],
  "Futebol": ["Bar", "Protocolo CDM", "Bilheteira", "Equipamentos e Merchandising", "Donativos", "Diversos", "Alugueres", "Eventos"],
  "Patinagem Artística": ["Equipamentos, Merchandising e Fatos", "Inscrições / Testes / Exames / Seguros", "Donativos", "Mensalidades"],
  "Outros Proveitos": ["Abóbras (Luz e água)", "Diversos"],
};

/** Sub-categorias por secção (gastos) */
export const SUBCATEGORIAS_GASTOS: Record<string, string[]> = {
  "Sede": ["Bar"],
  "Pavilhão": ["Eletricidade", "Gás"],
  "Sede Antiga": ["Água", "Eletricidade"],
  "Eventos": ["Bailes", "Aniversário", "Outro"],
  "Futebol": ["Água", "Equipamentos e Merchandising", "Policiamento", "Refeições", "Eletricidade", "Equipa Técnica", "AFL", "Exames médicos e medicamentos", "Deslocações", "Ferramentas e utensílios", "Gás", "Despesas de representação", "Limpeza e Higiene", "Eventos"],
  "Patinagem Artística": ["APL", "Inscrições / Exames médicos", "Equipamentos, Merchandising e Fatos", "Treinadores"],
  "Impostos": ["I.C. / IRC / I.S."],
  "Outros Fornecimentos e Serviços": ["Ferramentas e utensílios", "Limpeza e Higiene", "Seguros", "Despesas de representação", "Comunicação", "Diversos"],
  "Património": ["Central Fotovoltaica - Campo Futebol", "Central Fotovoltaica - Sede", "Conservação e Reparação - Sede", "Conservação e Reparação - Campo Futebol"],
};

export type TipoMovimento = "Entrada" | "Saída";

export function getSeccoes(tipo: TipoMovimento) {
  return tipo === "Entrada" ? SECCOES_RECEITAS : SECCOES_GASTOS;
}

export function getSubcategorias(tipo: TipoMovimento, seccao: string): string[] {
  const map = tipo === "Entrada" ? SUBCATEGORIAS_RECEITAS : SUBCATEGORIAS_GASTOS;
  return map[seccao] || [];
}
