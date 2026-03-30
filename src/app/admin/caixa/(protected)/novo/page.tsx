"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SETORES,
  SUBCATEGORIAS_RECEITAS,
  SUBCATEGORIAS_GASTOS,
  type TipoMovimento,
  type Setor,
  type FormaPagamento,
} from "@/lib/caixa-categorias";

export default function NovoLancamento() {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoMovimento>("Entrada");
  const [setor, setSetor] = useState<string>("");
  const [subcategoria, setSubcategoria] = useState("");
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("Dinheiro");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [error, setError] = useState("");

  const subcategorias = setor
    ? (tipo === "Entrada"
        ? SUBCATEGORIAS_RECEITAS[setor as Setor]
        : SUBCATEGORIAS_GASTOS[setor as Setor]) || []
    : [];

  function handleTipoChange(newTipo: TipoMovimento) {
    setTipo(newTipo);
    setSetor("");
    setSubcategoria("");
  }

  function handleSetorChange(newSetor: string) {
    setSetor(newSetor);
    setSubcategoria("");
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/caixa/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setDocUrl(data.url);
      } else {
        setError(data.error || "Erro ao carregar ficheiro");
      }
    } catch {
      setError("Erro ao carregar ficheiro");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/caixa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: form.get("data"),
          tipo,
          setor,
          subcategoria,
          descricao: form.get("descricao"),
          valor: form.get("valor"),
          formaPagamento,
          documento: docUrl,
        }),
      });

      if (res.ok) {
        router.push("/admin/caixa");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao guardar");
      }
    } catch {
      setError("Erro de ligação");
    } finally {
      setSaving(false);
    }
  }

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/caixa" className="text-muted-foreground hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-foreground">Novo Lançamento</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-5 max-w-2xl">
        {/* Tipo toggle */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Tipo de movimento *</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTipoChange("Entrada")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                tipo === "Entrada"
                  ? "bg-green-600 text-white"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              Entrada (Receita)
            </button>
            <button
              type="button"
              onClick={() => handleTipoChange("Saída")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                tipo === "Saída"
                  ? "bg-red-600 text-white"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              Saída (Despesa)
            </button>
          </div>
        </div>

        {/* Forma de Pagamento */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Forma de pagamento *</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFormaPagamento("Dinheiro")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                formaPagamento === "Dinheiro"
                  ? "bg-gold text-background"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              Dinheiro
            </button>
            <button
              type="button"
              onClick={() => setFormaPagamento("Bancário")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                formaPagamento === "Bancário"
                  ? "bg-blue-600 text-white"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              Bancário
            </button>
          </div>
        </div>

        {/* Data + Valor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Data *</label>
            <input name="data" type="date" defaultValue={hoje} required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Valor (&euro;) *</label>
            <input name="valor" type="number" step="0.01" min="0.01" required placeholder="0.00" className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-muted-foreground/50" />
          </div>
        </div>

        {/* Setor */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Setor *</label>
          <select
            value={setor}
            onChange={(e) => handleSetorChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
          >
            <option value="">Selecione o setor</option>
            {SETORES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Subcategoria */}
        {subcategorias.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Subcategoria *</label>
            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
            >
              <option value="">Selecione a subcategoria</option>
              {subcategorias.map((sc) => (
                <option key={sc} value={sc}>{sc}</option>
              ))}
            </select>
          </div>
        )}

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
          <textarea name="descricao" rows={3} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none resize-y placeholder:text-muted-foreground/50" placeholder="Detalhes do movimento..." />
        </div>

        {/* Upload documento */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Documento (opcional)</label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
          />
          {uploading && <p className="text-sm text-muted-foreground mt-1">A carregar ficheiro...</p>}
          {docUrl && (
            <p className="text-sm text-green-400 mt-1">
              Ficheiro carregado com sucesso.{" "}
              <a href={docUrl} target="_blank" rel="noopener noreferrer" className="underline">Ver</a>
            </p>
          )}
        </div>

        {error && <p className="text-accent text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="gradient-gold text-background font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Registar Lançamento"}
          </button>
          <Link href="/admin/caixa" className="px-6 py-2.5 text-muted-foreground hover:text-gold transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
