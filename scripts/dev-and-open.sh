#!/usr/bin/env bash
# Para na porta 3000, limpa cache do Next, sobe o dev em 127.0.0.1:3000 e abre o browser.
set -e
cd "$(dirname "$0")/.."
for p in 3000 3001 3002; do
  lsof -ti:"$p" 2>/dev/null | xargs kill -9 2>/dev/null || true
done
rm -rf .next
echo "A iniciar em http://127.0.0.1:3000 …"
(sleep 4 && open "http://127.0.0.1:3000") &
exec npx next dev -H 127.0.0.1 -p 3000
