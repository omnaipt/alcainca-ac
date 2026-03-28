import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria de fotos do Alcainça Atlético Clube.",
};

export default function Galeria() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Galeria</h1>
          <p className="text-xl text-gray-300">Momentos marcantes do Alcainça AC</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["Todas", "Futebol", "Patinagem", "Eventos", "Clube"].map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-navy hover:text-white transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Placeholder gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-navy/5 to-navy/10 flex items-center justify-center border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="text-center">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400">Em breve</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 mb-2">Galeria em construção</p>
            <p className="text-sm text-gray-400">As fotos do clube serão adicionadas em breve.</p>
          </div>
        </div>
      </section>
    </>
  );
}
