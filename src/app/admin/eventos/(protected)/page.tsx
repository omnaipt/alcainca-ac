"use client";

import { useEffect, useState } from "react";
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

export default function AdminEventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/eventos")
      .then((r) => r.json())
      .then((data) => {
        setEventos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleDelete(id: string, titulo: string) {
    if (!confirm(`Tem a certeza que quer apagar "${titulo}"?`)) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/eventos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setEventos((prev) => prev.filter((e) => e.id !== id));
      } else {
        alert("Erro ao apagar evento");
      }
    } catch {
      alert("Erro de ligação");
    } finally {
      setDeleting(null);
    }
  }

  const hoje = new Date().toISOString().slice(0, 10);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">A carregar eventos...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-navy">Eventos</h2>
        <Link
          href="/admin/eventos/novo"
          className="bg-gold text-navy font-semibold px-5 py-2.5 rounded-xl hover:bg-gold-light transition-colors"
        >
          + Novo Evento
        </Link>
      </div>

      {eventos.length === 0 ? (
        <div className="text-center py-20 text-gray-400 bg-white rounded-xl border">
          Nenhum evento criado. Crie o primeiro!
        </div>
      ) : (
        <div className="space-y-3">
          {eventos.map((evento) => {
            const isPast = evento.data < hoje;
            return (
              <div
                key={evento.id}
                className={`bg-white rounded-xl p-5 border shadow-sm flex items-center gap-4 ${isPast ? "opacity-50" : ""}`}
              >
                <div className="bg-navy text-white rounded-lg p-2.5 text-center min-w-[60px] shrink-0">
                  <span className="block text-xs text-gold">{evento.data.slice(5, 7)}/{evento.data.slice(8, 10)}</span>
                  <span className="block text-sm font-bold">{evento.hora}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-navy/10 text-navy">
                      {evento.tipo}
                    </span>
                    {isPast && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Passado</span>
                    )}
                    {evento.destaque && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold-dark">Destaque</span>
                    )}
                  </div>
                  <h3 className="font-bold text-navy truncate">{evento.titulo}</h3>
                  <p className="text-sm text-gray-500 truncate">{evento.local}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    href={`/admin/eventos/${evento.id}`}
                    className="text-sm text-navy hover:text-gold transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(evento.id, evento.titulo)}
                    disabled={deleting === evento.id}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleting === evento.id ? "..." : "Apagar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-gray-400 mt-6 text-center">
        Após criar ou editar um evento, o site atualiza automaticamente em ~60 segundos.
      </p>
    </div>
  );
}
