import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await verifySession();
  if (!isAuth) {
    redirect("/admin/eventos/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="AAC" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-lg leading-tight">Gestão de Eventos</h1>
              <p className="text-xs text-gray-300">Alcainça Atlético Clube</p>
            </div>
          </div>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
