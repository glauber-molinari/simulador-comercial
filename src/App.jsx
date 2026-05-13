import { useState, useRef, useEffect, useCallback } from "react";

const BRAND = "#B5632A";

/** PDF em `public/` (cópia do SOP comercial). Abre em nova aba ao lado do simulador. */
const SOP_PDF_HREF = `${import.meta.env.BASE_URL}sop-comercial-hr-fotografia-26.pdf`.replace(/\/{2,}/g, "/");

const SOP_CONTEXT = `
Você é o assistente de vendas da Hanna Rocha Fotografia, um estúdio premium especializado em fotografia e vídeo de família (Chá Revelação, Book Gestante, Chá de Bebê, Nascimento/Parto, Sessão Família, Batizado, Mêsversário, Aniversários Infantis). Ticket médio de R$ 3.000,00. A venda é feita via WhatsApp.

PERFIL DA CLIENTE IDEAL: Mães e gestantes da classe A/B, emocionalmente envolvidas com o momento de vida que estão vivendo. A decisão de compra é altamente emocional.

OS 5 DIFERENCIAIS DA HANNA ROCHA (use sempre que relevante):
1. Somente a Hanna já fotografou mais de 1.800 partos — trajetória que nenhum concorrente tem
2. Reconhecimento das equipes médicas nas principais maternidades de SP (Einstein, ProMatre, São Luiz Star, Santa Joana, Santa Maria)
3. Abordagem humanizada — a equipe entra na sala como alguém que entende o que aquele momento significa
4. Olhar artístico com identidade própria — fotos com estética reconhecível, luz e emoção
5. Processo estruturado do primeiro contato ao álbum físico

REGRAS DE DESCONTO:
- Desconto padrão: até 8% — Amanda pode conceder diretamente
- Desconto excepcional: até 10% — OBRIGATÓRIO aprovação da Hanna e do Glauber ANTES de comunicar à cliente
- Pagamento no cartão de crédito: os juros são repassados ao cliente — não há absorção pela empresa
- PROIBIDO: descontos progressivos na mesma conversa

POLÍTICA EQUIPE VS HANNA:
- Toda cliente é atendida pela Equipe Hanna Rocha — fotógrafas treinadas pessoalmente pela Hanna há mais de 2 anos
- A Hanna atua diretamente apenas em casos especiais e conforme disponibilidade de agenda
- NUNCA apresente a equipe como "plano B" — ela é o produto
- Como comunicar: "A fotógrafa que vai estar com você faz parte da nossa equipe há mais de 2 anos, foi treinada pessoalmente pela Hanna e carrega o mesmo olhar e cuidado."

FORMAS DE PAGAMENTO:
- PIX à vista: 5% de desconto
- PIX parcelado em até 4x sem juros
- Cartão de crédito em até 6x COM juros (repassados ao cliente)

COMBO PRIORITÁRIO: Parto + Book Gestante (sempre oferecer primeiro para elevar ticket)

CADÊNCIA DE FOLLOW-UP OBRIGATÓRIA:
- Follow 1 (24h): operacional/gentil
- Follow 2 (48h): emocional, reacende o sonho
- Follow 3 (72h): urgência real de agenda
- Follow 4 (5 dias): nova perspectiva/produto complementar
- Follow 5 (8 dias): encerramento humanizado

ENCERRAMENTO HUMANIZADO: NUNCA usar "estou encerrando o atendimento". Sempre deixar a porta aberta com carinho.

PROTOCOLOS DE CRISE:
- Insatisfação com fotos: reconhecer, não minimizar, escalar para Hanna em até 24h
- Cliente difícil/agressiva: respirar antes de responder, oferecer ligação, nunca devolver agressividade, acionar Hanna com print e contexto
- Erro de preço: reconhecer diretamente, corrigir imediatamente

MATERNIDADES ATENDIDAS: Albert Einstein, São Luiz Star, ProMatre Paulista, Santa Joana, Santa Maria.

FOCO DO SIMULADOR: Tratamento de objeções e respostas difíceis no WhatsApp — preço, comparação, adiamento, equipe vs Hanna, parcelamento, insatisfação, disponibilidade e silêncio.

SUA FUNÇÃO: Quando a Amanda (atendente comercial) te enviar uma mensagem recebida de uma cliente (objeção ou resposta difícil), você deve gerar DUAS alternativas de mensagem para WhatsApp, ambas fiéis ao SOP acima, porém com ÂNGULOS DIFERENTES (ex.: opção 1 mais acolhedora/emoção e storytelling; opção 2 mais objetiva/clara em próximo passo e valor — ou uma mais suave e outra mais firme em política, sempre respeitando o tom premium). Cada alternativa deve:
- Ter tom emocional e acolhedor da marca
- Usar emojis com moderação
- Ser direta e acionável; adequada ao WhatsApp (evitar textos excessivamente longos)
- Nunca propor desconto sem antes ancorar valor emocional
- Reforçar diferenciais quando pertinente

O campo "etapa" deve identificar em qual parte do FLUXO COMERCIAL a conversa está (use uma das etiquetas quando couber: Apresentação, Qualificação, Tratamento de Objeções, Fechamento, Follow-up, Encerramento Humanizado, Protocolo de Crise — pode acrescentar um detalhe curto após um travessão, ex.: "Tratamento de Objeções — preço").

Responda SEMPRE em JSON válido com este formato exato (sem markdown, sem texto fora do JSON):
{
  "etapa": "nome da etapa do SOP + detalhe opcional curto do momento da conversa",
  "alerta": "ponto de atenção para a Amanda ou null se não houver",
  "opcoes": [
    {
      "rotulo": "nome curto da linha (ex.: Ancoragem emocional + valor)",
      "resposta": "texto completo da mensagem para copiar e enviar",
      "raciocinio": "2 a 3 frases explicando por que essa abordagem funciona neste caso"
    },
    {
      "rotulo": "nome curto da segunda linha (ex.: Clareza + próximo passo)",
      "resposta": "texto completo da segunda mensagem para copiar e enviar",
      "raciocinio": "2 a 3 frases explicando por que essa segunda linha funciona"
    }
  ]
}

Regras do array "opcoes": exatamente 2 objetos; as duas "resposta" devem ser mensagens distintas (não repetir o mesmo texto).
`;

