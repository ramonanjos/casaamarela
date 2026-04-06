# Log do projeto — portfólio Next.js (Ramon Anjos)

Documento de trabalho: o que foi feito, aprendizados, erros e como retomar.

---

## Visão geral

Site de portfólio em **Next.js 15 (App Router)** + **React 19**, estilos em **`app/globals.css`**, conteúdo principal em **`app/page.js`**. Referência visual herdada do export **Cargo** (`html-page` na raiz do projeto).

---

## Cronologia do que foi feito

### 1. HTML estático e pré-visualização de estilos

- Pedido para “executar” o ficheiro `html-page` no browser → aberto via Safari com `file://`.
- Criado **`styles-preview.html`** (script Python) extraindo CSS e blocos `local-css` do Cargo para ver tipografia/cores sem a página inteira.
- **Aprendizado:** export Cargo tem `FirstloadThumbnails` vazio e `show_thumbs: false` no JSON — mosaico no site original depende muito de JS.

### 2. Ambiente “como produção” e mosaico invisível

- Adicionados **`.gitignore`**, **`vercel.json`**, **`next.config.js`** com `images.remotePatterns` (picsum, Vimeo CDN).
- **Problema:** blocos com classe **`.reveal`** ficavam com `opacity: 0` se o **IntersectionObserver** não disparasse bem (scroll inicial para o hero, layout).
- **Correção:** `markInView()` + `requestAnimationFrame` duplo, `rootMargin` / `threshold`, listener `resize`, e `@media (prefers-reduced-motion: reduce)` no CSS e no JS.
- **`scrollIntoView`:** `behavior: 'auto'` em vez de `'instant'` para compatibilidade.

### 3. Conteúdo e layout (abertura)

- Texto após o primeiro vídeo: **“2024 ― / Tech & Finance”**, depois alinhado à coluna 1 como “Ramon Anjos”, com **100px** abaixo do vídeo.
- Bloco **“Transacionar…”** em tipografia tipo título (Arizona/Cormorant), grelha 4 colunas, baseline alinhada com “2024 ―” via **`.opening__post-video-row`** + `align-items: first baseline` e estrutura com **`.opening__caption-year`**.

### 4. Bio (Product, Design / Language System)

- Secção **`bio-rail`:** coluna 1 com etiqueta; colunas 2–3 com os dois parágrafos (Nubank, clientes, negritos, sublinhado em Fintech Nubank).
- Removido o bloco **`flow`** antigo que duplicava parte do texto.

### 5. Citação pessoal

- Removidos **`media-full`** (imagem + overlay) e último **mosaico 2 colunas** abaixo do bio.
- Nova **`statement-row`** com o texto “Comecei a desenhar…” no mesmo padrão tipográfico que “Transacionar…” (classe **`.opening__statement`** partilhada).

### 6. Awards & Press

- Secção **`awards-press`:** grelha 4 colunas (proporções distintas da abertura: `1fr / 2.15fr / 1fr / 2.15fr`), listagem de prémios por ano, links de imprensa com **↗** e URLs dos PDFs no Drive (espelho do `html-page`); um link interno com `href="#"` até haver rota final.

### 7. Footer

- Removidos título “Vamos conversar” e links Email / LinkedIn / Instagram.
- Mantido só copyright; alinhado à **esquerda** na **coluna 2** da mesma grelha 4 colunas que `.page-columns`, com **`padding-right: 0`** no desktop (como a abertura); no mobile, padding simétrico.

### 8. Ajustes de padding e consistência

- **`statement-row`:** padding horizontal simétrico (antes só à esquerda).
- **`footer`:** alinhamento com a grelha da página.

### 9. Página “quebrada” / sem CSS e Internal Server Error

- **Erro 1 — CSS não aplicava:** no App Router, um **`<head>` manual** no `RootLayout` com links do Google Fonts impedia o Next de injetar corretamente a folha global → fundo branco, links azuis.
- **Tentativa:** **`next/font/google`** (Karla, Cormorant Infant, Playfair) + variáveis CSS no `<html>`.
- **Erro 2 — 500 em alguns ambientes:** `next/font` faz pedidos à API do Google **no servidor**; com rede/VPN/firewall a bloquear, o layout podia falhar → **Internal Server Error**.
- **Solução final:** **`@import`** das fontes no **topo de `globals.css`**, **`layout.js` minimalista** (só `import './globals.css'`, `metadata`, `viewport`, `<html><body>` sem `<head>` manual), `font-family` com nomes `'Karla'`, `'Cormorant Infant'`, `'Playfair Display'`.

