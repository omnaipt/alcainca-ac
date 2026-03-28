"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NovoEvento() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const evento = {
      id: "", // generated server-side
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
        <Link href="/admin/eventos" className="text-gray-400 hover:text-navy transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h2 className="text-2xl font-bold text-navy">Novo Evento</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border shadow-sm space-y-5 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titulo *</label>
          <input name="titulo" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <input name="data" type="date" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
            <input name="hora" type="time" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local *</label>
          <input name="local" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none" placeholder="Ex: Sede do Alcainça AC" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
          <select name="tipo" required className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none">
            <option value="Evento">Evento</option>
            <option value="Sócios">Sócios</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Baile">Baile</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea name="descricao" rows={4} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-navy outline-none resize-y" placeholder="Detalhes do evento..." />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="marcacao" className="rounded border-gray-300" />
            <span>Marcação obrigatória</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="destaque" defaultChecked className="rounded border-gray-300" />
            <span>Mostrar em destaque na homepage</span>
          </label>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-navy text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-navy-dark transition-colors disabled:opacity-50"
          >
            {saving ? "A guardar..." : "Criar Evento"}
          </button>
          <Link href="/admin/eventos" className="px-6 py-2.5 text-gray-500 hover:text-navy transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