const QUICK_SCENARIOS = [
  { label: "Achei caro 💸", msg: "Achei um pouco caro, não tem como fazer mais barato?" },
  { label: "Vou pensar 🤔", msg: "Vou pensar e te falo depois" },
  { label: "A Hanna vai? 📸", msg: "Queria saber se seria a própria Hanna que viria no meu parto" },
  { label: "Sumiu e voltou 👻", msg: "Oi, desculpa a demora! Ainda tem disponibilidade pra minha data?" },
  { label: "Falar c/ marido 👫", msg: "Preciso falar com meu marido antes de fechar" },
  { label: "Fechou com outra ❌", msg: "Obrigada mas já fechei com outra fotógrafa" },
  { label: "Parcelamento 💳", msg: "Tem como parcelar em mais vezes? 4x tá pesado pra mim agora" },
  { label: "Insatisfeita 😔", msg: "Recebi as fotos e fiquei muito decepcionada, esperava muito mais" },
  { label: "Maternidade fora 🏥", msg: "Minha maternidade é o Hospital Santa Cruz em Santo André, vocês atendem?" },
  { label: "Sem resposta 🔕", msg: "Oi? Mandei mensagem há 3 dias e não tive resposta..." },
];

function LoadingDots() {
  return (
    <span className="loading-dots" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span key={i} className="loading-dot" />
      ))}
    </span>
  );
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button type="button" onClick={copy} className={`copy-btn${copied ? " copy-btn--copied" : ""}`}>
      {copied ? "✓ Copiado!" : label || "📋 Copiar mensagem"}
    </button>
  );
}