### 10. Estabilidade do dev e browser

- Scripts **`npm run dev`** e **`dev:clean`** com **`-H 127.0.0.1 -p 3000`** (evitar confusão `localhost` / IPv6 / outro processo na porta).
- **`npm run dev:open`** → abre `http://127.0.0.1:3000`.
- **`scripts/dev-and-open.sh`:** mata portas 3000–3002, apaga `.next`, sobe dev, abre browser.
- **`app/page.js`:** try/catch em `scrollIntoView`; fallback se não existir **IntersectionObserver**.
- **`app/error.js`** e **`app/global-error.js`:** mensagens de erro mais claras no cliente.

---

## Aprendizados (resumo)

| Tema | Conclusão |
|------|-----------|
| Next.js App Router + `<head>` | Evitar `<head>` manual no root layout; usar `metadata` / `viewport` e CSS global. |
| Fontes | `@import` no CSS ou `next/font` — este último depende de rede no servidor em dev/build. |
| Animações `.reveal` | Sempre ter fallback (geometria + rAF + reduced motion). |
| Grelha editorial | Coluna 1 “trilho”, colunas 2–5 conteúdo; `subgrid` ou repetir `grid-template-columns` com os mesmos valores para alinhar secções. |
| Cargo → código | HTML exportado é pesado e depende de JS; para mosaico/thumbnails é preciso reimplementar ou outro pipeline. |

---

## Erros encontrados e como foram resolvidos

| Sintoma | Causa provável | Ação |
|---------|----------------|------|
| Estilos invisíveis | `<head>` manual no layout | Removido; só `import './globals.css'`. |
| Mosaico sempre invisível | IO + scroll para hero | Fallback `markInView`, rAF, resize, reduced motion. |
| Internal Server Error (500) | `next/font` + rede bloqueada | Voltar a `@import` no CSS. |
| Porta errada / outro app | Vários `next dev` ou `localhost` | Fixar `127.0.0.1:3000` e script de limpeza. |
| 404 Arizona | Ficheiro em falta em `public/fonts/` | Colocar `ArizonaText-Thin.woff2` ou aceitar fallback Cormorant. |

---

## Acertos

- Build **`npm run build`** estável (página estática `○ /`).
- Layout responsivo com media queries em `globals.css` (~960px e ~600px).
- Tipografia e cores alinhadas à referência Cargo onde aplicável.
- `vercel.json` pronto para deploy na Vercel.

---

## Ficheiros-chave

| Ficheiro | Função |
|----------|--------|
| `app/layout.js` | Metadata, viewport, import global CSS |
| `app/page.js` | Toda a estrutura da home (client component) |
| `app/globals.css` | Estilos + `@import` Google Fonts |
| `app/error.js` / `app/global-error.js` | Erros UI |
| `next.config.js` | `remotePatterns` para imagens remotas |
| `vercel.json` | Build na Vercel |
| `html-page` | Referência Cargo (não é servido pelo Next) |
| `styles-preview.html` | Utilitário local de preview de CSS (opcional) |
| `scripts/dev-and-open.sh` | Dev + abrir browser |

---

## Git e pasta do projeto (importante)

Houve contexto em que o **repositório Git estava na pasta home** (`~`), o que mistura o projeto com ficheiros pessoais. Foi criado um **Git só dentro de `Dev/Vercel`** — usar sempre este repositório para o portfólio.

---

## Próximos passos sugeridos (refino)

- Ligar emails/links reais (Office Hours, Bookmarks, `Compartilhamento e janelas`).
- Adicionar `public/fonts/ArizonaText-Thin.woff2` se houver licença.
- Substituir imagens Picsum por assets finais.
- Rever acessibilidade (landmarks, skip link, contraste).
- Push para GitHub/GitLab e ligar à Vercel.

---

*Última atualização do log: conforme pedido do autor, para continuidade em outro dia ou máquina.*
