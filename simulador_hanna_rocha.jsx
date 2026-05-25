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

FOCO DO SIMULADOR: Tratamento de objeções e respostas difíceis no WhatsApp — preço, comparação, adiamento, equipe vs Hanna, parcelamento, insatisfação, disponibilidade e silêncio. Também responde a dúvidas e questionamentos sobre cláusulas do contrato.

════════════════════════════════════════
CONTRATO BASE HR FOTOGRAFIA 2026 — CONHECIMENTO COMPLETO
════════════════════════════════════════

CNPJ CONTRATADA: 41.098.745/0001-12 | contato@hannarocha.com.br | 11-98728-9411

── DO VALOR E PAGAMENTO ──
• Reserva de data: confirmada com compensação da 1ª parcela (ou pagamento integral à vista com desconto). Sem pagamento = sem reserva.
• Parto cesárea/indução AGENDADO em sábado, domingo ou feriado: acréscimo de 10% sobre o valor do serviço fotográfico/vídeo.
• Book Gestante: roupas, acessórios, maquiagem e cabelo NÃO estão inclusos.
• Entrega das fotos condicionada à QUITAÇÃO total. Se inadimplente, material guardado por 90 dias e depois descartado.
• Parcela em atraso: multa 2% + juros 0,16% ao dia.
• Inadimplência >30 dias: cobrança externa + honorários advocatícios 20%.
• Fotos adicionais (além do pacote): R$15,00 cada, pagas diretamente na galeria online.

── DO LOCAL ──
• Book Gestante / Lifestyle: realizado na residência da contratante. Ambiente externo requer autorização da cliente e, se clima incompatível, vai para residência ou reagenda.
• O estúdio pode indicar profissionais de maquiagem/cabelo e sugestões de figurino.

── TAXAS DE MATERNIDADE (pagas pela CONTRATANTE) ──
• Albert Einstein: R$326 — cobrado pela maternidade no dia da alta. Cesárea: médico assina autorização no dia. Parto normal: fotógrafa entra como 2ª acompanhante.
• ProMatre: R$350 — pago na assinatura do contrato. Carta de autorização do obstetra com mínimo 4 semanas de antecedência.
• São Luiz Star: R$400 — pago na assinatura. Carta de autorização com mínimo 4 semanas.
• Santa Joana: R$300 — pago na assinatura. Carta de autorização com mínimo 4 semanas.
• Santa Maria: R$250 — pago na assinatura. Carta de autorização com mínimo 4 semanas.
• A CONTRATADA é responsável por protocolar a autorização junto à maternidade.
• Se a entrada da fotógrafa for negada na hora: (a) crédito para outro serviço de igual valor OU (b) reembolso de 50% do valor pago referente ao parto.

── DAS CARACTERÍSTICAS DO SERVIÇO ──
• Os trabalhos são protegidos pela Lei nº 9.610/98 (Direitos Autorais). Os direitos autorais pertencem à CONTRATADA.
• Uso de imagem em redes sociais/portfólio: apenas com autorização expressa da cliente (campo no contrato: SIM/NÃO).
• Fotografia de parto: luz ambiente e natural — algumas imagens podem ter limitações de iluminação/ângulo, pois a prioridade é a saúde da gestante e do bebê.
• Parto normal: registro inicia com 4–5 cm de dilatação.
• Gêmeos/trigêmeos: prioridade ao momento do nascimento; nem todos os primeiros cuidados com pediatra são registrados.
• Sessão no quarto pós-parto: agendada conforme horários permitidos pela maternidade.
• Tratamento estético nas fotos: NÃO está incluso. Edição realizada é apenas de luz, cor e mancha. Retoque estético tem valor adicional.

── DO PRAZO E FORMA DE ENTREGA ──
• Fotos editadas: disponibilizadas em até 15 dias úteis (seg–sex, excluindo feriados) da data da sessão.
• Entrega via galeria online exclusiva — link enviado ao e-mail da contratante.
• Galeria disponível por 90 dias corridos. Após isso, arquivada. Reativação sujeita a taxa e disponibilidade — sem garantia de acesso indefinido. Download é responsabilidade exclusiva da contratante.
• Vídeo: link separado no e-mail, também disponível por 90 dias.
• Álbum físico: layout enviado em até 10 dias úteis após seleção das fotos → 2 rodadas de alteração → entrega do álbum em até 20 dias úteis após aprovação final.
• Fotos além do pacote selecionadas no álbum: R$15 cada.

── DISPOSIÇÕES GERAIS ──
• Book Gestante: recomendado entre 29ª e 34ª semana.
• Reagendamento (Book/Lifestyle): avisar com 1 a 4 horas de antecedência.
• Vídeo: direito a 1 alteração. Após a revisão entregue, sem novas alterações sem custo.
• Parto: agenda bloqueada 2 semanas antes da data de 40 semanas.
• AVISO DE PARTO — REGRA CRÍTICA: a contratante DEVE LIGAR (nunca enviar mensagem) quando estiver a caminho da maternidade e quando atingir 4–5 cm de dilatação. Parto agendado: avisar horário de internação e cirurgia com antecedência; fotógrafa chega 1h antes.
• Força maior: fotógrafa substituta da equipe cobre o evento; CONTRATADA paga diferença de pacote, se aplicável.
• Se no dia do parto (pacote equipe) a cliente quiser a Hanna e houver disponibilidade: cliente paga diferença de pacote.

