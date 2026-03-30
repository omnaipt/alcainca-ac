"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Movimento = {
  id: string;
  data: string;
  tipo: "Entrada" | "Saída";
  categoria: string;
  descricao: string;
  valor: number;
  lancadoPor: string;
  cargo: string;
  documento: string;
  dataLancamento: string;
  formaPagamento: string;
  estado: "Pendente" | "Aprovado";
  aprovadoPor: string;
};

export default function CaixaDashboard() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<"" | "Entrada" | "Saída">("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<"" | "Pendente" | "Aprovado">("");
  const [aprovando, setAprovando] = useState<string | null>(null);
  const [cargoUser, setCargoUser] = useState("");

  useEffect(() => {
    fetch("/api/caixa")
      .then((r) => r.json())
      .then((data) => {
        setMovimentos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Get current user cargo from cookie-based session info
    fetch("/api/caixa/auth")
      .then((r) => r.json())
      .then(() => {
        // We need the cargo from the session — fetch it via a dedicated check
        fetch("/api/caixa/me")
          .then((r) => r.json())
          .then((data) => {
            if (data.cargo) setCargoUser(data.cargo);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const isTesoureiro = cargoUser === "Tesoureiro";

  const filtered = movimentos.filter((m) => {
    if (filtroTipo && m.tipo !== filtroTipo) return false;
    if (filtroMes && !m.data.startsWith(filtroMes)) return false;
    if (filtroEstado && m.estado !== filtroEstado) return false;
    return true;
  });

  // Only count approved entries for the balance
  const aprovados = filtered.filter((m) => m.estado === "Aprovado");
  const totalEntradas = aprovados
    .filter((m) => m.tipo === "Entrada")
    .reduce((sum, m) => sum + m.valor, 0);
  const totalSaidas = aprovados
    .filter((m) => m.tipo === "Saída")
    .reduce((sum, m) => sum + m.valor, 0);
  const saldo = totalEntradas - totalSaidas;

  const pendentes = movimentos.filter((m) => m.estado === "Pendente").length;

  // Get unique months for filter
  const meses = [...new Set(movimentos.map((m) => m.data.slice(0, 7)))].sort().reverse();

  async function handleAprovar(id: string) {
    setAprovando(id);
    try {
      const res = await fetch("/api/caixa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setMovimentos((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, estado: "Aprovado" as const, aprovadoPor: "Tesoureiro" } : m
          )
        );
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao aprovar");
      }
    } catch {
      alert("Erro de ligação");
    } finally {
      setAprovando(null);
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-muted-foreground">A carregar movimentos...</div>;
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-500/10 rounded-xl p-5 border border-green-500/30">
          <p className="text-sm text-green-400 font-medium">Entradas</p>
          <p className="text-2xl font-bold text-green-400">{totalEntradas.toFixed(2)} &euro;</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/30">
          <p className="text-sm text-red-400 font-medium">Saídas</p>
          <p className="text-2xl font-bold text-red-400">{totalSaidas.toFixed(2)} &euro;</p>
        </div>
        <div className={`rounded-xl p-5 border ${saldo >= 0 ? "bg-gold/10 border-gold/30" : "bg-amber-500/10 border-amber-500/30"}`}>
          <p className="text-sm font-medium text-muted-foreground">Saldo</p>
          <p className={`text-2xl font-bold ${saldo >= 0 ? "text-gold" : "text-amber-400"}`}>
            {saldo.toFixed(2)} &euro;
          </p>
        </div>
        <div className={`rounded-xl p-5 border ${pendentes > 0 ? "bg-amber-500/10 border-amber-500/30" : "bg-secondary/50 border-border"}`}>
          <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
          <p className={`text-2xl font-bold ${pendentes > 0 ? "text-amber-400" : "text-muted-foreground"}`}>
            {pendentes}
          </p>
        </div>
      </div>

      {/* Actions + Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as "" | "Entrada" | "Saída")}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
          >
            <option value="">Todos os tipos</option>
            <option value="Entrada">Entradas</option>
            <option value="Saída">Saídas</option>
          </select>
          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
          >
            <option value="">Todos os meses</option>
            {meses.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as "" | "Pendente" | "Aprovado")}
            className="px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
          >
            <option value="">Todos os estados</option>
            <option value="Pendente">Pendentes</option>
            <option value="Aprovado">Aprovados</option>
          </select>
        </div>
        <Link
          href="/admin/caixa/novo"
          className="gradient-gold text-background font-semibold px-5 py-2.5 rounded-xl hover:scale-105 transition-transform"
        >
          + Novo Lançamento
        </Link>
      </div>

      {/* Movements Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground bg-card rounded-xl border border-border">
          Nenhum movimento registado.
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Data</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Tipo</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Categoria</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Descrição</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground text-right">Valor</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Forma</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Lançado por</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Estado</th>
                  <th className="px-4 py-3 font-semibold text-muted-foreground">Doc.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...filtered].reverse().map((m) => (
                  <tr key={m.id} className="hover:bg-secondary/30">
                    <td className="px-4 py-3 whitespace-nowrap text-foreground">{m.data}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        m.tipo === "Entrada"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {m.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.categoria}</td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{m.descricao}</td>
                    <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${
                      m.tipo === "Entrada" ? "text-green-400" : "text-red-400"
                    }`}>
                      {m.tipo === "Saída" ? "-" : ""}{m.valor.toFixed(2)} &euro;
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        m.formaPagamento === "Bancário"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-gold/10 text-gold"
                      }`}>
                        {m.formaPagamento || "Dinheiro"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{m.lancadoPor}</td>
                    <td className="px-4 py-3">
                      {m.estado === "Aprovado" ? (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                          Aprovado
                        </span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                            Pendente
                          </span>
                          {isTesoureiro && (
                            <button
                              onClick={() => handleAprovar(m.id)}
                              disabled={aprovando === m.id}
                              className="text-xs font-semibold text-green-400 hover:text-green-300 disabled:opacity-50"
                            >
                              {aprovando === m.id ? "..." : "Aprovar"}
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {m.documento && (
                        <a
                          href={m.documento}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold hover:text-gold-light text-xs font-medium"
                        >
                          Ver
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        O saldo considera apenas movimentos aprovados.
      </p>
    </div>
  );
}
