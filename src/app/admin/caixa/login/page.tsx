"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = { id: string; nome: string; cargo: string };

export default function CaixaLogin() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/caixa/auth")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/caixa/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedId, password }),
      });

      if (res.ok) {
        router.push("/admin/caixa");
        router.refresh();
      } else {
        setError("Credenciais incorretas");
      }
    } catch {
      setError("Erro de ligação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-gold rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground">Caixa do Clube</h1>
            <p className="text-sm text-muted-foreground mt-1">Alcainça Atlético Clube</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Diretor</label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                required
              >
                <option value="">Selecione o seu nome</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome} ({u.cargo})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-gold focus:border-gold outline-none placeholder:text-muted-foreground/50"
                placeholder="Introduza a password"
                required
              />
            </div>

            {error && <p className="text-accent text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-gold text-background font-semibold py-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
            >
              {loading ? "A verificar..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
