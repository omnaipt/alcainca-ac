"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

type Evento = {
  id: string;
  titulo: string;
  data: string;
  hora: string;
  local: string;
  descricao: string;
  tipo: string;
  marcacaoObrigatoria: boolean;
  destaque: boolean;
};

export default function EditarEvento() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [evento, setEvento] = useState<Evento | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/eventos")
      .then((r) => r.json())
      .then((data: Evento[]) => {
        const found = data.find((e) => e.id === id);
        if (found) setEvento(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!evento) return;
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const updated = {
      ...evento,
      titulo: form.get("titulo") as string,
      data: form.get("data") as string,
      hora: form.get("hora") as string,
      local: form.get("local") as string,
      descricao: form.get("descricao") as string,
      tipo: form.get("tipo") as string,
      marcacaoObrigatoria: form.get("marcacao") === "on",
      destaque: form.get("destaque") === "on",
    };

    try {
      const res = await fetch("/api/eventos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        router.push("/admin/eventos");
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

  if (loading) return <div className="text-center py-20 text-muted-foreground">A carregar...</div>;
  if (!evento) return <div className="text-center py-20 text-muted-foreground">Evento não encontrado</div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/eventos" className="text-muted-foreground hover:text-gold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-foreground">Editar Evento</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Titulo *</label>
          <input name="titulo" required defaultValue={evento.titulo} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Data *</label>
            <input name="data" type="date" required defaultValue={evento.data} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Hora *</label>
            <input name="hora" type="time" required defaultValue={evento.hora} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Local *</label>
          <input name="local" required defaultValue={evento.local} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Tipo *</label>
          <select name="tipo" required defaultValue={evento.tipo} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none">
            <option value="Evento">Evento</option>
            <option value="Sócios">Sócios</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Baile">Baile</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
          <textarea name="descricao" rows={4} defaultValue={evento.descricao} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none resize-y" />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="marcacao" defaultChecked={evento.marcacaoObrigatoria} className="rounded border-border accent-gold" />
            <span>Marcação obrigatória</span>
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" name="destaque" defaultChecked={evento.destaque} className="rounded border-border accent-gold" />
            <span>Mostrar em destaque na homepage</span>
          </label>
        </div>

        {error && <p className="text-accent text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="gradient-gold text-background font-semibold px-6 py-2.5 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Guardar Alterações"}
          </button>
          <Link href="/admin/eventos" className="px-6 py-2.5 text-muted-foreground hover:text-gold transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
