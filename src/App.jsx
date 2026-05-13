import { useState, useRef } from "react";

const BRAND = "#B5632A";
const BRAND_LIGHT = "#F9EDE4";
const DARK = "#1A1208";
const MID = "#6B5744";
const LIGHT = "#FDF8F4";
const WHITE = "#FFFFFF";

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
    <span style={{ display: "inline-flex", gap: 4, alignItems: "center", padding: "2px 0" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: BRAND,
            display: "inline-block",
            animation: "bounce 1.2s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
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
    <button
      type="button"
      onClick={copy}
      style={{
        background: copied ? "#3B6D11" : BRAND,
        color: WHITE,
        border: "none",
        borderRadius: 8,
        padding: "8px 16px",
        fontSize: 13,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all .2s",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
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
      <div
        style={{
          background: WHITE,
          borderRadius: 16,
          padding: 24,
          border: `1px solid ${BRAND_LIGHT}`,
          color: MID,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Não foi possível exibir este resultado (formato antigo ou incompleto). Gere novamente a partir da objeção.
      </div>
    );
  }

  return (
    <div
      style={{
        background: WHITE,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(181,99,42,0.10)",
        border: `1px solid ${BRAND_LIGHT}`,
        animation: "fadeUp .35s ease",
      }}
    >
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px);} to { opacity:1; transform:translateY(0);} }`}</style>

      <div
        style={{
          background: etapaColor,
          padding: "12px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span
          style={{
            color: WHITE,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            opacity: 0.92,
          }}
        >
          Etapa do SOP
        </span>
        <span
          style={{
            color: WHITE,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: ".02em",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.35,
          }}
        >
          {data.etapa?.trim() || "Momento da conversa não informado"}
        </span>
      </div>

      {opcoes.map((opcao, idx) => (
        <div
          key={idx}
          style={{
            padding: "20px 24px 16px",
            borderBottom: idx < opcoes.length - 1 ? `1px solid ${BRAND_LIGHT}` : "none",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: MID,
              marginBottom: 12,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Opção {idx + 1} — {opcao.rotulo || "Alternativa"}
          </div>
          <div
            style={{
              background: BRAND_LIGHT,
              borderRadius: 12,
              padding: "16px 18px",
              borderLeft: `4px solid ${BRAND}`,
              marginBottom: 16,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: BRAND,
                marginBottom: 8,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: ".04em",
              }}
            >
              ✉ MENSAGEM PARA ENVIAR
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                lineHeight: 1.65,
                color: DARK,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "pre-wrap",
              }}
            >
              {opcao.resposta}
            </p>
          </div>
          <CopyButton text={opcao.resposta} label={`📋 Copiar opção ${idx + 1}`} />

          <div style={{ paddingTop: 16 }}>
            <div
              style={{
                background: "#F1EFE8",
                borderRadius: 10,
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: MID,
                  marginBottom: 6,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: ".04em",
                }}
              >
                🧠 Por que essa abordagem
              </div>
              <p style={{ margin: 0, fontSize: 13, color: MID, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
                {opcao.raciocinio}
              </p>
            </div>
          </div>
        </div>
      ))}

      {data.alerta && (
        <div style={{ padding: "12px 24px 20px", borderTop: `1px solid ${BRAND_LIGHT}` }}>
          <div
            style={{
              background: "#FAEEDA",
              borderRadius: 10,
              padding: "12px 16px",
              borderLeft: "3px solid #854F0B",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#854F0B",
                marginBottom: 6,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: ".04em",
              }}
            >
              ⚠ ATENÇÃO
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#633806", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              {data.alerta}
            </p>
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
  const resultRef = useRef(null);

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
    <div
      style={{
        minHeight: "100vh",
        background: LIGHT,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          background: WHITE,
          borderBottom: `1px solid ${BRAND_LIGHT}`,
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 1px 12px rgba(181,99,42,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "14px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: BRAND,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              📸
            </div>
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: DARK,
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1.1,
                }}
              >
                Hanna Rocha Fotografia
              </div>
              <div style={{ fontSize: 11, color: MID, fontWeight: 500 }}>Simulador de Objeções</div>
            </div>
          </div>
          <div
            style={{
              background: BRAND_LIGHT,
              borderRadius: 20,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 700,
              color: BRAND,
              letterSpacing: ".04em",
            }}
          >
            SOP v1.0
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px 80px" }}>
        <div
          style={{
            background: WHITE,
            borderRadius: 16,
            padding: "20px 24px",
            border: `1px solid ${BRAND_LIGHT}`,
            marginBottom: 24,
            borderLeft: `4px solid ${BRAND}`,
          }}
        >
          <p style={{ margin: 0, fontSize: 14, color: MID, lineHeight: 1.7 }}>
            Cole a mensagem da cliente (objeção ou resposta difícil) e receba{" "}
            <strong style={{ color: DARK }}>duas alternativas</strong> de texto para o WhatsApp segundo o SOP — cada uma com o raciocínio da abordagem,
            a etapa do fluxo em que você está e alertas quando fizer sentido.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: MID,
              marginBottom: 10,
              letterSpacing: ".06em",
              textTransform: "uppercase",
            }}
          >
            Objeções rápidas
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_SCENARIOS.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  setInput(s.msg);
                  handleSubmit(s.msg);
                }}
                style={{
                  background: WHITE,
                  border: `1.5px solid ${BRAND_LIGHT}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 12.5,
                  color: BRAND,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all .15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = BRAND_LIGHT;
                  e.currentTarget.style.borderColor = BRAND;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = WHITE;
                  e.currentTarget.style.borderColor = BRAND_LIGHT;
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            background: WHITE,
            borderRadius: 16,
            padding: "20px",
            border: `1px solid ${BRAND_LIGHT}`,
            marginBottom: 16,
            boxShadow: "0 2px 12px rgba(181,99,42,0.06)",
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: BRAND,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Mensagem da cliente *
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
              }}
              placeholder="Cole ou digite aqui o que a cliente escreveu no WhatsApp..."
              style={{
                width: "100%",
                minHeight: 100,
                resize: "vertical",
                border: `1.5px solid ${BRAND_LIGHT}`,
                borderRadius: 10,
                padding: "12px 14px",
                fontSize: 14,
                color: DARK,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
                outline: "none",
                boxSizing: "border-box",
                background: LIGHT,
                transition: "border-color .15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = BRAND;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = BRAND_LIGHT;
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: MID,
                letterSpacing: ".05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 8,
              }}
            >
              Contexto da conversa (opcional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Ex: cliente gestante, DPP em julho, Einstein. Já recebeu o portfólio e o orçamento. Somiu por 5 dias..."
              style={{
                width: "100%",
                minHeight: 60,
                resize: "vertical",
                border: "1.5px solid #E8E6E0",
                borderRadius: 10,
                padding: "10px 14px",
                fontSize: 13,
                color: MID,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
                outline: "none",
                boxSizing: "border-box",
                background: LIGHT,
                transition: "border-color .15s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = MID;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#E8E6E0";
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#AAA" }}>Ctrl + Enter (Windows) ou ⌘ + Enter (Mac) para enviar</span>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={loading || !input.trim()}
              style={{
                background: loading || !input.trim() ? "#D4B8A8" : BRAND,
                color: WHITE,
                border: "none",
                borderRadius: 10,
                padding: "11px 28px",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all .2s",
                letterSpacing: ".02em",
              }}
            >
              {loading ? "Gerando..." : "Gerar 2 opções →"}
            </button>
          </div>
        </div>

        {loading && (
          <div
            style={{
              background: WHITE,
              borderRadius: 16,
              padding: "28px 24px",
              border: `1px solid ${BRAND_LIGHT}`,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            <LoadingDots />
            <p style={{ margin: "12px 0 0", fontSize: 13, color: MID }}>
              Consultando o SOP e gerando duas alternativas de resposta...
            </p>
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#FCEBEB",
              borderRadius: 12,
              padding: "16px 20px",
              border: "1px solid #F7C1C1",
              marginBottom: 20,
              color: "#A32D2D",
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {result && !loading && (
          <div ref={resultRef} style={{ marginBottom: 32 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: MID,
                marginBottom: 10,
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Duas opções geradas
            </div>
            <ResponseCard data={result} />
          </div>
        )}

        {history.length > 1 && (
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: MID,
                marginBottom: 12,
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Histórico da sessão
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {history.slice(1).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => loadHistory(item)}
                  style={{
                    background: WHITE,
                    border: `1px solid ${BRAND_LIGHT}`,
                    borderRadius: 10,
                    padding: "10px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = BRAND;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = BRAND_LIGHT;
                  }}
                >
                  <div style={{ fontSize: 12, color: BRAND, fontWeight: 600, marginBottom: 2 }}>
                    {item.result?.etapa || "Resposta"}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: MID,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    &quot;{item.msg}&quot;
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
