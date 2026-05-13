# Guia de Instalação e Configuração
## Simulador de Objeções — Hanna Rocha Fotografia
**Windows · Cursor · Claude Code · React + Vite**

> Versão 1.0 · Maio 2026 · Documento Interno

---

## Visão Geral

Este guia ensina como instalar, configurar e rodar o Simulador de Objeções da Hanna Rocha em um computador Windows usando o Cursor (editor de código) e o Claude Code (assistente de IA). Não é necessário ter experiência com programação — siga os passos na ordem e o sistema vai funcionar.

**O que você vai ter no final:** Amanda cola a mensagem da cliente, o sistema usa a IA para gerar a resposta ideal baseada no SOP — com a mensagem pronta para copiar, o raciocínio por trás e alertas de atenção.

### Antes de começar, você vai precisar de

- Computador com Windows 10 ou 11
- Conta no Claude.ai (plano Pro ou acima, ou chave de API)
- Conta na Anthropic Console para gerar a API Key (gratuito criar a conta)
- Conexão com a internet

> ⏱ **Tempo estimado:** 30 a 45 minutos do zero. Se o Node.js já estiver instalado, cai para 15 minutos.

---

## Parte 1 — Instalar o WSL (Windows Subsystem for Linux)

O Claude Code roda em ambiente Linux. No Windows, usamos o WSL — uma camada que permite rodar Linux dentro do Windows sem precisar de máquina virtual. É oficial da Microsoft e completamente seguro.

> **Atenção:** se você já tem o WSL instalado (Ubuntu aparece no menu Iniciar), pule direto para a Parte 2.

### Passo 1 — Abrir o PowerShell como Administrador

Clique no botão Iniciar (tecla Windows), digite **PowerShell**, clique com o botão direito no resultado e escolha **"Executar como administrador"**. Confirme a janela de permissão que aparecer.

### Passo 2 — Instalar o WSL com Ubuntu

Cole o comando abaixo e pressione Enter:

```powershell
wsl --install
```

O Windows vai baixar e instalar o Ubuntu automaticamente. Isso pode demorar alguns minutos dependendo da sua internet.

### Passo 3 — Reiniciar o computador

Quando a instalação terminar, o PowerShell vai pedir para reiniciar. Faça isso antes de continuar.

### Passo 4 — Criar usuário no Ubuntu

Após reiniciar, o Ubuntu vai abrir automaticamente pedindo para criar um usuário. Escolha um nome simples (ex: `amanda`) e uma senha. Anote essa senha — você vai precisar dela.

> **Normal:** quando você digita a senha no terminal Linux, os caracteres não aparecem na tela. Isso é um recurso de segurança, não um erro. Continue digitando normalmente e pressione Enter.

### Passo 5 — Verificar se funcionou

Abra o Ubuntu pelo menu Iniciar e rode:

```bash
uname -a
```

Deve aparecer uma linha com "Linux" no texto. Se aparecer, o WSL está funcionando.

---

## Parte 2 — Instalar o Node.js

O Node.js é o motor que roda JavaScript fora do navegador. Ele é necessário para o React, o Vite e o Claude Code funcionarem. Vamos instalar via NVM (gerenciador de versões), que é o método mais confiável no Linux/WSL.

### Passo 1 — Abrir o terminal Ubuntu

Pressione a tecla Windows, digite **Ubuntu** e abra o aplicativo. Todos os comandos desta parte devem ser executados nele.

### Passo 2 — Instalar o NVM

Cole o comando abaixo completo e pressione Enter:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Após terminar, **feche e reabra o terminal Ubuntu** para ativar o NVM.

### Passo 3 — Instalar o Node.js 20 (versão LTS)

Com o terminal Ubuntu reaberto, rode:

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### Passo 4 — Confirmar a instalação

Rode os dois comandos abaixo. Cada um deve mostrar um número de versão:

```bash
node --version
# deve mostrar: v20.x.x

npm --version
# deve mostrar: 10.x.x
```

> ❌ **Problema comum:** se aparecer "command not found", feche e reabra o terminal Ubuntu e tente de novo.

---

## Parte 3 — Instalar o Cursor

O Cursor é um editor de código moderno com IA integrada — similar ao Visual Studio Code, mas com recursos extras para trabalhar com Claude e outros modelos. É o ambiente onde você vai ver e editar o código do simulador.

