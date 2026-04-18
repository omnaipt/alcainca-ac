"use client";

import Link from "next/link";
import { useState } from "react";
import { Crest, Footer, Nav } from "@/components/site";

export default function ContactosPage() {
  const [form, setForm] = useState({ nome: "", email: "", tel: "", assunto: "socio", msg: "" });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="page">
      <Nav current="contactos" onDark />

      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="crumbs">
            <Link href="/">Início</Link>
            <span>/</span>
            <span>Contactos</span>
          </div>
          <h1>Fala <span className="gold">connosco.</span></h1>
          <p className="page-hero__sub">
            Queres ser sócio, inscrever um atleta, patrocinar o clube ou simplesmente saber mais? Estamos aqui.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <form className="form" onSubmit={submit}>
              <div className="eyebrow">Formulário</div>
              <h2 className="h-lg" style={{ marginBottom: "var(--sp-4)" }}>Envia-nos<br />uma mensagem.</h2>

              <div className="form__row">
                <div className="form__field">
                  <label className="form__label">Nome</label>
                  <input className="form__input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                </div>
                <div className="form__field">
                  <label className="form__label">Email</label>
                  <input type="email" className="form__input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="form__row">
                <div className="form__field">
                  <label className="form__label">Telefone</label>
                  <input className="form__input" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} />
                </div>
                <div className="form__field">
                  <label className="form__label">Assunto</label>
                  <select className="form__select" value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })}>
                    <option value="socio">Ser sócio</option>
                    <option value="atleta">Inscrever atleta</option>
                    <option value="patrocinio">Patrocínio</option>
                    <option value="geral">Outro assunto</option>
                  </select>
                </div>
              </div>
              <div className="form__field">
                <label className="form__label">Mensagem</label>
                <textarea className="form__textarea" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} required />
              </div>
              <button type="submit" className="btn btn--ink form__submit">
                {sent ? "✓ Enviado" : "Enviar mensagem →"}
              </button>
            </form>

            <div className="info-stack">
              <div className="info-card">
                <h4>Morada</h4>
                <p>Rua da Junta de Freguesia<br />Alcainça, 2665 Mafra<br />Portugal</p>
              </div>
              <div className="info-card">
                <h4>Email</h4>
                <p><a href="mailto:geral@alcaincaac.pt">geral@alcaincaac.pt</a></p>
              </div>
              <div className="info-card">
                <h4>Telefone</h4>
                <p><a href="tel:219863805">219 863 805</a></p>
              </div>
              <div className="info-card">
                <h4>Secretaria</h4>
                <p>Segunda a sexta · 18h00 — 20h00<br />Sábado · 10h00 — 12h00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div style={{ aspectRatio: "21/9", background: "var(--c-primary)", borderRadius: "var(--r-lg)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "#fff" }}>
              <Crest size={80} />
              <div style={{ marginTop: "var(--sp-4)", fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Sede · Campo · Pavilhão
              </div>
              <div style={{ marginTop: "var(--sp-2)", fontFamily: "var(--f-display)", fontSize: 32, letterSpacing: "0.02em", textTransform: "uppercase" }}>
                Alcainça, Mafra
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "var(--sp-4)", left: "var(--sp-4)", fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              mapa · 38.955° N · 9.352° W
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
