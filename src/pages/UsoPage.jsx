import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function UsoPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Certificado de uso — Hanna Rocha Fotografia";
    return () => {
      document.title = prev;
    };
  }, []);

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="app-page uso-page">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-brand-lockup">
            <div className="app-logo" aria-hidden>
              📸
            </div>
            <div>
              <div className="app-brand-title font-display">Hanna Rocha Fotografia</div>
              <div className="app-brand-tagline">Certificado de uso — Simulador de Objeções</div>
            </div>
          </div>
          <div className="app-header-actions">
            <Link className="uso-nav-link" to="/">
              ← Voltar ao simulador
            </Link>
            <span className="app-badge">SOP v1.1</span>
          </div>
        </div>
      </header>

      <main className="app-main uso-main">
        <article className="uso-cert panel stagger stagger-1">
          <header className="uso-cert__header">
            <span className="uso-cert__seal" aria-hidden>
              ✓
            </span>
            <h1 className="uso-cert__title font-display">Declaração de adesão ao simulador</h1>
            <p className="uso-cert__meta">Emitido em {hoje}</p>
          </header>

          <div className="uso-cert__body">
            <p className="uso-cert__lead">
              O time <strong>comercial da Hanna Rocha Fotografia</strong> declara utilizar o{" "}
              <strong>Simulador de Objeções</strong> como apoio ao atendimento via WhatsApp, alinhado ao SOP comercial e ao tom da marca.
            </p>

            <div className="section-label font-display uso-cert__section-label">Compromissos da equipe</div>
            <ul className="uso-cert__list">
              <li>Consultar o simulador em situações de objeção ou resposta sensível, antes de enviar mensagens definitivas à cliente.</li>
              <li>Considerar as duas alternativas sugeridas e o raciocínio do SOP, adaptando o texto ao contexto real da conversa.</li>
              <li>Respeitar políticas de desconto, equipe vs. Hanna e protocolos de crise descritos no SOP.</li>
              <li>Manter sigilo da API e do uso interno da ferramenta (uso exclusivo da equipe autorizada).</li>
            </ul>

            <div className="uso-cert__note">
              Esta página serve apenas como <strong>registro interno</strong> de adesão à ferramenta; não substitui treinamento, supervisão nem o PDF oficial do SOP.
            </div>
          </div>

          <footer className="uso-cert__footer">
            <p className="uso-cert__sig">Hanna Rocha Fotografia · Comercial</p>
          </footer>
        </article>
      </main>
    </div>
  );
}
