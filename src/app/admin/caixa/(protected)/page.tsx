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
};

export default function CaixaDashboard() {
  const [movimentos, setMovimentos] = useState<Movimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState<"" | "Entrada" | "Saída">("");
  const [filtroMes, setFiltroMes] = useState("");

  useEffect(() => {
    fetch("/api/caixa")
      .then((r) => r.json())
      .then((data) => {
        setMovimentos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = movimentos.filter((m) => {
    if (filtroTipo && m.tipo !== filtroTipo) return false;
    if (filtroMes && !m.data.startsWith(filtroMes)) return false;
    return true;
  });

  const totalEntradas = filtered
    .filter((m) => m.tipo === "Entrada")
    .reduce((sum, m) => sum + m.valor, 0);
  const totalSaidas = filtered
    .filter((m) => m.tipo === "Saída")
    .reduce((sum, m) => sum + m.valor, 0);
  const saldo = totalEntradas - totalSaidas;

  // Get unique months for filter
  const meses = [...new Set(movimentos.map((m) => m.data.slice(0, 7)))].sort().reverse();

  if (loading) {
    return <div className="text-center py-20 text-gray-400">A carregar movimentos...</div>;
  }

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-5 border border-green-200">
          <p className="text-sm text-green-600 font-medium">Entradas</p>
          <p className="text-2xl font-bold text-green-700">{totalEntradas.toFixed(2)} &euro;</p>
        </div>
        <div className="bg-red-50 rounded-xl p-5 border border-red-200">
          <p className="text-sm text-red-600 font-medium">Saídas</p>
          <p className="text-2xl font-bold text-red-700">{totalSaidas.toFixed(2)} &euro;</p>
        </div>
        <div className={`rounded-xl p-5 border ${saldo >= 0 ? "bg-blue-50 border-blue-200" : "bg-amber-50 border-amber-200"}`}>
          <p className="text-sm font-medium text-gray-600">Saldo</p>
          <p className={`text-2xl font-bold ${saldo >= 0 ? "text-blue-700" : "text-amber-700"}`}>
            {saldo.toFixed(2)} &euro;
          </p>
        </div>
      </div>

      {/* Actions + Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-3">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as "" | "Entrada" | "Saída")}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Todos os tipos</option>
            <option value="Entrada">Entradas</option>
            <option value="Saída">Saídas</option>
          </select>
          <select
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm"
          >
            <option value="">Todos os meses</option>
            {meses.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <Link
          href="/admin/caixa/novo"
          className="bg-gold text-navy font-semibold px-5 py-2.5 rounded-xl hover:bg-gold-light transition-colors"
        >
          + Novo Lançamento
        </Link>
      </div>

      {/* Movements Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border">
          Nenhum movimento registado.
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-600">Data</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Tipo</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Categoria</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Descrição</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-right">Valor</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Lançado por</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Doc.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...filtered].reverse().map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">{m.data}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        m.tipo === "Entrada"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {m.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.categoria}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{m.descricao}</td>
                    <td className={`px-4 py-3 text-right font-semibold whitespace-nowrap ${
                      m.tipo === "Entrada" ? "text-green-700" : "text-red-700"
                    }`}>
                      {m.tipo === "Saída" ? "-" : ""}{m.valor.toFixed(2)} &euro;
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{m.lancadoPor}</td>
                    <td className="px-4 py-3">
                      {m.documento && (
                        <a
                          href={m.documento}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy hover:text-gold text-xs font-medium"
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
    </div>
  );
}