### Passo 1 — Baixar o Cursor

Acesse [cursor.com/download](https://cursor.com/download) no navegador e baixe a versão para Windows. É um instalador `.exe` normal.

### Passo 2 — Instalar o Cursor

Execute o instalador baixado e siga os passos. Não precisa mudar nenhuma opção — pode manter tudo no padrão.

### Passo 3 — Abrir o Cursor e conectar ao WSL

Com o Cursor aberto, pressione `Ctrl + Shift + P` para abrir a paleta de comandos. Digite **WSL** e selecione a opção **"WSL: Connect to WSL"**. O Cursor vai se reconectar ao ambiente Linux que instalamos.

> Pode ser necessário instalar a extensão **"Remote - WSL"** se o Cursor pedir. Aceite e reinicie quando solicitado.

### Passo 4 — Verificar o terminal integrado

No Cursor, pressione `Ctrl + `` (crase) para abrir o terminal integrado. Ele deve abrir direto no Ubuntu/WSL. Confirme rodando:

```bash
echo $SHELL
# deve mostrar: /bin/bash ou /usr/bin/zsh
```

---

## Parte 4 — Instalar o Claude Code

O Claude Code é o assistente de IA da Anthropic que roda no terminal. Ele entende o código do projeto e pode fazer alterações, corrigir erros e configurar coisas automaticamente só com instruções em português.

### Passo 1 — Instalar o Claude Code via npm

No terminal Ubuntu (dentro do Cursor ou no app separado), rode:

```bash
npm install -g @anthropic-ai/claude-code
```

### Passo 2 — Confirmar a instalação

```bash
claude --version
# deve mostrar o número da versão instalada
```

### Passo 3 — Fazer login no Claude Code

Rode o comando abaixo e siga as instruções que aparecerem:

```bash
claude
```

Na primeira execução, o Claude Code vai pedir para fazer login. Escolha a opção de login com a conta Claude.ai e siga o fluxo de autenticação no navegador que abrir.

> 💡 **Plano vs API Key:** se tiver um plano Pro ou Max do Claude.ai, use esse login — o uso do Claude Code já está incluído. Se preferir pagar por uso via API, configure a API Key na próxima etapa.

---

## Parte 5 — Configurar a API Key da Anthropic

A API Key é a chave que permite que o simulador (rodando no navegador) se comunique diretamente com a IA da Anthropic para gerar as respostas. É diferente do login do Claude Code — essa chave é usada especificamente pelo app React.

> **Importante:** o Claude Code usa o login da sua conta Claude.ai. A API Key configurada aqui é usada **APENAS** pelo simulador React no navegador. São coisas separadas.

### Passo 5.1 — Gerar a API Key

1. Acesse [console.anthropic.com](https://console.anthropic.com) no navegador
2. Faça login ou crie uma conta gratuita
3. No menu lateral, clique em **"API Keys"**
4. Clique em **"Create Key"**, dê um nome (ex: `simulador-hanna`) e clique em **"Create Key"**
5. **COPIE a chave gerada imediatamente** — ela começa com `sk-ant-api03-...` e só aparece uma vez

> ❌ Não feche a tela antes de copiar a chave. Se fechar sem copiar, vai precisar gerar uma nova.

### Passo 5.2 — Configurar a chave no projeto

A API Key não fica no código — fica em um arquivo especial chamado `.env` que nunca é enviado para nenhum lugar. Vamos criar esse arquivo na Parte 6.

> 🔒 **Segurança da API Key:** NUNCA cole a API Key diretamente no código. NUNCA a envie por WhatsApp, e-mail ou compartilhe em qualquer lugar. Se isso acontecer, acesse [console.anthropic.com](https://console.anthropic.com) imediatamente, revogue a chave e gere uma nova.

---

## Parte 6 — Criar e Configurar o Projeto

Agora vamos criar a estrutura do projeto React, colocar o arquivo do simulador e configurar tudo para rodar. Use o terminal do Cursor (`Ctrl + ``) para todos os comandos desta parte.

### Passo 1 — Criar o projeto React com Vite

```bash
cd ~
mkdir projetos && cd projetos
npm create vite@latest simulador-hanna -- --template react
```

