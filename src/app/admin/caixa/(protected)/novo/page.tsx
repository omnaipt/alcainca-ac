"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  SECCOES_RECEITAS,
  SECCOES_GASTOS,
  SUBCATEGORIAS_RECEITAS,
  SUBCATEGORIAS_GASTOS,
  type TipoMovimento,
} from "@/lib/caixa-categorias";

export default function NovoLancamento() {
  const router = useRouter();
  const [tipo, setTipo] = useState<TipoMovimento>("Entrada");
  const [seccao, setSeccao] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docUrl, setDocUrl] = useState("");
  const [error, setError] = useState("");

  const seccoes = tipo === "Entrada" ? SECCOES_RECEITAS : SECCOES_GASTOS;
  const subcategorias = tipo === "Entrada"
    ? SUBCATEGORIAS_RECEITAS[seccao] || []
    : SUBCATEGORIAS_GASTOS[seccao] || [];

  function handleTipoChange(newTipo: TipoMovimento) {
    setTipo(newTipo);
    setSeccao("");
    setSubcategoria("");
  }

  function handleSeccaoChange(newSeccao: string) {
    setSeccao(newSeccao);
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
          seccao,
          subcategoria,
          descricao: form.get("descricao"),
          valor: form.get("valor"),
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
        <Link href="/admin/caixa" className="text-gray-400 hover:text-navy transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-navy">Novo Lançamento</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border shadow-sm space-y-5 max-w-2xl">
        {/* Tipo toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de movimento *</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleTipoChange("Entrada")}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                tipo === "Entrada"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Saída (Despesa)
            </button>
          </div>
        </div>

        {/* Data + Valor */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <input name="data" type="date" defaultValue={hoje} required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (&euro;) *</label>
            <input name="valor" type="number" step="0.01" min="0.01" required placeholder="0.00" className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" />
          </div>
        </div>

        {/* Secção */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secção *</label>
          <select
            value={seccao}
            onChange={(e) => handleSeccaoChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none"
          >
            <option value="">Selecione a secção</option>
            {seccoes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Subcategoria */}
        {subcategorias.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoria *</label>
            <select
              value={subcategoria}
              onChange={(e) => setSubcategoria(e.target.value)}
              required
              className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea name="descricao" rows={3} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none resize-y" placeholder="Detalhes do movimento..." />
        </div>

        {/* Upload documento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Documento (opcional)</label>
          <input
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-navy/10 file:text-navy hover:file:bg-navy/20"
          />
          {uploading && <p className="text-sm text-gray-400 mt-1">A carregar ficheiro...</p>}
          {docUrl && (
            <p className="text-sm text-green-600 mt-1">
              Ficheiro carregado com sucesso.{" "}
              <a href={docUrl} target="_blank" rel="noopener noreferrer" className="underline">Ver</a>
            </p>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-navy text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-navy-dark transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Registar Lançamento"}
          </button>
          <Link href="/admin/caixa" className="px-6 py-2.5 text-gray-500 hover:text-navy transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
