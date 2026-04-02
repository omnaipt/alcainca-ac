"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovoEvento() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagemUrl, setImagemUrl] = useState("");
  const [error, setError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/eventos/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setImagemUrl(data.url);
      } else {
        setError(data.error || "Erro ao carregar imagem");
      }
    } catch {
      setError("Erro ao carregar imagem");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const evento = {
      id: "",
      titulo: form.get("titulo") as string,
      data: form.get("data") as string,
      hora: form.get("hora") as string,
      local: form.get("local") as string,
      descricao: form.get("descricao") as string,
      tipo: form.get("tipo") as string,
      marcacaoObrigatoria: form.get("marcacao") === "on",
      destaque: form.get("destaque") === "on",
      imagem: imagemUrl || undefined,
    };

    try {
      const res = await fetch("/api/eventos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evento),
      });

      if (res.ok) {
        router.push("/admin/eventos");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao criar evento");
      }
    } catch {
      setError("Erro de ligação");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/eventos" className="text-muted-foreground hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-foreground">Novo Evento</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Titulo *</label>
          <input name="titulo" required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-muted-foreground/50" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Data *</label>
            <input name="data" type="date" required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Hora *</label>
            <input name="hora" type="time" required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Local *</label>
          <input name="local" required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-muted-foreground/50" placeholder="Ex: Sede do Alcainça AC" />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Tipo *</label>
          <select name="tipo" required className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none">
            <option value="Evento">Evento</option>
            <option value="Sócios">Sócios</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Baile">Baile</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
          <textarea name="descricao" rows={4} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none resize-y placeholder:text-muted-foreground/50" placeholder="Detalhes do evento..." />
        </div>

        {/* Upload imagem */}
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Imagem de divulgação (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
          />
          {uploading && <p className="text-sm text-muted-foreground mt-1">A carregar imagem...</p>}
          {imagemUrl && (
            <div className="mt-2">
              <img src={imagemUrl} alt="Preview" className="w-full max-w-xs rounded-lg border border-border" />
              <button type="button" onClick={() => setImagemUrl("")} className="text-xs text-accent mt-1 hover:underline">
                Remover imagem
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="marcacao" className="rounded border-border accent-gold" />
            <span>Marcação obrigatória</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="destaque" defaultChecked className="rounded border-border accent-gold" />
            <span>Mostrar em destaque na homepage</span>
          </label>
        </div>

        {error && <p className="text-accent text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="gradient-gold text-background font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Criar Evento"}
          </button>
          <Link href="/admin/eventos" className="px-6 py-2.5 text-muted-foreground hover:text-gold transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
