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

### 9b. Padronização tipográfica dos destaques

- Os três textos de destaque — "Product, experience…" (`.opening__heading`), "Transacionar…" e "Comecei a desenhar…" (`.opening__statement`) — agora partilham o mesmo estilo visual: **font-size**, **line-height** (`0.9`) e **cor** (`#434d4a`, sem transparência), tendo como referência o título principal.

### 9c. Alinhamento do footer com Awards

- Grelha do **`.footer`** alterada de `1:1:1:3` para `1:2.15:1:2.15` (mesma proporção de `.awards-press__grid`), com **padding simétrico** nos dois lados. O copyright na coluna 2 agora alinha verticalmente com "2005 / Megafônicas, Expo." da secção de prémios.

### 9. Página “quebrada” / sem CSS e Internal Server Error

- **Erro 1 — CSS não aplicava:** no App Router, um **`<head>` manual** no `RootLayout` com links do Google Fonts impedia o Next de injetar corretamente a folha global → fundo branco, links azuis.
- **Tentativa:** **`next/font/google`** (Karla, Cormorant Infant, Playfair) + variáveis CSS no `<html>`.
- **Erro 2 — 500 em alguns ambientes:** `next/font` faz pedidos à API do Google **no servidor**; com rede/VPN/firewall a bloquear, o layout podia falhar → **Internal Server Error**.
- **Solução final:** **`@import`** das fontes no **topo de `globals.css`**, **`layout.js` minimalista** (só `import './globals.css'`, `metadata`, `viewport`, `<html><body>` sem `<head>` manual), `font-family` com nomes `'Karla'`, `'Cormorant Infant'`, `'Playfair Display'`.

### 10. Hidden-top: mecânica "scroll up to discover" (estilo Felipe Memória)