function normalizeAlerta(val) {
  if (val == null || val === "" || String(val).trim().toLowerCase() === "null") return null;
  return String(val);
}

/** Aceita JSON novo (opcoes[]) ou legado (resposta + raciocinio) para histórico antigo. */
function normalizeApiResult(parsed) {
  if (!parsed || typeof parsed !== "object") return null;
  if (Array.isArray(parsed.opcoes) && parsed.opcoes.length >= 2) {
    return {
      etapa: parsed.etapa ?? "",
      alerta: normalizeAlerta(parsed.alerta),
      opcoes: parsed.opcoes.slice(0, 2).map((o, i) => ({
        rotulo: o.rotulo || `Opção ${i + 1}`,
        resposta: o.resposta ?? "",
        raciocinio: o.raciocinio ?? "",
      })),
    };
  }
  if (Array.isArray(parsed.opcoes) && parsed.opcoes.length === 1) {
    return {
      etapa: parsed.etapa ?? "",
      alerta: normalizeAlerta(parsed.alerta),
      opcoes: [
        {
          rotulo: parsed.opcoes[0].rotulo || "Opção 1",
          resposta: parsed.opcoes[0].resposta ?? "",
          raciocinio: parsed.opcoes[0].raciocinio ?? "",
        },
      ],
    };
  }
  if (parsed.resposta) {
    return {
      etapa: parsed.etapa ?? "",
      alerta: normalizeAlerta(parsed.alerta),
      opcoes: [{ rotulo: "Resposta (histórico)", resposta: parsed.resposta, raciocinio: parsed.raciocinio ?? "" }],
    };
  }
  return null;
}

