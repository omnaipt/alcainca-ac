import { redirect } from "next/navigation";
import { verifyCaixaSession } from "@/lib/session";

export default async function CaixaProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyCaixaSession();
  if (!user) {
    redirect("/admin/caixa/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="AAC" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-lg leading-tight text-foreground">Caixa do Clube</h1>
              <p className="text-xs text-muted-foreground">{user.nome} &middot; {user.cargo}</p>
            </div>
          </div>
          <form action="/api/caixa/auth/logout" method="POST">
            <button type="submit" className="text-sm text-muted-foreground hover:text-gold transition-colors">
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