- **Referência:** [felipememoria.com](https://www.felipememoria.com) — site estático puro; `<div id="clients">` fica acima de `<div id="main">` e um `<script>` no final do `<body>` faz `window.scroll(0, document.getElementById('main').offsetTop)`. Sem React, sem SSR, sem hidratação.
- **Problema no Next.js:** em SSR + React hydration, a hidden-top é renderizada no servidor e o HTML chega ao browser com scroll=0. O conteúdo escondido aparece brevemente antes do JS rodar.

#### Tentativas que falharam

| Tentativa | Por que falhou |
|-----------|---------------|
| `height: 0` → `height: auto` no useEffect + `scrollTo` | Race condition: o browser não tinha calculado o layout da hidden-top expandida quando `hero.offsetTop` era lido, resultando em scroll incorreto. |
| `visibility: hidden` no CSS da hidden-top + revelar após scroll | A hidden-top com `min-height: 100vh` ocupava espaço, mas o fundo escuro e as labels tipográficas eram visíveis no primeiro paint antes do JS posicionar o scroll. |
| Script inline no `<head>` com `document.documentElement.style.visibility='hidden'` | Causava **hydration mismatch** — o servidor renderiza `<html>` sem style, mas o script inline adiciona `style="visibility:hidden"` antes da hidratação. React detecta a diferença e mostra erro no console. |

#### Solução que funciona

Três camadas complementares, todas compatíveis com SSR:

1. **CSS `body:not(.page-ready) { opacity: 0 !important; }`** — o body do servidor não tem a classe `page-ready`, então a página inteira é invisível no primeiro paint. Puramente CSS, zero JavaScript, zero manipulação de DOM antes da hidratação, zero hydration mismatch.

2. **CSS `.hidden-top { height: 0; overflow: hidden; }`** — a hidden-top começa colapsada no HTML do servidor. Mesmo que o `opacity: 0` falhe, nenhum conteúdo da hidden-top é visível.

3. **No `useEffect`** (client-only, pós-hidratação):
   - Adiciona `hidden-top--open` (expande para `min-height: 100vh`)
   - Força reflow com `void hiddenTop.offsetHeight`
   - Faz `window.scrollTo(0, hero.offsetTop)`
   - No double `requestAnimationFrame`, adiciona `page-ready` ao body → revela a página com scroll já posicionado

#### Regras para futuros ajustes

- **NUNCA** modificar atributos do `<html>` via script inline no `<head>` — causa hydration mismatch com React.
- **NUNCA** usar `suppressHydrationWarning` como muleta — esconde erros reais.
- O gate de visibilidade deve ser **puramente CSS** (classe no `<body>` via `classList`, que o React não controla).
- A hidden-top deve **começar colapsada** (`height: 0`) e ser expandida **somente** no `useEffect`.
- O `scrollTo` deve rodar **após** a hidden-top ser expandida e o reflow forçado.
- A revelação (`page-ready`) deve usar **double rAF** para garantir que o browser já commitou o scroll antes de pintar.

### 11. Estabilidade do dev e browser

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
| SSR + scroll tricks | Nunca modificar `<html>` via script inline antes da hidratação React. Gates de visibilidade devem ser CSS puro (`body:not(.class)`), com classes adicionadas via `classList` no `useEffect`. |
| Hidden content acima do fold | Começar colapsado no CSS (`height: 0`), expandir no `useEffect`, forçar reflow, scrollar, revelar com double rAF. Referência: felipememoria.com (HTML estático com `window.scroll` no fim do body). |
| `next/font` vs `@import` | `next/font/google` é mais performante (injecta inline, sem FOUT), mas depende de rede no build. Para fontes locais (Arizona), `@font-face` no CSS é a abordagem mais fiável. |
| Slider scheduling | Coordenar carrosséis com um scheduler global evita transições simultâneas excessivas; `IntersectionObserver` por componente poupa CPU em sliders fora do viewport. |

---

## Erros encontrados e como foram resolvidos

| Sintoma | Causa provável | Ação |
|---------|----------------|------|
| Estilos invisíveis | `<head>` manual no layout | Removido; só `import './globals.css'`. |
| Mosaico sempre invisível | IO + scroll para hero | Fallback `markInView`, rAF, resize, reduced motion. |
| Internal Server Error (500) | `next/font` + rede bloqueada | Voltar a `@import` no CSS. |
| Porta errada / outro app | Vários `next dev` ou `localhost` | Fixar `127.0.0.1:3000` e script de limpeza. |
| 404 Arizona | Ficheiro em falta em `public/fonts/` | Colocar `ArizonaText-Thin.woff2` ou aceitar fallback Cormorant. |
| Hidden-top visível no load | SSR renderiza scroll=0, hidden-top aparece antes do JS | CSS gate `body:not(.page-ready) { opacity: 0 }` + hidden-top colapsada + expand/scroll/reveal no useEffect. |
| Hydration mismatch no `<html>` | Script inline no `<head>` adicionava `style` antes da hidratação | Remover script; usar apenas CSS + classList no body (pós-hidratação). |

---

## Varredura de código (19 abr 2026)

Auditoria completa de todos os ficheiros do projeto. Build 100% limpo, zero warnings.

### Correcções aplicadas

| Ficheiro | Issue | Fix |
|----------|-------|-----|
| `globals.css` | `.hidden-top` mobile override (`padding: 40px 20px`) não tinha efeito — seletor `.hidden-top` é menos específico que `.hidden-top--open` | Alterado para `.hidden-top--open` no media query `600px` |
| `globals.css` | `will-change: transform` permanente em `.mosaic-slider__track` forçava GPU compositing para todos os sliders o tempo todo | Removido — a transition já promove para compositor layer quando necessário |
| `globals.css` | Gate `body:not(.page-ready)` estava separado do bloco `body` por outras regras | Movido para imediatamente após `body {}` |
| `layout.js` | Warning de build `metadataBase property not set` — OG/Twitter images resolviam para `localhost:3000` | Adicionado `metadataBase: new URL('https://www.ramonanjos.com')` |
| `page.js` | Refs desorganizados (linha em branco entre `hiddenGridRef` e `hiddenTopRef`) | Reordenado: `hiddenTopRef`, `heroRef`, `hiddenGridRef` |
| `sliderScheduler.js` | Top-level `if (typeof window !== 'undefined')` separado da declaração | Condensado em declaração inline ternária |

### Itens revisados sem alteração

| Item | Razão |
|------|-------|
| `will-change: opacity, transform` em `.reveal` | Pattern correto — reseta para `will-change: auto` quando `.visible` é adicionado |
| `1lh` unit em media query tablet (fallback duplicado) | Progressive enhancement intencional — fallback com `10vh` na linha anterior |
| Primeiro useEffect mistura gate + parallax | Funcional e com cleanup correto; separar adicionaria complexidade sem ganho |
| `sliderScheduler.js` importado apenas de Client Components | Seguro — `typeof window` guard é suficiente |
| `contain: layout style paint` em `.mosaic__item` | Performance positiva — limita recálculos de layout ao container |

### 12. Tipografia via `next/font` (Karla)

- **`layout.js`** agora usa **`next/font/google`** para a fonte **Karla** (pesos 400, 500, 700) com `display: 'swap'` e variável CSS `--font-karla`.
- A classe da variável é aplicada no `<html>`, e todo o CSS referencia `var(--font-karla)` como primeiro token do `font-family`.
- Cormorant Infant e Playfair Display foram **removidas** — o heading/statement usa a fonte local **Arizona Text** (`ABCArizonaText-Thin-Trial.woff2` em `public/fonts/`), com fallback Georgia/serif.
- `@import` do Google Fonts no `globals.css` foi **removido** — a fonte agora é injectada pelo Next.js no server-side.

### 13. Performance e preconnect

- Adicionados `<link rel="preconnect">` e `<link rel="dns-prefetch">` para `player.vimeo.com` no `<head>` do `layout.js` — reduz latência do embed Vimeo no hero.
- Script inline `history.scrollRestoration = 'manual'` no `<head>` via `dangerouslySetInnerHTML` — impede o browser de restaurar scroll em reload, compatível com a mecânica hidden-top.

### 14. Mosaic slider (carrossel por região)

- Componente **`MosaicSlider.js`** — carrossel horizontal por item do mosaico: recebe array `images` e mostra uma de cada vez com transição CSS (`translateX`, 2 s cubic-bezier).
- **`sliderScheduler.js`** — scheduler global que coordena no máximo 2 sliders simultâneos, com intervalo aleatório (3–5 s), respeitando `prefers-reduced-motion`. Cada slider regista-se/desregista-se via `register()`; visibilidade controlada por `IntersectionObserver` dentro do componente.
- Mosaico organizado em 4 filas: 2 colunas (landscape) → 4 colunas (square) → 3 colunas (tall) → 4 colunas (square), com imagens locais em `/public/imgs/`.

### 15. Assets de metadata (OG, favicon)

- **`public/og-image.png`** — imagem Open Graph 1200×630 para partilha em redes sociais.
- **`app/icon.png`** — favicon da app (Next.js detecta automaticamente `icon.png` no `app/`).
- **`public/favicon.png`** — favicon alternativo no public.

### 16. Ficheiro de textos editáveis (`TEXTOS.md`)

- Criado **`TEXTOS.md`** com todos os textos da página organizados por secção (Hidden Top, Opening, Bio, Citação, Awards, Press, Footer) — permite edição de conteúdo sem mexer no código.
- Estrutura de label/texto/caption para cada card da hidden-top, tabela de awards, e texto corrido das restantes secções.

---

## Acertos

- Build **`npm run build`** estável (página estática `○ /`), zero warnings.
- Layout responsivo com media queries em `globals.css` (~960px e ~600px).
- Tipografia: Karla via `next/font`, Arizona Text via `@font-face` local.
- Mosaic com slider automático coordenado (máx. 2 simultâneos, respeita `prefers-reduced-motion`).
- OG image e favicon configurados; `metadataBase` aponta para `ramonanjos.com`.
- `TEXTOS.md` permite edição de conteúdo sem tocar no código.
- `vercel.json` pronto para deploy na Vercel.

---

## Ficheiros-chave

| Ficheiro | Função |
|----------|--------|
| `app/layout.js` | Metadata, viewport, `next/font` (Karla), preconnect Vimeo, scrollRestoration |
| `app/page.js` | Toda a estrutura da home (client component) |
| `app/globals.css` | Estilos globais, `@font-face` Arizona Text, reset, responsivo |
| `app/components/MosaicSlider.js` | Carrossel horizontal de imagens por item do mosaico |
| `app/components/sliderScheduler.js` | Scheduler global para coordenar transições dos sliders |
| `app/icon.png` | Favicon da app (detectado pelo Next.js) |
| `public/og-image.png` | Imagem Open Graph para partilha social |
| `TEXTOS.md` | Todos os textos da página, editáveis sem mexer no código |
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

*Última atualização do log: 19 abr 2026 — tipografia next/font, mosaic slider, assets OG/favicon, ficheiro TEXTOS.md.*