function ResponseCard({ data }) {
  const etapaColors = {
    Qualificação: "#185FA5",
    "Tratamento de Objeções": "#A32D2D",
    Fechamento: "#3B6D11",
    "Follow-up": "#854F0B",
    "Encerramento Humanizado": "#3C3489",
    "Protocolo de Crise": "#A32D2D",
    Apresentação: BRAND,
  };
  const etapaColor =
    Object.entries(etapaColors).find(([k]) => data.etapa?.includes(k))?.[1] || BRAND;

  const opcoes = Array.isArray(data.opcoes) ? data.opcoes : [];

  if (!opcoes.length) {
    return (
      <div className="response-empty">
        Não foi possível exibir este resultado (formato antigo ou incompleto). Gere novamente a partir da objeção.
      </div>
    );
  }

  return (
    <div className="response-card animate-fade-up">
      <div className="response-card__header" style={{ background: etapaColor }}>
        <span className="response-card__meta">Etapa do SOP</span>
        <span className="response-card__stage">{data.etapa?.trim() || "Momento da conversa não informado"}</span>
      </div>

      {opcoes.map((opcao, idx) => (
        <div key={idx} className="response-card__option">
          <div className="response-option-label">
            Opção {idx + 1} — {opcao.rotulo || "Alternativa"}
          </div>
          <div className="response-quote">
            <div className="response-quote__tag">✉ MENSAGEM PARA ENVIAR</div>
            <p className="response-quote__text">{opcao.resposta}</p>
          </div>
          <CopyButton text={opcao.resposta} label={`📋 Copiar opção ${idx + 1}`} />

          <div className="response-rationale">
            <div className="response-rationale__inner">
              <div className="response-rationale__tag">🧠 Por que essa abordagem</div>
              <p className="response-rationale__text">{opcao.raciocinio}</p>
            </div>
          </div>
        </div>
      ))}

      {data.alerta && (
        <div className="response-alert-wrap">
          <div className="response-alert">
            <div className="response-alert__tag">⚠ ATENÇÃO</div>
            <p className="response-alert__text">{data.alerta}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [sopPanelOpen, setSopPanelOpen] = useState(false);
  /** Mantém a coluna direita durante a animação de fechar (iframe some, shell permanece). */
  const [sopLayoutOpen, setSopLayoutOpen] = useState(false);
  const closeTimerRef = useRef(null);
  const resultRef = useRef(null);
  const sopCloseRef = useRef(null);

  const openSopPanel = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSopLayoutOpen(true);
    setSopPanelOpen(true);
  }, []);

  const closeSopPanel = useCallback(() => {
    setSopPanelOpen(false);
    setSopLayoutOpen(true);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setSopLayoutOpen(false);
      closeTimerRef.current = null;
    }, 430);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!sopLayoutOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeSopPanel();
    };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 821px)");
    const applyOverflow = () => {
      document.body.style.overflow = mq.matches ? "hidden" : "";
    };
    applyOverflow();
    mq.addEventListener("change", applyOverflow);
    const t = window.setTimeout(() => {
      if (sopPanelOpen) sopCloseRef.current?.focus();
    }, 90);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", applyOverflow);
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [sopLayoutOpen, sopPanelOpen, closeSopPanel]);

  const handleSubmit = async (msgOverride) => {
    const msg = msgOverride || input;
    if (!msg.trim()) return;

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey?.trim()) {
      setError("Configure VITE_ANTHROPIC_API_KEY no arquivo .env na raiz do projeto (copie .env.example). Reinicie o servidor após salvar.");
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    const userPrompt = context.trim()
      ? `Contexto da conversa: ${context.trim()}\n\nMensagem mais recente da cliente: "${msg}"`
      : `Mensagem da cliente: "${msg}"`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2048,
          system: SOP_CONTEXT,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const apiMsg = data.error?.message || data.message || `Erro HTTP ${response.status}`;
        throw new Error(apiMsg);
      }

      const raw = data.content?.[0]?.text || "";
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Resposta inválida da API — não foi possível ler o JSON.");
      const parsed = JSON.parse(jsonMatch[0]);
      const normalized = normalizeApiResult(parsed);
      if (!normalized?.opcoes?.length) {
        throw new Error("Resposta inválida da API — formato esperado com duas opções não encontrado.");
      }
      if (normalized.opcoes.length < 2) {
        throw new Error("A API devolveu só uma opção. Gere novamente ou verifique a conexão.");
      }
      const [opA, opB] = normalized.opcoes;
      if (!opA.resposta?.trim() || !opB.resposta?.trim()) {
        throw new Error("Uma das opções veio vazia. Tente gerar novamente.");
      }
      if (opA.resposta.trim() === opB.resposta.trim()) {
        throw new Error("As duas opções vieram idênticas. Gere novamente.");
      }
      setResult(normalized);
      setHistory((h) => [{ msg, context: context.trim(), result: normalized, ts: new Date() }, ...h.slice(0, 9)]);
      if (!msgOverride) setInput("");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      setError(e.message || "Erro ao gerar resposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = (item) => {
    setInput(item.msg);
    setContext(item.context);
    setResult(normalizeApiResult(item.result) || item.result);
    setError(null);
  };

  return (
    <div className={`split-root${sopLayoutOpen ? " split-root--open" : ""}`}>
      {sopLayoutOpen && (
        <button
          type="button"
          className="split-backdrop"
          aria-label="Fechar painel do SOP"
          onClick={closeSopPanel}
        />
      )}
      <div className="split-left">
        <div className="app-page">
          <header className="app-header">
            <div className="app-header-inner">
              <div className="app-brand-lockup">
                <div className="app-logo" aria-hidden>
                  📸
                </div>
                <div>
                  <div className="app-brand-title font-display">Hanna Rocha Fotografia</div>
                  <div className="app-brand-tagline">Simulador de Objeções</div>
                </div>
              </div>
              <div className="app-header-actions">
                <button
                  type="button"
                  className="sop-pdf-link"
                  onClick={openSopPanel}
                  aria-expanded={sopLayoutOpen}
                  aria-controls="sop-panel"
                  title="Abre o PDF do SOP ao lado do simulador"
                >
                  <span className="sop-pdf-link__icon" aria-hidden>
                    📄
                  </span>
                  Ver SOP
                </button>
                <span className="app-badge">SOP v1.0</span>
              </div>
            </div>
          </header>

          <main className="app-main">
        <div className="hero-intro stagger stagger-1">
          <p>
            Cole a mensagem da cliente (objeção ou resposta difícil) e receba{" "}
            <strong>duas alternativas</strong> de texto para o WhatsApp segundo o SOP — cada uma com o raciocínio da abordagem, a etapa do fluxo em que você está e alertas quando fizer sentido.
          </p>
        </div>

        <div className="mb-lg stagger stagger-2">
          <div className="section-label font-display">Objeções rápidas</div>
          <div className="chip-row">
            {QUICK_SCENARIOS.map((s) => (
              <button
                key={s.label}
                type="button"
                className="chip-btn"
                disabled={loading}
                onClick={() => {
                  setInput(s.msg);
                  handleSubmit(s.msg);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel stagger stagger-3">
          <div className="field-group">
            <label className="field-label field-label--brand" htmlFor="client-msg">
              Mensagem da cliente *
            </label>
            <textarea
              id="client-msg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
              }}
              placeholder="Cole ou digite aqui o que a cliente escreveu no WhatsApp..."
              className="textarea-field"
              rows={4}
            />
          </div>

          <div className="field-group">
            <label className="field-label field-label--mid" htmlFor="ctx-msg">
              Contexto da conversa (opcional)
            </label>
            <textarea
              id="ctx-msg"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ex: cliente gestante, DPP em julho, Einstein. Já recebeu o portfólio e o orçamento. Sumiu por 5 dias..."
              className="textarea-field textarea-field--secondary"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <span className="form-hint">Ctrl + Enter (Windows) ou ⌘ + Enter (Mac) para enviar</span>
            <button type="button" className="btn-primary" onClick={() => handleSubmit()} disabled={loading || !input.trim()}>
              {loading ? "Gerando..." : "Gerar 2 opções →"}
            </button>
          </div>
        </div>

        {loading && (
          <div className="loading-panel stagger stagger-4" aria-busy="true" aria-live="polite">
            <LoadingDots />
            <p>Consultando o SOP e gerando duas alternativas de resposta...</p>
          </div>
        )}

        {error && (
          <div className="alert-error" role="alert">
            {error}
          </div>
        )}

        {result && !loading && (
          <div ref={resultRef} className="mb-lg">
            <div className="section-label section-label--micro mb-md">Duas opções geradas</div>
            <ResponseCard data={result} />
          </div>
        )}

        {history.length > 1 && (
          <div>
            <div className="section-label section-label--micro mb-md">Histórico da sessão</div>
            <div className="history-stack">
              {history.slice(1).map((item, i) => (
                <button key={`${item.ts?.getTime?.() ?? i}-${item.msg.slice(0, 24)}`} type="button" className="history-btn" onClick={() => loadHistory(item)}>
                  <div className="history-stage">{item.result?.etapa || "Resposta"}</div>
                  <div className="history-msg">&quot;{item.msg}&quot;</div>
                </button>
              ))}
            </div>
          </div>
        )}
          </main>
        </div>
      </div>

      <aside
        id="sop-panel"
        className="split-right"
        aria-hidden={!sopLayoutOpen}
        aria-label="Documento PDF do SOP comercial"
        role="complementary"
      >
        {sopLayoutOpen && (
          <div className="sop-panel">
            <div className="sop-panel__toolbar">
              <span className="sop-panel__title font-display">SOP — Comercial</span>
              <div className="sop-panel__actions">
                <a className="sop-panel__link" href={SOP_PDF_HREF} download="SOP-Comercial-Hanna-Rocha.pdf">
                  Baixar
                </a>
                <button ref={sopCloseRef} type="button" className="sop-panel__close" onClick={closeSopPanel}>
                  Fechar
                </button>
              </div>
            </div>
            {sopPanelOpen && <iframe title="SOP comercial Hanna Rocha Fotografia" className="sop-panel__frame" src={SOP_PDF_HREF} />}
          </div>
        )}
      </aside>
    </div>
  );
}