Quando perguntar confirmações, pressione Enter para aceitar os padrões. Ao final, entre na pasta criada e instale as dependências:

```bash
cd simulador-hanna
npm install
```

### Passo 2 — Abrir a pasta no Cursor

```bash
code .
```

O Cursor vai abrir com a estrutura do projeto visível na barra lateral esquerda.

### Passo 3 — Criar o arquivo .env com a API Key

Substitua `SUA-CHAVE-AQUI` pela chave que você copiou no Passo 5.1:

```bash
echo 'VITE_ANTHROPIC_API_KEY=SUA-CHAVE-AQUI' > .env
```

Para confirmar que foi criado corretamente:

```bash
cat .env
# deve mostrar: VITE_ANTHROPIC_API_KEY=sk-ant-api03-...
```

### Passo 4 — Criar o arquivo .gitignore

Garante que a API Key nunca seja enviada para nenhum repositório:

```bash
echo ".env" >> .gitignore
echo "node_modules" >> .gitignore
```

### Passo 5 — Colocar o arquivo do simulador

Copie o arquivo `simulador_hanna_rocha.jsx` para a pasta `src/` do projeto. No Cursor, você pode arrastar o arquivo para a pasta `src` na barra lateral. Em seguida, substitua o `src/App.jsx` pelo simulador:

```bash
cp ~/Downloads/simulador_hanna_rocha.jsx src/App.jsx
# ajuste o caminho se o arquivo estiver em outro lugar
```

### Passo 6 — Adicionar os headers da API Key no código

Abra o `src/App.jsx` no Cursor. Encontre o bloco do `fetch` (linha com `"headers"`) e substitua pela versão abaixo, que lê a chave do `.env`:

```js
// Substitua o bloco de headers por este:
headers: {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-allow-browser": "true",
},
```

> O header `"anthropic-dangerous-allow-browser"` é obrigatório para chamadas feitas direto do navegador. Não remova.

---

## Parte 7 — Usar o Claude Code para Configurar

Esta é a parte onde o Claude Code entra em ação. Em vez de editar o código manualmente, você pode pedir para ele fazer as configurações em português.

### Passo 1 — Abrir o Claude Code na pasta do projeto

No terminal do Cursor (já dentro da pasta `simulador-hanna`), rode:

```bash
claude
```

O Claude Code vai iniciar e mostrar o prompt interativo. Ele já lê todos os arquivos da pasta automaticamente.

### Passo 2 — Pedir para o Claude Code configurar o projeto

No prompt do Claude Code, escreva em português mesmo:

> *"Configura o projeto para rodar corretamente. O arquivo principal é o `src/App.jsx` que é um simulador de respostas de WhatsApp. Verifica se o fetch para a API da Anthropic está com os headers corretos usando a variável `import.meta.env.VITE_ANTHROPIC_API_KEY` e roda o projeto para confirmar que funciona."*

O Claude Code vai analisar o código, fazer os ajustes necessários e confirmar quando estiver pronto. Qualquer alteração que ele quiser fazer vai pedir sua confirmação antes.

### Passo 3 — Criar o arquivo CLAUDE.md (opcional, mas recomendado)

O `CLAUDE.md` é um arquivo de contexto que o Claude Code lê toda vez que é aberto na pasta — evita que você precise explicar o projeto do zero sempre. Crie na pasta raiz do projeto:

```markdown
# Simulador de Objeções — Hanna Rocha Fotografia

## Sobre o projeto
App React com Vite que usa a API da Anthropic para gerar
respostas de WhatsApp baseadas no SOP comercial da empresa.

## Arquivo principal
- src/App.jsx — componente principal do simulador

## Variáveis de ambiente
- VITE_ANTHROPIC_API_KEY — API Key da Anthropic (no .env)

## Comandos
- npm run dev — rodar localmente
- npm run build — gerar build de produção
```

---

## Parte 8 — Rodar o Simulador

### Passo 1 — Iniciar o servidor local

No terminal do Cursor (pressione `Ctrl+C` para sair do Claude Code se estiver nele), rode:

```bash
npm run dev
```

Vai aparecer uma mensagem como:

```
  VITE v5.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Passo 2 — Abrir no navegador

Abra o Chrome, Edge ou Firefox e acesse:

```
http://localhost:5173
```

O simulador deve aparecer com o logo da Hanna Rocha, os botões de cenários rápidos e o campo para digitar a mensagem da cliente.

### Passo 3 — Testar o simulador

Clique em um dos cenários rápidos, por exemplo **"Achei caro"**, e aguarde a resposta ser gerada. Se aparecer a mensagem com o raciocínio e o botão de copiar, está tudo funcionando.

> ⚠️ **Se der erro de API:** verifique se o `.env` foi criado corretamente com a chave certa e reinicie o servidor (`Ctrl+C` e `npm run dev` de novo).

---

## Parte 9 — Publicar Online com Vercel (Opcional)

Para que a Amanda possa acessar o simulador de qualquer computador ou celular sem precisar rodar o projeto localmente, você pode publicar de graça no Vercel.

### Passo 1 — Criar conta no Vercel

Acesse [vercel.com](https://vercel.com) e crie uma conta gratuita. Pode usar login do GitHub ou criar com e-mail.

### Passo 2 — Instalar o Vercel CLI

```bash
npm install -g vercel
```

### Passo 3 — Fazer o deploy

Dentro da pasta do projeto (`simulador-hanna`), rode:

```bash
vercel
```

O Vercel vai fazer algumas perguntas. Responda assim:

| Pergunta | Resposta |
|---|---|
| Set up and deploy? | `Y` (Enter) |
| Which scope? | Escolha sua conta |
| Link to existing project? | `N` (Enter) |
| Project name? | `simulador-hanna` (Enter) |
| In which directory? | `.` (ponto, Enter) |
| Override settings? | `N` (Enter) |

### Passo 4 — Configurar a API Key no Vercel

O Vercel não lê o `.env` local automaticamente. Adicione a chave no painel:

1. Acesse [vercel.com](https://vercel.com) e abra o projeto criado
2. Vá em **Settings > Environment Variables**
3. Clique em **Add New**
4. **Name:** `VITE_ANTHROPIC_API_KEY`
5. **Value:** `sua-chave-sk-ant-api03-...`
6. Clique em **Save**

Após salvar, faça um novo deploy para aplicar a variável:

```bash
vercel --prod
```

### Passo 5 — Acessar a URL pública

O Vercel vai gerar uma URL no formato `simulador-hanna-xxx.vercel.app`. Compartilhe com a Amanda — ela acessa do celular ou computador, sem instalar nada.

> 💰 **Custo:** o plano gratuito do Vercel é suficiente para uso interno. O único custo real é o consumo da API da Anthropic a cada resposta gerada (frações de centavo por resposta).

---

## Referência Rápida

### Comandos do dia a dia

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o simulador localmente em localhost:5173 |
| `npm run build` | Gera a versão final para publicação |
| `vercel --prod` | Publica a versão atualizada no Vercel |
| `claude` | Abre o Claude Code na pasta atual |
| `Ctrl + C` | Para qualquer processo rodando no terminal |
| `node --version` | Verifica a versão do Node.js instalada |

### Problemas comuns e soluções

**❌ "command not found: node"**
Feche e reabra o terminal Ubuntu. Se persistir, rode:
```bash
source ~/.bashrc
```

**❌ Erro 401 ou "invalid API key" no simulador**
Verifique o arquivo `.env`. A chave deve começar com `sk-ant-api03-` e estar sem espaços. Reinicie o servidor depois de qualquer alteração no `.env`.

**❌ A página abre em branco**
Abra o console do navegador (`F12 > Console`) e veja o erro. Copie e cole no Claude Code dentro do projeto — ele vai identificar e corrigir.

**❌ Cursor não conecta ao WSL**
No Cursor, pressione `Ctrl+Shift+P`, digite `Remote-WSL: Reopen in WSL` e pressione Enter.

### Links úteis

- Anthropic Console (API Key): [console.anthropic.com](https://console.anthropic.com)
- Vercel (hospedagem): [vercel.com](https://vercel.com)
- Cursor (editor): [cursor.com](https://cursor.com)
- Node.js (download manual): [nodejs.org](https://nodejs.org)

---

*Hanna Rocha Fotografia · Documento Interno · Versão 1.0 · Maio 2026*
