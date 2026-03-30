import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Contacte o Alcainça Atlético Clube. Localização, email e formulário de contacto.",
};

export default function Contactos() {
  return (
    <>
      <section className="gradient-navy py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 sport-stripe opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[var(--font-display)] text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            <span className="text-gradient-gold">CONTACTOS</span>
          </h1>
          <p className="text-muted-foreground text-lg">Entre em contacto connosco</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-8">INFORMAÇÕES</h2>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: "Morada",
                    content: <p className="text-muted-foreground">Rua da Junta de Freguesia<br />Alcainça, Mafra</p>,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    title: "Email",
                    content: <a href="mailto:geral@alcaincaac.pt" className="text-gold hover:text-gold-light transition-colors">geral@alcaincaac.pt</a>,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    ),
                    title: "Telefone",
                    content: <a href="tel:219863805" className="text-gold hover:text-gold-light transition-colors">219 863 805</a>,
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Horário",
                    content: <p className="text-muted-foreground">Segunda a Sexta: 18h00 - 22h00<br />Sábado: 09h00 - 13h00</p>,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-foreground mb-3">Redes Sociais</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center text-background hover:scale-105 transition-transform" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center text-background hover:scale-105 transition-transform" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground mb-8">MENSAGEM</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-muted-foreground mb-1">Nome</label>
                    <input
                      type="text"
                      id="nome"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-gold focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                      placeholder="O seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-gold focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                      placeholder="email@exemplo.pt"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-muted-foreground mb-1">Assunto</label>
                  <select
                    id="assunto"
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="inscricao">Inscrição de Atleta</option>
                    <option value="socio">Tornar-me Sócio</option>
                    <option value="futebol">Futebol</option>
                    <option value="patinagem">Patinagem Artística</option>
                    <option value="informacao">Informação Geral</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-muted-foreground mb-1">Mensagem</label>
                  <textarea
                    id="mensagem"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-gold focus:border-gold transition-colors resize-none placeholder:text-muted-foreground/50"
                    placeholder="A sua mensagem..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto gradient-gold text-background font-bold px-8 py-3 rounded-lg hover:scale-105 transition-transform uppercase tracking-wide"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-[var(--font-display)] text-3xl tracking-wider text-foreground text-center mb-8">LOCALIZAÇÃO</h2>
          <div className="rounded-xl overflow-hidden h-96 border border-border">
            <iframe
              src="https://maps.google.com/maps?q=38.92,-9.28+(Alcain%C3%A7a+Atl%C3%A9tico+Clube)&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Alcainça Atlético Clube"
            />
          </div>
        </div>
      </section>
    </>
  );
}
