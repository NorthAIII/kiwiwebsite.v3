# CI (GitHub Actions) gözlemi `gh` olmadan da yapılabilir

Repo **public** olduğundan Actions run/job durumu auth'suz REST API ile okunur:

1. `curl -s "https://api.github.com/repos/NorthAIII/kiwiwebsite.v3/actions/runs?head_sha=<sha>"` → run id.
2. `/actions/runs/<id>/jobs` → `jq '.jobs[] | "\(.name): \(.conclusion)"'` ile job-seviyesi `conclusion=success` ampirik teyit edilir (`gh run watch` eşdeğeri).

CI workflow: `.github/workflows/ci.yml` (fast + a11y job; TASK-5.04).

**Ortam notu:** bazı oturum ortamlarında `gh`/`node`/`python` kurulu olmayabilir (taze cloud devcontainer) — workflow GitHub runner'da koştuğu için node yerelde gerekmez.

İlgili: [Host UAT araç envanteri](host-uat-arac-envanteri.md) (auth'suz REST limiti 60 istek/saat; host'ta `gh` yetkili) · [Vercel Git-disconnect](vercel-git-disconnect-deploy-tetiklenmez.md) (deploy teyidi aynı REST ailesiyle).
