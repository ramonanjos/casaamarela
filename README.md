# casa amarela — portfólio

[![Deploy Status](https://img.shields.io/github/deployments/ramonanjos/casaamarela/production?label=vercel&logo=vercel&logoColor=white)](https://casaamarela-inky.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)

Site de portfólio de **Ramon Anjos** — Product / Design. Construído em **Next.js 15 (App Router)** + **React 19**, hospedado na **Vercel** com deploys automáticos por Git.

- **Produção:** [www.ramonanjos.com](https://www.ramonanjos.com) *(após propagação do DNS)*
- **URL Vercel:** [casaamarela-inky.vercel.app](https://casaamarela-inky.vercel.app)
- **Repositório:** [github.com/ramonanjos/casaamarela](https://github.com/ramonanjos/casaamarela)

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19, Node.js 24.x |
| Estilos | CSS puro em `app/globals.css` |
| Tipografia | ABC Arizona Text (Light / Thin) |
| Hospedagem | Vercel (Fluid Compute, região `iad1`) |
| CI/CD | Git push → deploy automático |

## Estrutura

```
app/
├── components/
│   ├── MosaicSlider.js       # mosaico com slider coordenado
│   └── sliderScheduler.js    # scheduling do autoplay do slider
├── globals.css               # todos os estilos
├── layout.js                 # metadata, fonts, favicon
├── page.js                   # conteúdo principal do portfólio
├── error.js / global-error.js
└── icon.png
public/
├── fonts/                    # ABCArizonaText (.woff2)
├── imgs/                     # imagens dos projetos (AMZ, AW, CG, FR, ...)
├── favicon.png
└── og-image.png
```

## Rodar localmente

Pré-requisitos: **Node.js 20+** e **npm**.

```bash
git clone https://github.com/ramonanjos/casaamarela.git
cd casaamarela
npm install
npm run dev
```

Abrir [http://127.0.0.1:3000](http://127.0.0.1:3000).

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento em `127.0.0.1:3000` |
| `npm run dev:clean` | Apaga `.next` antes de iniciar (resolve cache teimoso) |
| `npm run dev:open` | Abre a URL no browser (com o dev já rodando) |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build localmente |

## Deploy

Qualquer `push` para `main` publica em produção via Vercel. Pull Requests geram **preview URLs** automáticas por branch.

```bash
git push origin main        # deploy em produção
```

Deploy manual (quando necessário):

```bash
vercel --prod
```

## Configuração Vercel

O projeto está linkado via `.vercel/project.json` (ignorado no Git). Settings em `vercel.json`:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install",
  "buildCommand": "npm run build"
}
```

Domínios custom configurados:
- `www.ramonanjos.com` (canônico)
- `ramonanjos.com` (apex)

## Documentação interna

- [`PROJECT_LOG.md`](./PROJECT_LOG.md) — histórico de decisões e aprendizados da sessão
- [`CONTINUAR.md`](./CONTINUAR.md) — guia para retomar o projeto em outra máquina
- [`TEXTOS.md`](./TEXTOS.md) — textos e conteúdo editorial do site

## Licença

Código proprietário. Todos os direitos reservados © Ramon Anjos.