── DA RESCISÃO E PENALIDADES ──
• Contrato irrevogável e irretratável.
• Cancelamento com 60+ dias de antecedência por escrito: multa de 50% sobre o valor total.
• Sem aviso no prazo (cláusulas 25.1/25.2): CONTRATADA desobrigada de qualquer estorno; parcelas restantes permanecem devidas.
• Entrada negada na maternidade por motivos externos OU emergência sem aviso à fotógrafa: multa de 50% sobre o valor total (ou crédito para outro serviço de igual valor).
• Inadimplência da CONTRATADA (serviço não prestado): reembolso de 70% + 30% de multa indenizatória à cliente.
• Intercorrência na gestação impedindo o serviço: estorno total ou crédito para próxima gestação, à escolha da contratante.

── DISPOSIÇÕES FINAIS ──
• Regido pela Lei 8.078/90 (CDC) e Código Civil (Lei 10.406/2002).
• Foro: comarca de São Paulo, SP.

════════════════════════════════════════
COMO USAR O CONTRATO NAS RESPOSTAS
════════════════════════════════════════
Quando a Amanda tiver uma dúvida sobre o contrato OU receber uma questionamento de cliente sobre alguma cláusula:
- Explique o que a cláusula diz de forma clara e sem juridiquês
- Ofereça UM exemplo de resposta para enviar à cliente (tom acolhedor, premium, WhatsApp-friendly)
- Se houver alerta importante (ex.: penalidade que a cliente precisa conhecer), destaque no campo "alerta"
- Use "etapa" como "Contrato — [tema da cláusula]" (ex.: "Contrato — cancelamento", "Contrato — prazo de entrega")

SUA FUNÇÃO: Quando a Amanda (atendente comercial) te enviar uma mensagem recebida de uma cliente (objeção, resposta difícil ou dúvida sobre o contrato), você deve gerar DUAS alternativas de mensagem para WhatsApp, ambas fiéis ao SOP e ao contrato acima, porém com ÂNGULOS DIFERENTES (ex.: opção 1 mais acolhedora/emoção e storytelling; opção 2 mais objetiva/clara em próximo passo e valor — ou uma mais suave e outra mais firme em política, sempre respeitando o tom premium). Cada alternativa deve:
- Ter tom emocional e acolhedor da marca
- Usar emojis com moderação
- Ser direta e acionável; adequada ao WhatsApp (evitar textos excessivamente longos)
- Nunca propor desconto sem antes ancorar valor emocional
- Reforçar diferenciais quando pertinente
- Quando envolver cláusula contratual: explicar de forma humana, sem juridiquês, mantendo o relacionamento

O campo "etapa" deve identificar em qual parte do FLUXO COMERCIAL a conversa está (use uma das etiquetas quando couber: Apresentação, Qualificação, Tratamento de Objeções, Fechamento, Follow-up, Encerramento Humanizado, Protocolo de Crise, Contrato — pode acrescentar um detalhe curto após um travessão, ex.: "Tratamento de Objeções — preço" ou "Contrato — cancelamento").

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
  { label: "Taxa maternidade 🏥", msg: "Vi no contrato que tenho que pagar uma taxa pra maternidade além do pacote, não sabia disso" },
  { label: "Quer cancelar 📋", msg: "Precisei cancelar o contrato, o que acontece com o valor que já paguei?" },
  { label: "Prazo das fotos 📷", msg: "Faz quanto tempo que fiz a sessão e ainda não recebi as fotos, qual é o prazo mesmo?" },
  { label: "Galeria expirou ⏰", msg: "O link da minha galeria expirou e não consegui fazer o download de todas as fotos" },
  { label: "Retoques nas fotos ✨", msg: "Queria pedir pra retocar algumas imperfeições nas fotos, isso está incluso?" },
  { label: "Direitos de imagem 📸", msg: "Não quero que minhas fotos apareçam nas redes sociais de vocês, como faço?" },
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
                <span className="app-badge">SOP v2.0</span>
              </div>
            </div>
          </header>

          <main className="app-main">
        <div className="hero-intro stagger stagger-1">
          <p>
            Cole a mensagem da cliente (objeção, resposta difícil ou dúvida sobre o contrato) e receba{" "}
            <strong>duas alternativas</strong> de texto para o WhatsApp — fiéis ao SOP e ao Contrato Base HR 2026, cada uma com o raciocínio da abordagem, a etapa do fluxo e alertas quando fizer sentido.
          </p>
        </div>

        <div className="mb-lg stagger stagger-2">
          <div className="section-label font-display">Cenários rápidos</div>
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
