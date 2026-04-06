# Como continuar noutro dia ou noutra máquina

## Requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** (vem com Node)

## Clonar / copiar o projeto

### Se usaste Git + remoto (GitHub, etc.)

```bash
git clone <URL_DO_TEU_REPOSITORIO>
cd <pasta-do-projeto>
npm install
npm run dev:clean
```

Abre no browser: **http://127.0.0.1:3000**

### Se copiaste a pasta (Pen drive, zip, etc.)

```bash
cd /caminho/para/Dev/Vercel
npm install
npm run dev:clean
```

Abre: **http://127.0.0.1:3000**

> Não copies só os ficheiros: sem `npm install` não existe `node_modules`.

## Comandos úteis

| Comando | O quê |
|---------|--------|
| `npm run dev` | Servidor de desenvolvimento em 127.0.0.1:3000 |
| `npm run dev:clean` | Apaga `.next` e inicia o dev (resolve muitos erros estranhos) |
| `npm run dev:open` | Abre o browser (com o dev já a correr) |
| `./scripts/dev-and-open.sh` | Limpa portas 3000–3002, `.next`, sobe dev e abre o browser |
| `npm run build` | Build de produção (obrigatório antes de deploy) |
| `npm run start` | Serve o build (porta 3000 por defeito) |

## Problemas frequentes

1. **Internal Server Error** → `npm run dev:clean` e usa **http://127.0.0.1:3000**
2. **Porta em uso** → o Next pode sugerir 3001; vê a mensagem no terminal
3. **Página sem estilo** → confirma que **não** voltaste a meter `<head>` manual no `app/layout.js`
4. **Fonte Arizona em falta** → 404 em `/fonts/...` é esperado até colocares o `.woff2` em `public/fonts/`

## Deploy (Vercel)

- Liga o repositório Git à Vercel ou usa `vercel` na CLI
- O ficheiro `vercel.json` já define framework Next.js

## Documentação completa da sessão

Ver **`PROJECT_LOG.md`** (decisões, erros, aprendizados).
